# AquaSentinel: AI-powered Water Quality Prediction

## 🌊 Project Overview
AquaSentinel is an AI-driven platform that predicts water quality for different sources using historical data. The system analyzes key parameters such as pH, COD, and BOD to forecast future water quality. This initiative aligns with the UN Sustainable Development Goal 6 (Clean Water and Sanitation) and is designed for scalability to assist local governments in monitoring and improving water conditions.

## 🚀 Tech Stack
- **Backend:** FastAPI (Python)
- **Machine Learning:** Prophet (for time-series forecasting)
- **Database:** PostgreSQL (or CSV-based data storage for now)
- **Frontend:** JavaScript-based visualization tools
- **Deployment:** Docker (optional for production)

## 📌 Features
- Predicts **monthly** and **yearly** Water Quality Index (WQI).
- Supports **multiple water sources** (filterable by `source_id`).
- Uses **Facebook Prophet** for accurate time-series forecasting.
- **FastAPI-based REST API** for seamless integration with web applications.

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

### 4️⃣ **Prepare the Dataset**
Ensure your `data.csv` file contains the following columns:
```csv
source_id, year, month, WQI
1, 2023, 1, 72.5
1, 2023, 2, 73.1
2, 2023, 1, 65.4
```

### 5️⃣ **Train the Prophet Model**
```bash
python train_model.py  # This script trains and saves the model
```

### 6️⃣ **Run the FastAPI Server**
```bash
uvicorn main:app --reload
```
The API will now be available at: `http://localhost:8000`

---

## 📡 API Endpoints

### 🔹 **Get Future Predictions**
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

---

## 📊 Using API Data in Frontend
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

---

## 🌍 Future Enhancements
- Integrate real-time water quality data from IoT sensors.
- Deploy the backend using **Docker + Cloud Hosting**.
- Improve model performance with additional environmental factors.

---

## 🤝 Contributors
- **Shrey Nagda** (Project Lead & Developer)
- Open for collaborations!

---

## 📜 License
This project is licensed under the **MIT License**.
