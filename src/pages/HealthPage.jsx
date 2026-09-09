import { useState } from "react";
import styles from "./Health.module.css";
import { saveActivity, saveComplaint } from '../modules/complaints.js';

export default function Health(){
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [bmiResult, setBmiResult] = useState("");
    const [appointmentName, setAppointmentName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentResult, setAppointmentResult] = useState("");
    const [citizenName, setCitizenName] = useState("");
    const [dose, setDose] = useState("Dose 1");
    const [vacResult, setVacResult] = useState("");
    const [complaintText, setComplaintText] = useState("");
    const [complaintResult, setComplaintResult] = useState("");

    // Exact JS functionality preserved
    const convertInches = () => {
        let inch = parseFloat(heightInches);
        if(inch) {
            setHeight((inch * 0.0254).toFixed(2));
        }
    };

    const bmi = () => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        
        if(!w || !h) {
            alert('Please enter valid weight and height');
            return;
        }
        
        let val = (w/(h*h)).toFixed(1);
        let msg = '';
        
        if(val < 18.5) {
            msg = 'Underweight - Eat nutritious meals and gain healthy weight.';
        } else if(val < 25) {
            msg = 'Healthy BMI - Keep maintaining your lifestyle.';
        } else if(val < 30) {
            msg = 'Overweight - Exercise regularly and improve diet.';
        } else {
            msg = 'Obese Range - Consult a doctor.';
        }
        
        setBmiResult('BMI: ' + val + ' | ' + msg);
    };

    const saveVac = () => {
        let n = citizenName;
        let d = dose;
        localStorage.setItem('vaccination', n + ' - ' + d);
        saveActivity('Vaccination', n + ' - ' + d, 'vaccination');
        setVacResult('Saved for ' + n);
    };

    const complaint = () => {
        let c = complaintText;
        localStorage.setItem('healthComplaint', c);

        if (!saveComplaint('Health', c)) {
            setComplaintResult('Please enter a complaint before submitting');
            return;
        }

        setComplaintResult('Complaint submitted successfully');
    };

    const bookApp = () => {
        let n = appointmentName;
        let d = appointmentDate;
        saveActivity('Health Appointment', n + ' - ' + d, 'appointment');
        setAppointmentResult('Appointment booked for ' + n + ' on ' + d);
    };

    return(
        <>
        <h1 className={styles.header}><img src="hospital.png" className={styles.logo}/> Health Services</h1>
        <div className={styles.healthPage}>
        <div className={styles.grid}>
            <div className={styles.card}>
                <h2 className={styles.redS}>🏥 Main Hospital Portal</h2>
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80" alt="Hospital" style={{width: "100%", height: "160px", objectFit: "cover", borderRadius: "16px", marginBottom: "10px"}} />
                <p className={styles.small}>Oakridge Central Hospital offers emergency care, surgeries, diagnostics and specialist treatment 24/7.</p>
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
                <img src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=900&q=80" alt="Ambulance" style={{width: "100%", height: "160px", objectFit: "cover", borderRadius: "16px", marginBottom: "10px"}} />
                <p className={styles.small}>Emergency Helpline: 108<br/>Smart Response Vans Active: 26</p>
            </div>
            <div className={styles.card}>
                <h2 className={styles.redS}>⚕️ BMI Calculator</h2>
                <input className={styles.input} id="w" placeholder="Weight kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <input className={styles.input} id="h" placeholder="Height meters" value={height} onChange={(e) => setHeight(e.target.value)} />
                <input className={styles.input} id="inch" placeholder="Or Height in inches" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
                <button className={styles.button} onClick={convertInches}>Convert Inches to Meters</button>
                <button className={styles.button} onClick={bmi}>Calculate BMI</button>
                <div id="bmires" className={styles.result} style={{padding: "12px", borderRadius: "14px", background: "rgba(255,255,255,.06)", minHeight: "60px"}}>{bmiResult}</div>
            </div>
            <div className={styles.card} id="vac">
                <h2 className={styles.redS}>Vaccination Booking</h2>
                <input className={styles.input} id="apname" placeholder="Appointment Name" value={appointmentName} onChange={(e) => setAppointmentName(e.target.value)} />
                <input className={styles.input} id="apdate" type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                <button className={styles.button} onClick={bookApp}>Book Appointment</button>
                <div id="appres" className={styles.result}>{appointmentResult}</div>
                <hr style={{margin: "14px 0", borderColor: "rgba(255,255,255,.08)"}} />
                <h2 className={styles.redS}>Vaccination Report</h2>
                <input className={styles.input} id="name" placeholder="Citizen Name" value={citizenName} onChange={(e) => setCitizenName(e.target.value)} />
                <select className={styles.input} id="dose" value={dose} onChange={(e) => setDose(e.target.value)}>
                    <option>Dose 1</option>
                    <option>Dose 2</option>
                    <option>Booster</option>
                </select>
                <button className={styles.button} onClick={saveVac}>Submit Report</button>
                <div id="vacres" className={styles.result}>{vacResult}</div>
            </div>
            <div className={styles.card}>
                <h2 className={styles.redS}>Complaint Box</h2>
                <textarea className={styles.input} id="comp" rows="5" placeholder="Enter complaint" value={complaintText} onChange={(e) => setComplaintText(e.target.value)}></textarea>
                <button className={styles.button} onClick={complaint}>Send Complaint</button>
                <div id="compres" className={styles.result}>{complaintResult}</div>
            </div>
        </div>
        </div>

        </>
    )
}