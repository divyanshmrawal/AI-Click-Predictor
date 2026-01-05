// =========================================
// CONFIGURATION
// =========================================
const API_URL = 'http://127.0.0.1:8000/predict';

// =========================================
// DOM ELEMENTS
// =========================================
const form = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const resultsCard = document.getElementById('resultsCard');
const resultMain = document.getElementById('resultMain');
const probNoClick = document.getElementById('probNoClick');
const probClick = document.getElementById('probClick');
const barNoClick = document.getElementById('barNoClick');
const barClick = document.getElementById('barClick');

// =========================================
// FORM SUBMISSION HANDLER
// =========================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        age: parseInt(document.getElementById('age').value),
        daily_time_spent: parseFloat(document.getElementById('dailyTime').value),
        area_income: parseFloat(document.getElementById('income').value),
        daily_internet_usage: parseFloat(document.getElementById('internetUsage').value),
        male: parseInt(document.querySelector('input[name="gender"]:checked').value)
    };
    
    // Disable button and show loading state
    predictBtn.disabled = true;
    predictBtn.querySelector('.btn-text').textContent = 'Analyzing...';
    
    try {
        // Make API request
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    } finally {
        // Re-enable button
        predictBtn.disabled = false;
        predictBtn.querySelector('.btn-text').textContent = 'Predict Click Probability';
    }
});

// =========================================
// DISPLAY RESULTS FUNCTION
// =========================================
function displayResults(data) {
    // Show results card
    resultsCard.style.display = 'block';
    
    // Scroll to results smoothly
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Set result message and style
    if (data.prediction === 1) {
        resultMain.className = 'result-main positive';
        resultMain.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">✅</div>
            <div>${data.message}</div>
        `;
    } else {
        resultMain.className = 'result-main negative';
        resultMain.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">❌</div>
            <div>${data.message}</div>
        `;
    }
    
    // Update probability values
    probNoClick.textContent = `${data.probability_no_click}%`;
    probClick.textContent = `${data.probability_click}%`;
    
    // Animate progress bars
    setTimeout(() => {
        barNoClick.style.width = `${data.probability_no_click}%`;
        barClick.style.width = `${data.probability_click}%`;
    }, 200);
}

// =========================================
// ERROR HANDLING
// =========================================
function showError(message) {
    resultsCard.style.display = 'block';
    resultMain.className = 'result-main';
    resultMain.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    resultMain.style.color = 'white';
    resultMain.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚠️</div>
        <div style="font-size: 1.1rem; font-weight: 600;">Connection Error</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.9;">
            Could not connect to the prediction server.<br>
            Make sure your backend is running on port 8000.
        </div>
    `;
    
    // Hide probability bars on error
    document.querySelector('.probability-bars').style.display = 'none';
    
    // Scroll to error
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// =========================================
// RESET FORM FUNCTION
// =========================================
function resetForm() {
    // Hide results card
    resultsCard.style.display = 'none';
    
    // Reset form
    form.reset();
    
    // Reset progress bars
    barNoClick.style.width = '0%';
    barClick.style.width = '0%';
    
    // Show probability bars again (in case it was hidden)
    document.querySelector('.probability-bars').style.display = 'flex';
    
    // Scroll back to form
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =========================================
// Initialize
// =========================================
console.log('🎯 Ad Click Predictor loaded successfully!');
console.log(`📡 API Endpoint: ${API_URL}`);