import joblib
import pandas as pd

# load trained model
model = joblib.load("ad_click_model.pkl")

def predict_click(age, daily_time_spent, income, internet_usage, male):
    input_data = {
        "Daily Time Spent on Site": daily_time_spent,
        "Age": age,
        "Area Income": income,
        "Daily Internet Usage": internet_usage,
        "Male": male
    }

    df = pd.DataFrame([input_data])
    prediction = model.predict(df)[0]
    return prediction


# TEMP: test from terminal (user typing)
if __name__ == "__main__":
    age = int(input("Enter Age: "))
    daily_time = float(input("Daily Time Spent on Site: "))
    income = float(input("Area Income: "))
    internet = float(input("Daily Internet Usage: "))
    male = int(input("Male (1 = Yes, 0 = No): "))

    result = predict_click(age, daily_time, income, internet, male)

    print("User will click Ad" if result == 1 else "User will NOT click Ad")
