# 🎯 Ad Click Predictor - Full Stack AI Application

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)
![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

A beautiful full-stack web application that predicts whether a user will click on an advertisement based on their demographic and behavioral data. Powered by Machine Learning (Logistic Regression) with a modern, responsive frontend.

## 🌟 Features

- **AI-Powered Predictions**: Uses a trained Logistic Regression model to predict ad click probability
- **Beautiful UI**: Modern, gradient-based design with smooth animations
- **Real-time Results**: Instant predictions with animated probability bars
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **RESTful API**: FastAPI backend with automatic documentation
- **Interactive**: User-friendly form with validation and error handling

## 📸 Screenshots

### Homepage
<img width="1892" height="863" alt="Screenshot 2026-01-06 120115" src="https://github.com/user-attachments/assets/44943840-5599-42c1-adc3-94294710794e" />

### Prediction Results
<img width="662" height="528" alt="Screenshot 2026-01-06 120247" src="https://github.com/user-attachments/assets/33dd94a2-5644-4a3f-812b-558396f9f293" />

## 🏗️ Project Structure

```
AI-Click-Predictor/
├── backend/                    # Backend (FastAPI + ML Model)
│   ├── models/
│   │   └── ad_click_model.pkl # Trained ML model
│   ├── data/
│   │   └── advertising.csv    # Training dataset
│   ├── train.py               # Model training script
│   ├── predict.py             # Prediction utility
│   ├── app.py                 # FastAPI server
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Backend documentation
├── frontend/                   # Frontend (HTML/CSS/JS)
│   ├── index.html             # Main webpage
│   ├── style.css              # Styles and animations
│   ├── script.js              # API communication logic
│   └── README.md              # Frontend documentation
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Edge)

### Installation & Running

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Click-Predictor.git
cd AI-Click-Predictor
```

#### 2. Start the Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app:app --reload
```

The backend will start at **http://127.0.0.1:8000**

#### 3. Open the Frontend

Open `frontend/index.html` in your web browser:

- **Option 1**: Double-click `frontend/index.html`
- **Option 2**: Right-click → Open with → Your Browser
- **Option 3**: Use a local server (e.g., Live Server in VS Code)

#### 4. Make a Prediction!

1. Fill in the form with user information:
   - Age
   - Daily Time Spent on Site (minutes)
   - Area Income ($)
   - Daily Internet Usage (minutes)
   - Gender
2. Click **"Predict Click Probability"**
3. See the AI prediction with probability scores!

## 📊 How It Works

### Machine Learning Model

The application uses **Logistic Regression** trained on advertising data with the following features:

| Feature                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| Age                      | User's age in years                                |
| Daily Time Spent on Site | Average time spent on website (minutes)            |
| Area Income              | Average income of the user's geographical area ($) |
| Daily Internet Usage     | Daily internet usage (minutes)                     |
| Gender                   | Male (1) or Female (0)                             |

**Output**: Binary classification (Click = 1, No Click = 0) with probability scores

### Architecture

```
┌─────────────┐      HTTP POST      ┌──────────────┐      Prediction      ┌─────────────┐
│   Frontend  │ ──────────────────> │   FastAPI    │ ──────────────────>  │  ML Model   │
│  (Browser)  │                     │   Backend    │                      │  (sklearn)  │
└─────────────┘ <──────────────────┘ └──────────────┘ <──────────────────┘ └─────────────┘
                  JSON Response                           Probabilities
```

1. **User Input**: User fills the form on the frontend
2. **API Request**: JavaScript sends POST request to `/predict` endpoint
3. **Model Processing**: FastAPI loads the model and makes prediction
4. **Response**: Returns prediction + probabilities as JSON
5. **Display**: Frontend shows results with animated bars

## 🛠️ Technologies Used

### Backend

- **Python 3.12** - Programming language
- **FastAPI** - Modern web framework for APIs
- **Uvicorn** - ASGI server
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **joblib** - Model serialization

### Frontend

- **HTML** - Structure
- **CSS** - Styling with gradients, animations, and glassmorphism
- **Vanilla JavaScript** - API communication and DOM manipulation
- **Google Fonts (Inter)** - Modern typography

## 📡 API Documentation

Once the backend is running, visit **http://127.0.0.1:8000/docs** for interactive API documentation (Swagger UI).

### Endpoints

#### `GET /`

Check if the API is running.

**Response:**

```json
{
  "message": "Ad Click Predictor API is running!"
}
```

#### `POST /predict`

Make a prediction based on user data.

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

**Response:**

```json
{
  "prediction": 0,
  "message": "User will NOT click the ad",
  "probability_no_click": 81.96,
  "probability_click": 18.04
}
```

## 🎨 UI Features

- **Gradient Backgrounds**: Beautiful purple gradient (#667eea → #764ba2)
- **Smooth Animations**: Fade-in, slide-up, and bounce effects
- **Interactive Elements**: Hover effects on inputs and buttons
- **Progress Bars**: Animated probability visualization
- **Responsive Design**: Adapts to all screen sizes
- **Error Handling**: User-friendly error messages

## 🧪 Testing

### Test the Backend

Visit http://127.0.0.1:8000/docs and use the interactive API tester.

### Test the Frontend

Use these sample inputs:

**Example 1: Will NOT Click**

- Age: 35
- Daily Time Spent: 60.5
- Area Income: 65000
- Daily Internet Usage: 200
- Gender: Male

**Example 2: Will Click**

- Age: 28
- Daily Time Spent: 80
- Area Income: 45000
- Daily Internet Usage: 250
- Gender: Female

## 📝 Development Process

This project was built step-by-step:

1. ✅ Trained Logistic Regression model on advertising data
2. ✅ Created FastAPI backend with prediction endpoint
3. ✅ Designed modern, responsive frontend
4. ✅ Implemented API communication with fetch API
5. ✅ Added animations and error handling
6. ✅ Tested end-to-end functionality

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 👨‍💻 Author

**Divyansh Rawal**

- GitHub ID : [GitHub](https://www.linkedin.com/in/divyanshmrawal)
- LinkedIn ID : [LinkedIn](https://www.linkedin.com/in/divyanshmrawal)

⭐ **If you found this project helpful, please give it a star!** ⭐
