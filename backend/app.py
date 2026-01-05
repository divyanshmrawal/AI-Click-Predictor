from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

# Initialize FastAPI app
app = FastAPI(title="Ad Click Predictor API")

# Enable CORS (allows frontend to communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
model_path = os.path.join(os.path.dirname(
    __file__), "models", "ad_click_model.pkl")
model = joblib.load(model_path)

# Define input data structure


class UserInput(BaseModel):
    age: int
    daily_time_spent: float
    area_income: float
    daily_internet_usage: float
    male: int  # 1 = Male, 0 = Female

# Root endpoint (test if server is running)


@app.get("/")
def home():
    return {"message": "Ad Click Predictor API is running!"}

# Prediction endpoint


@app.post("/predict")
def predict_ad_click(user_data: UserInput):
    # Prepare data for model
    input_data = {
        "Daily Time Spent on Site": user_data.daily_time_spent,
        "Age": user_data.age,
        "Area Income": user_data.area_income,
        "Daily Internet Usage": user_data.daily_internet_usage,
        "Male": user_data.male
    }

    # Convert to DataFrame
    df = pd.DataFrame([input_data])

    # Make prediction
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0]

    # Return result
    return {
        "prediction": int(prediction),
        "message": "User will click the ad" if prediction == 1 else "User will NOT click the ad",
        "probability_no_click": round(float(probability[0]) * 100, 2),
        "probability_click": round(float(probability[1]) * 100, 2)
    }
