import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Security.module.css';
import { saveActivity } from '../modules/storage.js';
import { getCurrentUser, canAccess } from '../modules/auth.js';
import { panicModeSet } from '../store/citySlice.js';
import FormField from '../components/FormField.jsx';

export default function Security() {
  const user = getCurrentUser();
  const canControlPanic = canAccess(user, ['mayor', 'police']);
  const canPublishReports = canAccess(user, ['mayor', 'police', 'citizen']);
  const dispatch = useDispatch();
  const panicActive = useSelector((state) => state.city.panicActive);
  const [firName, setFirName] = useState('');
  const [crime, setCrime] = useState('Theft');
  const [details, setDetails] = useState('');
  const [firResult, setFirResult] = useState('');
  const [bribeText, setBribeText] = useState('');
  const [bribeResult, setBribeResult] = useState('');

  function submitFIR(event) {
    event.preventDefault();
    saveActivity('FIR Report', `${firName} | ${crime} | ${details}`, 'complaint');
    setFirResult(`FIR submitted successfully for ${firName}`);
    setFirName('');
    setDetails('');
  }

  const alerts = [
    'Cyber Fraud Alert reported in Central Market Area.',
    'Vehicle theft reported near Riverside Parking Lot.',
    'Noise disturbance complaint in Green Park Colony.',
    'Suspicious vehicle detected near Metro Station.',
    'Night patrol increased in South Zone sectors.',
    'Traffic surveillance upgraded near City Mall.',
    'Online scam warning issued for fake banking links.',
  ];

  function checkBribe(event) {
    event.preventDefault();
    const text = bribeText.toLowerCase();
    saveActivity('Anti-Bribery Report', bribeText, 'complaint');
    if (text.includes('bribe')) {
      setBribeResult('Anti-corruption department has received your report.');
    } else {
      setBribeResult('Report submitted for review.');
    }
    setBribeText('');
  }

  function panicMode() {
    if (!canControlPanic) {
      alert('Only authorized personnel can perform this action.');
      return;
    }
    const nextState = !panicActive;
    dispatch(panicModeSet(nextState));

    if (nextState) {
      alert('🚨 Emergency Panic Mode Activated!\nNearest police units have been alerted.');
    } else {
      document.body.style.background = '';
      alert('Emergency Panic Mode Deactivated.');
    }
  }

  return (
    <div className={styles.securityPage}>
      <h1 className={styles.header}>
        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 48 48">
          <path d="M0 0h48v48H0z" fill="none" />
          <g fill="none" stroke-linejoin="round" stroke-width="4">
            <path
              fill="#2F88FF"
              stroke="#000"
              d="M6 9.25564L24.0086 4L42 9.25564V20.0337C42 31.3622 34.7502 41.4194 24.0026 45.0005C13.2521 41.4195 6 31.36 6 20.0287V9.25564Z"
            />
            <path stroke="#fff" stroke-linecap="round" d="M15 23L22 30L34 18" />
          </g>
        </svg>
        Security
      </h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>👮 Police Headquarters</h2>

          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
            alt="Police headquarters"
          />

          <p className={styles.small}>
            Oakridge Smart Police Headquarters monitors city safety, cybercrime prevention,
            emergency response systems and smart surveillance across all sectors of the city.
          </p>
        </div>

        <div className={styles.card}>
          <h2>🚨 Emergency Helplines</h2>

          <div className={styles.helpline}>
            <p>
              <span className={styles.highlight}>Police Emergency:</span> 100
            </p>

            <p>
              <span className={styles.highlight}>National Emergency:</span> 112
            </p>

            <p>
              <span className={styles.highlight}>Women Helpline:</span> 1091
            </p>

            <p>
              <span className={styles.highlight}>Cyber Crime:</span> 1930
            </p>

            <p>
              <span className={styles.highlight}>Ambulance:</span> 108
            </p>
          </div>
        </div>

        {canPublishReports && (
          <div className={styles.card}>
            <h2>📝 FIR Complaint Form</h2>
            <form onSubmit={submitFIR}>
              <FormField
                id="name"
                label="Citizen name"
                value={firName}
                onChange={(event) => setFirName(event.target.value)}
                className={styles.input}
                minLength={2}
                maxLength={100}
                required
              />
              <FormField
                id="crime"
                label="Incident type"
                as="select"
                value={crime}
                onChange={(event) => setCrime(event.target.value)}
                className={styles.input}
                required
              >
                <option>Theft</option>
                <option>Cyber Crime</option>
                <option>Harassment</option>
                <option>Assault</option>
                <option>Fraud</option>
              </FormField>
              <FormField
                id="details"
                label="Incident details"
                as="textarea"
                rows="5"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                className={styles.input}
                minLength={5}
                maxLength={1000}
                required
              />
              <button className={styles.button} type="submit">
                Submit FIR
              </button>
            </form>
            <div id="firResult" className={styles.result} role="status">
              {firResult}
            </div>
          </div>
        )}

        <div className={styles.card}>
          <h2>🚨 Live Crime Alerts</h2>
          <div className={styles.alertBox}>
            <div className={styles.alertTrack}>
              {alerts.map((alert, i) => (
                <p key={`a-${i}`} className={styles.alertLine}>
                  {alert}
                </p>
              ))}
              {/* duplicate the list so the loop is seamless */}
              {alerts.map((alert, i) => (
                <p key={`b-${i}`} className={styles.alertLine}>
                  {alert}
                </p>
              ))}
            </div>
          </div>
        </div>

        {canPublishReports && (
          <div className={styles.card}>
            <h2>💰 Anti-Bribery Monitoring</h2>

            <p className={styles.small}>
              Report bribery or corruption you've witnessed. All submissions are reviewed by the
              Anti-Corruption Cell and can be filed anonymously.
            </p>

            <div className={styles.bribeStats}>
              <div className={styles.bribeStatItem}>
                <span className={styles.bribeStatNumber}>212</span>
                <span className={styles.bribeStatLabel}>Reports This Month</span>
              </div>
              <div className={styles.bribeStatItem}>
                <span className={styles.bribeStatNumber}>89%</span>
                <span className={styles.bribeStatLabel}>Cases Reviewed</span>
              </div>
              <div className={styles.bribeStatItem}>
                <span className={styles.bribeStatNumber}>24h</span>
                <span className={styles.bribeStatLabel}>Avg Response Time</span>
              </div>
            </div>

            <div className={styles.bribeFootnote}>
              🔒 Your identity is kept confidential unless you choose to share it.
            </div>
            <form onSubmit={checkBribe}>
              <FormField
                id="bribeText"
                label="Incident details"
                as="textarea"
                rows="5"
                minLength={5}
                maxLength={1000}
                placeholder="Describe the incident: who, where, and when it occurred"
                value={bribeText}
                onChange={(event) => setBribeText(event.target.value)}
                className={styles.input}
                required
              />
              <button className={styles.button} type="submit">
                Submit Report
              </button>
            </form>
            <div id="bribeResult" className={styles.result} role="status">
              {bribeResult}
            </div>
          </div>
        )}

        <div className={styles.card}>
          <h2>🛡️ City Safety Index</h2>

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
            alt="City safety monitoring"
          />

          <p className={styles.small}>
            Current city safety score based on police response, crime control and surveillance
            efficiency.
          </p>

          <div className={styles.result}>Safety Index: 94% Secure</div>

          <button className={styles.panic} onClick={panicMode}>
            {panicActive ? '🟢 TURN OFF EMERGENCY PANIC MODE' : '🚨 ACTIVATE EMERGENCY PANIC MODE'}
          </button>

          <div id="panicResult" className={styles.result}></div>
        </div>
      </div>
    </div>
  );
}
