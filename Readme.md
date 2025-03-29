# AquaSentinel: AI-powered Water Quality Prediction

## 🌊 Project Overview
AquaSentinel is an AI-driven platform that predicts water quality for different sources using historical data. The system analyzes key parameters such as pH, COD, and BOD to forecast future water quality. This initiative aligns with the UN Sustainable Development Goal 6 (Clean Water and Sanitation) and is designed for scalability to assist local governments in monitoring and improving water conditions.

## 🚀 Tech Stack
- **Backend:** FastAPI (Python)
- **Machine Learning:** Prophet (for time-series forecasting)
- **Database:** PostgreSQL (or CSV-based data storage for now)
- **Frontend:** JavaScript-based visualization tools
- **AI Insights:** IBM WatsonX
- **Deployment:** Docker (optional for production)

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-repo/AquaSentinel.git
cd AquaSentinel
```

### 2️⃣ **Create a Virtual Environment** (Recommended)
```bash
python -m venv venv  # Create a virtual environment
source venv/bin/activate  # For macOS/Linux
venv\Scripts\activate  # For Windows
```

### 3️⃣ **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 4️⃣ **Run the FastAPI Server**
```bash
uvicorn app:app --reload --port 8000
```
The API will now be available at: `http://localhost:8000`

---

## 💼 API Endpoints

### 🔹 **Get Future Predictions** (Monthly & Yearly Forecasts)
#### Request:
```http
GET /predict?source_id=1
```
#### Response:
```json
{
    "source_id": 1,
    "monthly": [
        {"ds": "2025-04-30", "yhat": 68.45},
        {"ds": "2025-05-31", "yhat": 67.98}
    ],
    "yearly": [
        {"ds": "2026-12-31", "yhat": 70.23},
        {"ds": "2027-12-31", "yhat": 72.10}
    ]
}
```

### 🔹 **Predict WQI from Current Parameters** (With WatsonX AI Insights)
#### Request:
```http
POST /predict-wqi
```
#### Request Body (JSON):
```json
{
    "source_id": 1,
    "ph": 7.2,
    "do": 6.5,
    "bod": 3.1,
    "cod": 10.2,
    "nitrate": 2.5,
    "fc": 150
}
```
#### Response:
```json
{
    "source_id": 1,
    "predicted_WQI": 71.32,
    "insight": "The water quality is moderate. Consider monitoring industrial waste discharge."
}
```

---

## 🌍 Using API Data in Frontend
In JavaScript, you can fetch predictions and use the data to plot graphs:
```javascript
async function fetchPredictions(sourceId) {
    const response = await fetch(`http://localhost:8000/predict?source_id=${sourceId}`);
    const data = await response.json();
    console.log("Monthly Predictions:", data.monthly);
    console.log("Yearly Predictions:", data.yearly);
}
fetchPredictions(1);
```

For real-time WQI prediction:
```javascript
async function predictWQI(params) {
    const response = await fetch(`http://localhost:8000/predict-wqi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });
    const data = await response.json();
    console.log("Predicted WQI:", data.predicted_WQI);
    console.log("Insight:", data.insight);
}

predictWQI({
    source_id: 1,
    ph: 7.2,
    do: 6.5,
    bod: 3.1,
    cod: 10.2,
    nitrate: 2.5,
    fc: 150
});
```

---

## 🌎 Future Enhancements
- Integrate real-time water quality data from IoT sensors.
- Deploy the backend using **Docker + Cloud Hosting**.
- Improve model performance with additional environmental factors.

---

## 🤝 Contributors
- **Shrey Nagda** (Project Lead & Developer)
- Open for collaborations!

---

## 🐝 License
This project is licensed under the **MIT License**.
