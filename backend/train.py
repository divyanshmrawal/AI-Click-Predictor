import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load and prepare data
ad_data = pd.read_csv('advertising.csv')
X = ad_data[['Daily Time Spent on Site', 'Age', 'Area Income','Daily Internet Usage', 'Male']]
y = ad_data['Clicked on Ad']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

# Train model
logmodel = LogisticRegression()
logmodel.fit(X_train, y_train)

# Save model
joblib.dump(logmodel, 'ad_click_model.pkl')

# Print training results
train_accuracy = accuracy_score(y_train, logmodel.predict(X_train))
test_accuracy = accuracy_score(y_test, logmodel.predict(X_test))

print(f"Training accuracy: {train_accuracy:.4f}")
print(f"Test accuracy: {test_accuracy:.4f}")
print("Model saved as 'ad_click_model.pkl'")