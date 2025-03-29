from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

import httpx

import requests

API_KEY = "kuAdNGEAFwDYsLzgQBYH0rF8skQGDlnX2FYTGcTAgfWV"
IAM_URL = "https://iam.cloud.ibm.com/identity/token"

# Load the trained WQI model
model = joblib.load("water_quality_model.pkl")

# Initialize FastAPI app
app = FastAPI(title="AquaSentinel API", description="Predicts Water Quality Index (WQI) and classifies pollution levels")

# Define input schema using Pydantic
class WaterQualityInput(BaseModel):
    source_id: int
    year: int
    month: int
    pH: float
    DO: float
    BOD: float
    COD: float
    Nitrate: float
    FC: int

# Function to classify WQI levels
def classify_wqi(wqi):
    if wqi < 50:
        return "High Pollution"
    elif 50 <= wqi <= 75:
        return "Moderate Pollution"
    else:
        return "Low Pollution"

# Watsonx.ai API credentials (Replace with your actual API key)
API_KEY = "kuAdNGEAFwDYsLzgQBYH0rF8skQGDlnX2FYTGcTAgfWV"
IAM_URL = "https://iam.cloud.ibm.com/identity/token"
WATSONX_API_URL = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"

# Function to get IAM token
async def get_iam_token():
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = f"apikey={API_KEY}&grant_type=urn:ibm:params:oauth:grant-type:apikey"

    async with httpx.AsyncClient() as client:
        response = await client.post(IAM_URL, headers=headers, data=data)

    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        raise Exception(f"Error fetching IAM token: {response.text}")

# Function to generate AI insights
async def get_watsonx_insight(predicted_wqi, source_id, data):
    try:
        # Get fresh IAM token
        iam_token = await get_iam_token()
        source = ""
        if(source_id == 1317):
            source = "Thane Creek at Elephanta Caves"
        elif(source_id == 1318):
            source = "Mahim Bay at Mahim Bay"
        elif(source_id == 2168):
            source = "Mithi River"

        prompt = f"In under 100 words, analyze water quality for Source ID {source}. The predicted WQI is {predicted_wqi}. The features are {data} What are the possible reasons for this WQI value? Suggest actions to improve water quality."

        headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {iam_token}",
            "Content-Type": "application/json"
        }

        payload = {
            "input": prompt,
            "parameters": {
		"decoding_method": "greedy",
		"max_new_tokens": 900,
		"min_new_tokens": 0,
		"repetition_penalty": 1
	},
	"model_id": "ibm/granite-3-8b-instruct",
	"project_id": "535e0739-e0f9-48a8-bf9c-6720e7918796"
        }

        response = requests.post(WATSONX_API_URL, json=payload, headers=headers)
        if response.status_code == 200:
            return response.json().get("results", [{}])[0].get("generated_text", "No insights available")
        else:
            return f"Watsonx.ai Error: {response.text}"

    except Exception as e:
        return f"Error calling Watsonx.ai: {str(e)}"

# Prediction endpoint
@app.post("/predict/")
async def predict_wqi(data: WaterQualityInput):
    try:
        # Convert input data to NumPy array (Ensuring source_id is first)
        input_data = np.array([[data.source_id, data.year, data.month, data.pH, data.DO, data.BOD, data.COD, data.Nitrate, data.FC]])

        # Make prediction
        predicted_wqi = model.predict(input_data)[0]
        pollution_label = classify_wqi(predicted_wqi)

        # Generate AI insight using Watsonx.ai
        ai_insight = await get_watsonx_insight(predicted_wqi, data.source_id, data)

        return {
            "Predicted WQI": round(predicted_wqi, 2),
            "Pollution Level": pollution_label,
            "AI Insight": ai_insight
        }

    except Exception as e:
        return {"error": str(e)}

# Load the saved Prophet model
def load_model():
    return joblib.load("prophet_wqi_model.pkl")

model = load_model()

# Function to generate future predictions
def generate_forecast(periods, freq):
    """Generates forecast for the given number of periods and frequency."""
    current_date = pd.Timestamp.today()
    future_dates = pd.date_range(start=current_date, periods=periods, freq=freq)
    future_df = pd.DataFrame({'ds': future_dates})

    forecast = model.predict(future_df)
    return forecast[['ds', 'yhat']]

# **API Endpoint for Forecasting**
@app.get("/predict")
async def predict_future():
    """Returns monthly and yearly WQI predictions in a JSON format for frontend visualization."""

    # Get predictions
    monthly_forecast = generate_forecast(12, 'ME')
    yearly_forecast = generate_forecast(5, 'YE')

    # Convert to JSON format for frontend
    response = {
        "monthly": monthly_forecast.to_dict(orient="records"),
        "yearly": yearly_forecast.to_dict(orient="records")
    }

    return response

# Root endpoint
@app.get("/")
def home():
    return {"message": "Welcome to AquaSentinel API! Use /predict to get water quality predictions."}
