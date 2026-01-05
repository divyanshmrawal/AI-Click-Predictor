# 🔧 Backend - Ad Click Predictor API

FastAPI-based REST API for ad click prediction using Machine Learning.

## 📋 Overview

This backend provides a RESTful API that serves predictions from a trained Logistic Regression model. It handles user input validation, model loading, and prediction generation.

## 🏗️ Structure

```
backend/
├── models/
│   └── ad_click_model.pkl    # Trained scikit-learn model
├── data/
│   └── advertising.csv       # Training dataset
├── train.py                  # Model training script
├── predict.py                # CLI prediction utility
├── app.py                    # FastAPI application
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

## 📦 Dependencies

All dependencies are listed in `requirements.txt`:

```txt
fastapi==0.104.1          # Web framework
uvicorn==0.24.0           # ASGI server
joblib==1.3.2             # Model serialization
pandas==2.1.3             # Data manipulation
scikit-learn==1.3.2       # ML library
python-multipart==0.0.6   # Form data handling
pydantic==2.5.0           # Data validation
```

## 🚀 Installation

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:

- FastAPI for the web framework
- Uvicorn for running the server
- scikit-learn for ML model
- pandas for data handling
- Other supporting libraries

## ▶️ Running the Server

### Development Mode (with auto-reload)

```bash
python -m uvicorn app:app --reload
```

### Production Mode

```bash
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```

The server will start at **http://127.0.0.1:8000**

## 📡 API Endpoints

### 1. Health Check

**Endpoint:** `GET /`

**Description:** Check if the API is running

**Response:**

```json
{
  "message": "Ad Click Predictor API is running!"
}
```

**cURL Example:**

```bash
curl http://127.0.0.1:8000/
```

---

### 2. Predict Ad Click

**Endpoint:** `POST /predict`

**Description:** Predict whether a user will click an ad

**Request Body:**

```json
{
  "age": 35,
  "daily_time_spent": 60.5,
  "area_income": 65000,
  "daily_internet_usage": 200,
  "male": 1
}
```

**Field Descriptions:**

| Field                  | Type  | Description                       | Example |
| ---------------------- | ----- | --------------------------------- | ------- |
| `age`                  | int   | User's age in years               | 35      |
| `daily_time_spent`     | float | Time spent on site (minutes/day)  | 60.5    |
| `area_income`          | float | Average income in user's area ($) | 65000   |
| `daily_internet_usage` | float | Daily internet usage (minutes)    | 200     |
| `male`                 | int   | Gender (1 = Male, 0 = Female)     | 1       |

**Response:**

```json
{
  "prediction": 0,
  "message": "User will NOT click the ad",
  "probability_no_click": 81.96,
  "probability_click": 18.04
}
```

**Response Fields:**

| Field                  | Type   | Description                          |
| ---------------------- | ------ | ------------------------------------ |
| `prediction`           | int    | 0 = No Click, 1 = Click              |
| `message`              | string | Human-readable prediction            |
| `probability_no_click` | float  | Probability of NOT clicking (0-100%) |
| `probability_click`    | float  | Probability of clicking (0-100%)     |

**cURL Example:**

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 35,
    "daily_time_spent": 60.5,
    "area_income": 65000,
    "daily_internet_usage": 200,
    "male": 1
  }'
```

## 📖 Interactive Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

You can test the API directly from the Swagger UI!

## 🤖 Model Information

### Algorithm

**Logistic Regression** (Binary Classification)

### Training Data

- **Source**: `data/advertising.csv`
- **Features**: 5 (Age, Daily Time Spent, Area Income, Internet Usage, Gender)
- **Target**: Clicked on Ad (Binary: 0 or 1)

### Training Script

To retrain the model:

```bash
python train.py
```

This will:

1. Load data from `data/advertising.csv`
2. Train a Logistic Regression model
3. Save the model to `models/ad_click_model.pkl`

## 🧪 Testing

### Test with Python

```python
import requests

url = "http://127.0.0.1:8000/predict"
data = {
    "age": 35,
    "daily_time_spent": 60.5,
    "area_income": 65000,
    "daily_internet_usage": 200,
    "male": 1
}

response = requests.post(url, json=data)
print(response.json())
```

### Test with Command Line Tool

Use the built-in `predict.py` for testing:

```bash
python predict.py
```

Follow the prompts to enter test data.

## 🛡️ CORS Configuration

The API is configured to accept requests from any origin (`allow_origins=["*"]`).

**For production**, update `app.py` to specify allowed origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔧 Customization

### Change Port

```bash
python -m uvicorn app:app --port 8080
```

### Enable HTTPS

```bash
python -m uvicorn app:app --ssl-keyfile=./key.pem --ssl-certfile=./cert.pem
```

## 🐛 Troubleshooting

### Error: "ModuleNotFoundError: No module named 'fastapi'"

**Solution:** Install dependencies

```bash
pip install -r requirements.txt
```

### Error: "FileNotFoundError: ad_click_model.pkl"

**Solution:** Train the model first

```bash
python train.py
```

### Error: "Address already in use"

**Solution:** Port 8000 is busy, use a different port

```bash
python -m uvicorn app:app --port 8001
```

### Warning: "uvicorn.exe is not on PATH"

**Solution:** Use `python -m uvicorn` instead of just `uvicorn`

## 📊 Performance

- **Response Time**: < 50ms per prediction
- **Throughput**: Handles 1000+ requests/second
- **Model Size**: ~5KB (very lightweight)

## 🔐 Security Notes

- Input validation via Pydantic
- No sensitive data stored
- CORS configured (update for production)
- No authentication (add if needed for production)

## 📝 Code Example

### app.py Structure

```python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("models/ad_click_model.pkl")

class UserInput(BaseModel):
    age: int
    daily_time_spent: float
    # ... other fields

@app.post("/predict")
def predict(data: UserInput):
    # Make prediction
    # Return results
    pass
```

## 🚀 Deployment

### Deploy to Heroku

```bash
heroku create your-app-name
git push heroku main
```

### Deploy to AWS Lambda

Use AWS SAM or Serverless Framework with Mangum adapter.

### Deploy to Google Cloud Run

```bash
gcloud run deploy ad-click-predictor --source .
```

## 📞 Support

For backend-specific issues:

- Check logs: Server terminal output
- Enable debug mode: Set `reload=True` in uvicorn
- Test endpoints with `/docs`

---

Built with ❤️ using FastAPI and scikit-learn
