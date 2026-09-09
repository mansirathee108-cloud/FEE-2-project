import { useState, useEffect } from 'react';

import styles from './Security.module.css';
import { isPanicAlertActive, saveActivity, setPanicAlert } from '../modules/complaints.js';

export default function Security(){
    const [panicActive, setPanicActive] = useState(isPanicAlertActive());

    function submitFIR(){

    let name=document.getElementById('name').value;

    let crime=document.getElementById('crime').value;

    let details=document.getElementById('details').value;

    if(name=='' || details==''){
        
        alert('Please fill all FIR details');
        
        return;
        
    }

    localStorage.setItem(
        'firReport',
        name+' | '+crime+' | '+details
    );
    saveActivity('FIR Report', name+' | '+crime+' | '+details, 'complaint');

    document.getElementById('firResult').textContent=
    'FIR submitted successfully for '+name;

    }

    const alerts = [
    "Cyber Fraud Alert reported in Central Market Area.",
    "Vehicle theft reported near Riverside Parking Lot.",
    "Noise disturbance complaint in Green Park Colony.",
    'Suspicious vehicle detected near Metro Station.',  
    'Night patrol increased in South Zone sectors.',
    'Traffic surveillance upgraded near City Mall.',
    'Online scam warning issued for fake banking links.'
    ];

    function checkBribe(){
        
        let originalText=document.getElementById('bribeText').value;
        let text=originalText.toLowerCase();
        saveActivity('Anti-Bribery Report', originalText, 'complaint');
        
        if(text.includes('bribe')){
            
            
            alert('⚠️ Bribery is illegal and punishable by law.');
            document.getElementById('bribeResult').textContent=
            'Anti-corruption department has received your report.';
            
        }
        
        else{
            
            document.getElementById('bribeResult').textContent=
            'Report submitted for review.';
            
        }
        
    }

    function panicMode(){
        const nextState = !panicActive;
        setPanicAlert(nextState);
        setPanicActive(nextState);

        if (nextState) {
            alert('🚨 Emergency Panic Mode Activated!\nNearest police units have been alerted.');
        } else {
            document.body.style.background='';
            alert('Emergency Panic Mode Deactivated.');
        }
        
    }

    return(
        <div className={styles.securityPage}>
        <h1 className={styles.header}><svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 48 48">
	<path d="M0 0h48v48H0z" fill="none" />
	<g fill="none" stroke-linejoin="round" stroke-width="4">
		<path fill="#2F88FF" stroke="#000" d="M6 9.25564L24.0086 4L42 9.25564V20.0337C42 31.3622 34.7502 41.4194 24.0026 45.0005C13.2521 41.4195 6 31.36 6 20.0287V9.25564Z" />
		<path stroke="#fff" stroke-linecap="round" d="M15 23L22 30L34 18" />
	</g>
</svg>
 Security</h1>

        <div className={styles.grid}>

        <div className={styles.card}>

        <h2>👮 Police Headquarters</h2>

        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" alt="Police headquarters"/>

        <p className={styles.small}>
        Oakridge Smart Police Headquarters monitors city safety,
        cybercrime prevention, emergency response systems and smart surveillance
        across all sectors of the city.
        </p>

        </div>

        <div className={styles.card}>

        <h2>🚨 Emergency Helplines</h2>

        <div className={styles.helpline}>

        <p><span className={styles.highlight}>Police Emergency:</span> 100</p>

        <p><span className={styles.highlight}>National Emergency:</span> 112</p>

        <p><span className={styles.highlight}>Women Helpline:</span> 1091</p>

        <p><span className={styles.highlight}>Cyber Crime:</span> 1930</p>

        <p><span className={styles.highlight}>Ambulance:</span> 108</p>

        </div>

        </div>

        <div className={styles.card}>

        <h2>📝 FIR Complaint Form</h2>

        <input className={styles.input} type="text" id="name" placeholder="Citizen Name"/>

        <select className={styles.input} id="crime">

        <option>Theft</option>
        <option>Cyber Crime</option>
        <option>Harassment</option>
        <option>Assault</option>
        <option>Fraud</option>

        </select>

        <textarea className={styles.input} id="details" rows="5" placeholder="Describe the incident"></textarea>

        <button className={styles.button} onClick={submitFIR}>
        Submit FIR
        </button>

        <div id="firResult" className={styles.result}></div>

        </div>

        <div className={styles.card}>
            <h2>🚨 Live Crime Alerts</h2>
            <div className={styles.alertBox}>
                <div className={styles.alertTrack}>
                    {alerts.map((alert, i) => (
                        <p key={`a-${i}`} className={styles.alertLine}>{alert}</p>
                    ))}
                    {/* duplicate the list so the loop is seamless */}
                    {alerts.map((alert, i) => (
                        <p key={`b-${i}`} className={styles.alertLine}>{alert}</p>
                    ))}
                </div>
            </div>
        </div>

        <div className={styles.card}>

        <h2>💰 Anti-Bribery Monitoring</h2>

        <p className={styles.small}>
            Report bribery or corruption you've witnessed. All submissions are
            reviewed by the Anti-Corruption Cell and can be filed anonymously.
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

        <textarea
            className={styles.input}
            id="bribeText"
            rows="5"
            placeholder="Describe the incident: who, where, and when it occurred"
        ></textarea>

        <div className={styles.bribeFootnote}>
            🔒 Your identity is kept confidential unless you choose to share it.
        </div>

        <button className={styles.button} onClick={checkBribe}>
            Submit Report
        </button>

        <div id="bribeResult" className={styles.result}></div>

        </div>

        <div className={styles.card}>

        <h2>🛡️ City Safety Index</h2>

        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" alt="City safety monitoring"/>

        <p className={styles.small}>
        Current city safety score based on police response,
        crime control and surveillance efficiency.
        </p>

        <div className={styles.result}>
        Safety Index: 94% Secure
        </div>

        <button className={styles.panic} onClick={panicMode}>
        {panicActive ? '🟢 TURN OFF EMERGENCY PANIC MODE' : '🚨 ACTIVATE EMERGENCY PANIC MODE'}
        </button>

        <div id="panicResult" className={styles.result}></div>

        </div>

        </div>
        </div>
    )
}