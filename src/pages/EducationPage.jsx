import styles from './Education.module.css'

export default function Education(){

    
        function toggleMenu(){

        document.getElementById('side').classList.toggle('show');

        }

        function checkScholarship(){

        let marks=parseFloat(document.getElementById('marks').value);

        let income=document.getElementById('income').value;

        let result='';

        if(marks>=90 && income==='low'){

        result='Full Scholarship Approved';

        }

        else if(marks>=75){

        result='Partial Scholarship Available';

        }

        else{

        result='Scholarship Not Available';

        }

        document.getElementById('scholarshipResult').textContent=result;

        }

        function calculateFees(){

        let course=parseInt(document.getElementById('course').value);

        let years=parseInt(document.getElementById('years').value);

        if(!years){

        alert('Please enter duration');

        return;

        }

        let total=course*years;

        document.getElementById('feeResult').textContent=
        'Estimated Total Fees: ₹'+total;

        }

        function submitAdmission(){

        let name=document.getElementById('studentName').value;

        let email=document.getElementById('studentEmail').value;

        let dept=document.getElementById('department').value;

        localStorage.setItem(
        'studentApplication',
        name+' | '+email+' | '+dept
        );

        document.getElementById('admissionResult').textContent=
        'Application submitted successfully for '+name;

        }

    return(
        <>
        <div className={`${styles.educationPage} ${styles.grid}`}>

        <div className={styles.card}>
            
            <h2>🏫 Smart Schools</h2>
            
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"/>
            
            <p className={styles.small}>
                Oakridge Smart Schools provide AI-supported classrooms,
                digital attendance systems and interactive learning environments.
            </p>
            
            <div className={styles['school-box']}>
                <h3>Oakridge Public Academy</h3>
                <p>Academic Rating: <span className="highlight">9.4/10</span></p>
                <p>Sports Rating: <span className="highlight">8.9/10</span></p>
            </div>
            
        </div>

        <div className={styles.card}>
            
            <h2>🎓 Colleges & Universities</h2>
            
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"/>
            
            <p className={styles.small}>
                Top institutions in Oakridge offer engineering,
                medical, business and technology programs with modern campuses.
            </p>
            
            <div className={styles['school-box']}>
                <h3>Oakridge Tech University</h3>
                <p>Placement Rate: <span className="highlight">96%</span></p>
                <p>Research Score: <span className="highlight">9.1/10</span></p>
            </div>
            
        </div>

        <div className={styles.card}>
            
            <h2>📊 Scholarship Predictor</h2>
            
            <input type="number" id="marks" placeholder="Enter percentage"/>
            
            <select id="income">
                <option value="low">Low Income</option>
                <option value="medium">Middle Income</option>
                <option value="high">High Income</option>
            </select>
            
            <button onClick={checkScholarship}>
                Check Eligibility
            </button>
            
            <div id="scholarshipResult" className={styles.result}></div>
            
        </div>

        <div className={styles.card}>
            
            <h2>🧮 Fee Calculator</h2>
            
            <select id="course">
                <option value="50000">Engineering - ₹50,000</option>
                <option value="45000">Medical - ₹45,000</option>
                <option value="35000">Business - ₹35,000</option>
                <option value="30000">Arts - ₹30,000</option>
            </select>
            
            <input type="number" id="years" placeholder="Course Duration (Years)"/>
            
            <button onClick={calculateFees}>
                Calculate Fees
            </button>
            
            <div id="feeResult" className={styles.result}></div>
            
        </div>

        <div className={styles.card}>
            
            <h2>📝 Student Admission Form</h2>
            
            <input type="text" id="studentName" placeholder="Student Name"/>
            
            <input type="email" id="studentEmail" placeholder="Email"/>
            
            <select id="department">
                <option>Engineering</option>
                <option>Medical</option>
                <option>Business</option>
                <option>Arts</option>
            </select>
            
            <button onClick={submitAdmission}>
                Submit Application
            </button>
            
            <div id="admissionResult" className={styles.result}></div>
            
        </div>

        <div className={styles.card}>
            
            <h2>📚 Student Resources</h2>
            
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80"/>
            
            <p className={styles.small}>
                Students can access e-libraries, virtual classrooms,
                career counseling and mentorship programs through the city's education portal.
            </p>
            
        </div>

        </div> 
        </>
    )
}