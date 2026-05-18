/* ══════════════════════════════════════
   AdSense AI — Click Predictor
   script.js — Frontend Logic & API
   Backend: FastAPI at http://127.0.0.1:8000
   ══════════════════════════════════════ */

// ── State ──────────────────────────────
let selectedGender = 0; // 0 = Female, 1 = Male

// ── Gender Toggle ───────────────────────
function setGender(val) {
  selectedGender = val;
  document.getElementById('btn-male').classList.toggle('active', val === 1);
  document.getElementById('btn-female').classList.toggle('active', val === 0);
}

// ── Error Handling ──────────────────────
function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = '⚠  ' + msg;
  el.classList.add('visible');
}

function clearError() {
  const el = document.getElementById('errorMsg');
  el.textContent = '';
  el.classList.remove('visible');
}

// ── Loading State ───────────────────────
function setLoading(on) {
  const btn  = document.getElementById('predictBtn');
  const bar  = document.getElementById('loadingBar');
  const note = document.getElementById('btnNote');

  btn.disabled = on;

  if (on) {
    bar.classList.add('active');
    note.textContent = 'Running model…';
  } else {
    bar.classList.remove('active');
    note.textContent = 'All fields required';
  }
}

// ── Insight Generator ───────────────────
function getInsight(clickProb, willClick) {
  if (willClick) {
    if (clickProb >= 80) {
      return {
        icon:  '🎯',
        title: 'High Intent Signal',
        body:  'Strong indicators suggest this user is very likely to engage. Consider prioritising this segment with premium ad placements and time-sensitive offers.'
      };
    }
    return {
      icon:  '📈',
      title: 'Moderate Click Likelihood',
      body:  'The model detects positive intent. A compelling CTA and relevant ad creative could convert this user effectively.'
    };
  } else {
    if (clickProb <= 20) {
      return {
        icon:  '🔕',
        title: 'Low Engagement Probability',
        body:  'This user profile historically disengages with ads. Consider retargeting strategies or adjusting frequency to avoid banner blindness.'
      };
    }
    return {
      icon:  '⚖️',
      title: 'Borderline Prediction',
      body:  'The model leans toward no-click, but the margin is not decisive. A/B testing different creatives may shift the outcome.'
    };
  }
}

// ── Display Result ──────────────────────
function displayResult(data) {
  const willClick  = data.prediction === 1;
  const clickProb  = parseFloat(data.probability_click);
  const noClickProb = parseFloat(data.probability_no_click);

  // Verdict text
  document.getElementById('verdictText').textContent = willClick
    ? 'User will click the ad'
    : 'User will not click the ad';

  // Big score
  document.getElementById('scoreClick').textContent = clickProb.toFixed(1);

  // Probability labels
  document.getElementById('probClickVal').textContent   = clickProb.toFixed(2) + '%';
  document.getElementById('probNoClickVal').textContent = noClickProb.toFixed(2) + '%';

  // Show result section
  const section = document.getElementById('result-section');
  section.classList.remove('visible');
  section.style.display = 'block';

  // Animate probability bars after paint (double rAF ensures CSS transition fires)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById('barClick').style.width   = clickProb + '%';
      document.getElementById('barNoClick').style.width = noClickProb + '%';
    });
  });

  // Insight block
  const insight = getInsight(clickProb, willClick);
  document.getElementById('insightIcon').textContent  = insight.icon;
  document.getElementById('insightTitle').textContent = insight.title;
  document.getElementById('insightBody').textContent  = insight.body;

  // Trigger fade-up animation
  void section.offsetWidth; // reflow
  section.classList.add('visible');

  // Smooth scroll to result
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Main Predict Function ───────────────
async function predict() {
  clearError();

  // Read form values
  const age            = parseFloat(document.getElementById('age').value);
  const daily_time     = parseFloat(document.getElementById('daily_time').value);
  const area_income    = parseFloat(document.getElementById('area_income').value);
  const internet_usage = parseFloat(document.getElementById('internet_usage').value);

  // Validate
  if ([age, daily_time, area_income, internet_usage].some(v => isNaN(v))) {
    showError('Please fill in all numeric fields before running the prediction.');
    return;
  }

  if (age < 18 || age > 100) {
    showError('Age must be between 18 and 100.');
    return;
  }

  if (daily_time < 0 || internet_usage < 0 || area_income < 0) {
    showError('Time, usage, and income values cannot be negative.');
    return;
  }

  setLoading(true);

  try {
    // POST request to FastAPI backend
    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age:                 age,
        daily_time_spent:    daily_time,
        area_income:         area_income,
        daily_internet_usage: internet_usage,
        male:                selectedGender   // 1 = Male, 0 = Female
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Server error: ${response.status}`);
    }

    const data = await response.json();
    displayResult(data);

  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      showError('Cannot reach the API. Make sure the backend is running: uvicorn app:app --reload');
    } else {
      showError(err.message);
    }
    console.error('[AdSense AI] Prediction error:', err);
  } finally {
    setLoading(false);
  }
}

// ── Allow Enter key to submit ───────────
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const active = document.activeElement;
    if (active && active.classList.contains('field-input')) {
      predict();
    }
  }
});
