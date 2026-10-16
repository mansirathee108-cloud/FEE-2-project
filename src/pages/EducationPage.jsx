import styles from './Education.module.css';
import { saveActivity } from '../modules/storage.js';
import { useState } from 'react';
import FormField from '../components/FormField.jsx';

export default function Education() {
  const [marks, setMarks] = useState('');
  const [income, setIncome] = useState('low');
  const [scholarshipResult, setScholarshipResult] = useState('');
  const [course, setCourse] = useState('50000');
  const [years, setYears] = useState('');
  const [feeResult, setFeeResult] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [admissionResult, setAdmissionResult] = useState('');

  function checkScholarship(event) {
    event.preventDefault();
    const markValue = Number(marks);
    let result = '';
    if (markValue >= 90 && income === 'low') {
      result = 'Full Scholarship Approved';
    } else if (markValue >= 75) {
      result = 'Partial Scholarship Available';
    } else {
      result = 'Scholarship Not Available';
    }
    setScholarshipResult(result);
  }

  function calculateFees(event) {
    event.preventDefault();
    setFeeResult(`Estimated Total Fees: ₹${Number(course) * Number(years)}`);
  }

  function submitAdmission(event) {
    event.preventDefault();
    saveActivity('Education Admission', `${studentName} | ${studentEmail} | ${department}`);
    setAdmissionResult(`Application submitted successfully for ${studentName}`);
    setStudentName('');
    setStudentEmail('');
  }

  return (
    <>
      <h1 className={styles.header}>
        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 14 14">
          <g fill="none">
            <path
              fill="#2859c5"
              fillRule="evenodd"
              d="M12.561 1.267c0-.577-.484-1.142-1.118-1.152h-.004L3.096.121a1.25 1.25 0 0 0-.741.243l-.96.707a.25.25 0 0 0 0 .403l.96.706c.214.159.474.244.742.244l8.342-.005h.004c.634-.01 1.118-.575 1.118-1.152"
              clipRule="evenodd"
            ></path>
            <path
              fill="#8fbffa"
              d="M1.723 4.118a.5.5 0 0 0-.5.5v7.188a.5.5 0 0 0 .5.5c1.617 0 2.678.243 3.413.538c.66.265 1.078.577 1.444.851l.122.091a.5.5 0 0 0 .596 0l.121-.09c.367-.274.785-.587 1.445-.852c.736-.295 1.796-.538 3.413-.538a.5.5 0 0 0 .5-.5V4.618a.5.5 0 0 0-.5-.5c-1.72 0-2.91.259-3.785.61A6.6 6.6 0 0 0 7 5.573a6.6 6.6 0 0 0-1.492-.845c-.875-.351-2.065-.61-3.785-.61"
            ></path>
            <path
              fill="#2859c5"
              d="M6.375 13.543V5.155l.015.01a1.19 1.19 0 0 0 1.235-.01v8.388a20 20 0 0 0-.327.244a.5.5 0 0 1-.596 0l-.122-.092z"
            ></path>
          </g>
        </svg>{' '}
        School And Education
      </h1>
      <div className={`${styles.educationPage} ${styles.grid}`}>
        <div className={styles.card}>
          <h2>🏫 Smart Schools</h2>

          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80" />

          <p className={styles.small}>
            Oakridge Smart Schools provide AI-supported classrooms, digital attendance systems and
            interactive learning environments.
          </p>

          <div className={styles['school-box']}>
            <h3>Oakridge Public Academy</h3>
            <p>
              Academic Rating: <span className="highlight">9.4/10</span>
            </p>
            <p>
              Sports Rating: <span className="highlight">8.9/10</span>
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <h2>🎓 Colleges & Universities</h2>

          <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80" />

          <p className={styles.small}>
            Top institutions in Oakridge offer engineering, medical, business and technology
            programs with modern campuses.
          </p>

          <div className={styles['school-box']}>
            <h3>Oakridge Tech University</h3>
            <p>
              Placement Rate: <span className="highlight">96%</span>
            </p>
            <p>
              Research Score: <span className="highlight">9.1/10</span>
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <h2>📊 Scholarship Predictor</h2>
          <form onSubmit={checkScholarship}>
            <FormField
              id="marks"
              label="Marks percentage"
              type="number"
              min="0"
              max="100"
              step="any"
              value={marks}
              onChange={(event) => setMarks(event.target.value)}
              placeholder="Enter percentage"
              required
            />
            <FormField
              id="income"
              label="Household income"
              as="select"
              value={income}
              onChange={(event) => setIncome(event.target.value)}
            >
              <option value="low">Low Income</option>
              <option value="medium">Middle Income</option>
              <option value="high">High Income</option>
            </FormField>
            <button type="submit">Check Eligibility</button>
          </form>
          <div id="scholarshipResult" className={styles.result} role="status">
            {scholarshipResult}
          </div>
        </div>

        <div className={styles.card}>
          <h2>🧮 Fee Calculator</h2>
          <form onSubmit={calculateFees}>
            <FormField
              id="course"
              label="Course"
              as="select"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
            >
              <option value="50000">Engineering - ₹50,000</option>
              <option value="45000">Medical - ₹45,000</option>
              <option value="35000">Business - ₹35,000</option>
              <option value="30000">Arts - ₹30,000</option>
            </FormField>
            <FormField
              id="years"
              label="Duration in years"
              type="number"
              min="1"
              max="10"
              step="1"
              value={years}
              onChange={(event) => setYears(event.target.value)}
              placeholder="Course Duration (Years)"
              required
            />
            <button type="submit">Calculate Fees</button>
          </form>
          <div id="feeResult" className={styles.result} role="status">
            {feeResult}
          </div>
        </div>

        <div className={styles.card}>
          <h2>📝 Student Admission Form</h2>
          <form onSubmit={submitAdmission}>
            <FormField
              id="studentName"
              label="Student name"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              placeholder="Student Name"
              minLength={2}
              maxLength={100}
              required
            />
            <FormField
              id="studentEmail"
              label="Email"
              type="email"
              value={studentEmail}
              onChange={(event) => setStudentEmail(event.target.value)}
              placeholder="Email"
              required
            />
            <FormField
              id="department"
              label="Department"
              as="select"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option>Engineering</option>
              <option>Medical</option>
              <option>Business</option>
              <option>Arts</option>
            </FormField>
            <button type="submit">Submit Application</button>
          </form>
          <div id="admissionResult" className={styles.result} role="status">
            {admissionResult}
          </div>
        </div>

        <div className={styles.card}>
          <h2>📚 Student Resources</h2>

          <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80" />

          <p className={styles.small}>
            Students can access e-libraries, virtual classrooms, career counseling and mentorship
            programs through the city's education portal.
          </p>
        </div>
      </div>
    </>
  );
}
