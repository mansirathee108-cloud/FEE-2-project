import { useState } from 'react';
import styles from './Health.module.css';
import { saveActivity } from '../modules/storage.js';
import FormField from '../components/FormField.jsx';

const DEMO_AMBULANCES = [
  'Oakridge North Response Unit',
  'Oakridge Central Response Unit',
  'Oakridge East Response Unit',
  'Oakridge West Response Unit',
];

const ACCEPTED_HEALTH_SUGGESTIONS = [
  'Extend evening hours at neighborhood clinics.',
  'Offer more weekend vaccination appointments.',
  'Add clearer accessibility and wayfinding signs at health centers.',
];

function selectDemoAmbulances() {
  const available = [...DEMO_AMBULANCES];
  for (let index = available.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [available[index], available[swapIndex]] = [available[swapIndex], available[index]];
  }
  return available.slice(0, 2).map((name) => ({
    name,
    distance: Math.floor(Math.random() * 951) + 50,
  }));
}

export default function Health() {
  const [ambulances] = useState(selectDemoAmbulances);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('m');
  const [bmiResult, setBmiResult] = useState('');
  const [bmiError, setBmiError] = useState('');
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentResult, setAppointmentResult] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [dose, setDose] = useState('Dose 1');
  const [vacResult, setVacResult] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionResult, setSuggestionResult] = useState('');

  const bmi = (event) => {
    event.preventDefault();
    const w = Number.parseFloat(weight);
    const enteredHeight = Number.parseFloat(height);
    const h = heightUnit === 'in' ? enteredHeight * 0.0254 : enteredHeight;

    if (!Number.isFinite(w) || w <= 0) {
      setBmiError('Enter a weight greater than zero.');
      return;
    }
    if (!Number.isFinite(h) || h <= 0) {
      setBmiError('Enter a height greater than zero.');
      return;
    }

    setBmiError('');

    let val = (w / (h * h)).toFixed(1);
    let msg = '';

    if (val < 18.5) {
      msg = 'Underweight - Eat nutritious meals and gain healthy weight.';
    } else if (val < 25) {
      msg = 'Healthy BMI - Keep maintaining your lifestyle.';
    } else if (val < 30) {
      msg = 'Overweight - Exercise regularly and improve diet.';
    } else {
      msg = 'Obese Range - Consult a doctor.';
    }

    setBmiResult('BMI: ' + val + ' | ' + msg);
  };

  const saveVac = (event) => {
    event.preventDefault();
    let n = citizenName;
    let d = dose;
    saveActivity('Vaccination', n + ' - ' + d, 'vaccination');
    setVacResult('Saved for ' + n);
  };

  const submitSuggestion = (event) => {
    event.preventDefault();
    if (!saveActivity('Health Suggestion', suggestionText, 'suggestion')) {
      setSuggestionResult('Please enter a suggestion before submitting.');
      return;
    }

    setSuggestionResult('Thank you. Your healthcare suggestion has been submitted.');
    setSuggestionText('');
  };

  const bookApp = (event) => {
    event.preventDefault();
    let n = appointmentName;
    let d = appointmentDate;
    saveActivity('Health Appointment', n + ' - ' + d, 'appointment');
    setAppointmentResult('Appointment booked for ' + n + ' on ' + d);
  };

  return (
    <>
      <h1 className={styles.header}>
        <img src="hospital.png" className={styles.logo} /> Health Services
      </h1>
      <div className={styles.healthPage}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.redS}>🏥 Main Hospital Portal</h2>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
              alt="Hospital"
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '16px',
                marginBottom: '10px',
              }}
            />
            <p className={styles.small}>
              Oakridge Central Hospital offers emergency care, surgeries, diagnostics and specialist
              treatment 24/7.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.redS}>Hospital Branches</h2>
            <ul className={styles.branchList}>
              <li className={styles.branchItem} style={{ animationDelay: '0ms' }}>
                <span className={styles.statusDot} />
                School Clinic North Campus
              </li>
              <li className={styles.branchItem} style={{ animationDelay: '80ms' }}>
                <span className={styles.statusDot} />
                College Health Wing East Zone
              </li>
              <li className={styles.branchItem} style={{ animationDelay: '160ms' }}>
                <span className={styles.statusDotClosed} />
                Community Branch West Sector
              </li>
              <li className={styles.branchItem} style={{ animationDelay: '240ms' }}>
                <span className={styles.statusDot} />
                Downtown Diagnostic Center
              </li>
              <li className={styles.branchItem} style={{ animationDelay: '320ms' }}>
                <span className={styles.statusDotClosed} />
                Riverside Outpatient Unit
              </li>
              <li className={styles.branchItem} style={{ animationDelay: '400ms' }}>
                <span className={styles.statusDot} />
                Industrial Park Health Post
              </li>
            </ul>
          </div>
          <div className={styles.card}>
            <h2 className={styles.redS}>🚑 Ambulance Emergency</h2>
            <img
              src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=900&q=80"
              alt="Ambulance"
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '16px',
                marginBottom: '10px',
              }}
            />
            <div className={styles.ambulanceStats}>
              <div className={styles.ambulanceStat}>
                <span>Emergency Helpline</span>
                <strong>108</strong>
              </div>
              <div className={styles.ambulanceStat}>
                <span>Smart Response Vans Active</span>
                <strong>26</strong>
              </div>
            </div>
            <p className={styles.nearbyUnitsLabel}>Nearby response units</p>
            <ul className={styles.ambulanceList}>
              {ambulances.map((ambulance) => (
                <li key={ambulance.name}>
                  {ambulance.name} - {ambulance.distance} m
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.card}>
            <h2 className={styles.redS}>⚕️ BMI Calculator</h2>
            <form onSubmit={bmi}>
              <FormField
                id="w"
                label="Weight (kg)"
                type="number"
                min="0.1"
                step="any"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                className={styles.input}
                required
              />
              <label className={styles.inputLabel} htmlFor="height">
                Height
              </label>
              <div className={styles.heightControl}>
                <input
                  id="height"
                  className={styles.input}
                  type="number"
                  min="0.1"
                  step="any"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  required
                />
                <select
                  className={styles.heightUnit}
                  aria-label="Height unit"
                  value={heightUnit}
                  onChange={(event) => setHeightUnit(event.target.value)}
                >
                  <option value="m">m</option>
                  <option value="in">in</option>
                </select>
              </div>
              {bmiError && <p role="alert">{bmiError}</p>}
              <button className={styles.button} type="submit">
                Calculate BMI
              </button>
            </form>
            <div
              id="bmires"
              className={styles.result}
              role="status"
              style={{
                padding: '12px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,.06)',
                minHeight: '60px',
              }}
            >
              {bmiResult}
            </div>
          </div>
          <div className={styles.card} id="vac">
            <h2 className={styles.redS}>Vaccination Booking</h2>
            <form onSubmit={bookApp}>
              <FormField
                id="apname"
                label="Appointment name"
                value={appointmentName}
                onChange={(event) => setAppointmentName(event.target.value)}
                className={styles.input}
                minLength={2}
                maxLength={80}
                required
              />
              <FormField
                id="apdate"
                label="Appointment date"
                type="date"
                value={appointmentDate}
                onChange={(event) => setAppointmentDate(event.target.value)}
                className={styles.input}
                required
              />
              <button className={styles.button} type="submit">
                Book Appointment
              </button>
            </form>
            <div id="appres" className={styles.result} role="status">
              {appointmentResult}
            </div>
            <hr style={{ margin: '14px 0', borderColor: 'rgba(255,255,255,.08)' }} />
            <h2 className={styles.redS}>Vaccination Report</h2>
            <form onSubmit={saveVac}>
              <FormField
                id="name"
                label="Citizen name"
                value={citizenName}
                onChange={(event) => setCitizenName(event.target.value)}
                className={styles.input}
                minLength={2}
                maxLength={80}
                required
              />
              <FormField
                id="dose"
                label="Dose"
                as="select"
                value={dose}
                onChange={(event) => setDose(event.target.value)}
                className={styles.input}
              >
                <option>Dose 1</option>
                <option>Dose 2</option>
                <option>Booster</option>
              </FormField>
              <button className={styles.button} type="submit">
                Submit Report
              </button>
            </form>
            <div id="vacres" className={styles.result} role="status">
              {vacResult}
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.redS}>Healthcare Suggestions</h2>
            <form onSubmit={submitSuggestion}>
              <FormField
                id="health-suggestion"
                label="What could the city improve in its healthcare system?"
                as="textarea"
                rows="5"
                minLength={5}
                maxLength={500}
                placeholder="Share an idea for improving local healthcare"
                value={suggestionText}
                onChange={(event) => setSuggestionText(event.target.value)}
                className={styles.input}
                required
              />
              <button className={styles.button} type="submit">
                Submit Suggestion
              </button>
            </form>
            <div id="suggestion-result" className={styles.result} role="status">
              {suggestionResult}
            </div>
            <h3 className={styles.acceptedTitle}>Recently accepted suggestions</h3>
            <ul className={styles.acceptedSuggestions}>
              {ACCEPTED_HEALTH_SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
