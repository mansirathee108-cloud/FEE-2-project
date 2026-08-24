

import styles from './Security.module.css';

export default function Security(){

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

    document.getElementById('firResult').textContent=
    'FIR submitted successfully for '+name;

    }

    const alerts=[
        
        'Cyber Fraud Alert reported in Central Market Area.',
        
        'Suspicious vehicle detected near Metro Station.',
        
        'Night patrol increased in South Zone sectors.',
        
        'Traffic surveillance upgraded near City Mall.',
        
        'Online scam warning issued for fake banking links.'
        
    ];

    let a=0;

    setInterval(()=>{
        
        a=(a+1)%alerts.length;
        
        document.getElementById('alertBox').textContent=alerts[a];
        
    },3000);

    function checkBribe(){
        
        let text=document.getElementById('bribeText').value.toLowerCase();
        
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
        
        document.body.style.background=
        'linear-gradient(135deg,#ffe5e5,#ffcccc,#ffeaea)';
        
        alert('🚨 Emergency Panic Mode Activated!\nNearest police units have been alerted.');
        
    }

    return(
        <div className={styles.securityPage}>
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

        <h2>📢 Live Crime Alerts</h2>

        <div id="alertBox" className={styles.alertBox}>
        Cyber Fraud Alert reported in Central Market Area.
        </div>

        </div>

        <div className={styles.card}>

        <h2>💰 Anti-Bribery Monitoring</h2>

        <textarea className={styles.input} id="bribeText" rows="5" placeholder="Enter suspicious bribery report"></textarea>

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
        🚨 ACTIVATE EMERGENCY PANIC MODE
        </button>

        <div id="panicResult" className={styles.result}></div>

        </div>

        </div>
        </div>
    )
}