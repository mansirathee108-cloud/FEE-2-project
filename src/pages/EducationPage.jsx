import styles from './Education.module.css';
import { saveActivity } from '../modules/storage.js';
import { useState } from 'react';
import FormField from '../components/FormField.jsx';

const FEE_OPTIONS = {
  school: [
    { name: 'Oakridge Public Academy', annualFee: 24000 },
    { name: 'Vtuber Academy', annualFee: 42000 },
    { name: 'Oakridge Science School', annualFee: 38000 },
    { name: 'Riverside Community School', annualFee: 22000 },
    { name: 'Oakridge Arts Academy', annualFee: 34000 },
  ],
  college: [
    {
      name: 'Northstar University',
      courses: [
        { name: 'Artificial intelligence and machine learning', annualFee: 82000 },
        { name: 'Computer science', annualFee: 76000 },
      ],
    },
    {
      name: 'Riverside Institute of Technology',
      courses: [
        { name: 'Environmental engineering', annualFee: 78000 },
        { name: 'Civil engineering', annualFee: 74000 },
      ],
    },
    {
      name: 'Oakridge Medical University',
      courses: [
        { name: 'Community healthcare', annualFee: 96000 },
        { name: 'Nursing', annualFee: 68000 },
      ],
    },
    {
      name: 'Westbridge Business College',
      courses: [
        { name: 'Entrepreneurship and finance', annualFee: 64000 },
        { name: 'Business administration', annualFee: 61000 },
      ],
    },
  ],
};

const SCHOOL_YEARS = [
  'KG',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
];

export default function Education() {
  const [marks, setMarks] = useState('');
  const [income, setIncome] = useState('low');
  const [scholarshipInstitution, setScholarshipInstitution] = useState('');
  const [scholarshipResult, setScholarshipResult] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [admissionResult, setAdmissionResult] = useState('');
  const selectedInstitution = FEE_OPTIONS[institutionType]?.find(
    (institution) => institution.name === institutionName,
  );
  const selectedCourseFee =
    institutionType === 'school'
      ? SCHOOL_YEARS.includes(selectedCourse)
        ? selectedInstitution?.annualFee
        : undefined
      : selectedInstitution?.courses.find((courseOption) => courseOption.name === selectedCourse)
          ?.annualFee;

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
          <div className={styles['school-box']}>
            <h3>Oakridge Public Academy</h3>
            <p>Speciality: Smart classrooms and environmental projects</p>
          </div>
          <div className={styles['school-box']}>
            <h3>Vtuber Academy</h3>
            <p>Speciality: Extracurricular activities and digital arts</p>
          </div>
          <div className={styles['school-box']}>
            <h3>Oakridge Science School</h3>
            <p>Speciality: Hands-on science labs and robotics clubs</p>
          </div>
          <div className={styles['school-box']}>
            <h3>Riverside Community School</h3>
            <p>Speciality: Community service and outdoor learning</p>
          </div>
          <div className={styles['school-box']}>
            <h3>Oakridge Arts Academy</h3>
            <p>Speciality: Visual arts, theatre and music programs</p>
          </div>
          {/* <div className={styles['school-box']}>
            <h3>Northstar Learning School</h3>
            <p>Speciality: Inclusive learning and student support</p>
          </div>
          <div className={styles['school-box']}>
            <h3>Greenfield Preparatory</h3>
            <p>Speciality: Gardening, sustainability and nature studies</p>
          </div>
          <div className={styles['school-box']}>
            <h3>Oakridge Sports School</h3>
            <p>Speciality: Athletics training and team sports</p>
          </div> */}
        </div>

        <div className={styles.card}>
          <h2>🎓 Colleges & Universities</h2>
          <div className={styles['school-box']}>
            <h3>Northstar University - AI and machine learning</h3>
            <p>Placement Rate: <span className="highlight">96%</span></p>
          </div>
          <div className={styles['school-box']}>
            <h3>Riverside Institute of Technology - Environmental engineering</h3>
            <p>Placement Rate: <span className="highlight">93%</span></p>
          </div>
          <div className={styles['school-box']}>
            <h3>Oakridge Medical University - Community healthcare</h3>
            <p>Placement Rate: <span className="highlight">91%</span></p>
          </div>
          <div className={styles['school-box']}>
            <h3>Westbridge Business College - Entrepreneurship and finance</h3>
            <p>Placement Rate: <span className="highlight">89%</span></p>
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
              <option value="low">Low (under $10,000 PA)</option>
              <option value="medium">Medium ($10,000-$50,000 PA)</option>
              <option value="high">High (over $50,000 PA)</option>
            </FormField>
            <FormField
              id="scholarshipInstitution"
              label="School or university/college"
              as="select"
              value={scholarshipInstitution}
              onChange={(event) => setScholarshipInstitution(event.target.value)}
              required
            >
              <option value="">Select an institution</option>
              <optgroup label="Schools">
                {FEE_OPTIONS.school.map((school) => (
                  <option key={school.name} value={school.name}>
                    {school.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Universities and colleges">
                {FEE_OPTIONS.college.map((institution) => (
                  <option key={institution.name} value={institution.name}>
                    {institution.name}
                  </option>
                ))}
              </optgroup>
            </FormField>
            <button type="submit">Check Eligibility</button>
          </form>
          <div id="scholarshipResult" className={styles.result} role="status">
            {scholarshipResult}
          </div>
        </div>

        <div className={styles.card}>
          <h2>🧮 Fee Calculator</h2>
          <div>
            <FormField
              id="institutionType"
              label="School or university/college"
              as="select"
              value={institutionType}
              onChange={(event) => {
                setInstitutionType(event.target.value);
                setInstitutionName('');
                setSelectedCourse('');
              }}
            >
              <option value="">Select institution type</option>
              <option value="school">School</option>
              <option value="college">University/College</option>
            </FormField>
            <FormField
              id="institutionName"
              label={institutionType === 'school' ? 'School' : 'University/College'}
              as="select"
              value={institutionName}
              onChange={(event) => {
                setInstitutionName(event.target.value);
                setSelectedCourse('');
              }}
              disabled={!institutionType}
            >
              <option value="">Select an institution</option>
              {FEE_OPTIONS[institutionType]?.map((institution) => (
                <option key={institution.name} value={institution.name}>
                  {institution.name}
                </option>
              ))}
            </FormField>
            {institutionType === 'school' ? (
              <>
                <FormField
                  id="schoolYear"
                  label="Year"
                  type="text"
                  list="school-years"
                  placeholder="Type or select a year"
                  value={selectedCourse}
                  onChange={(event) => setSelectedCourse(event.target.value)}
                  disabled={!institutionName}
                />
                <datalist id="school-years">
                  {SCHOOL_YEARS.map((year) => (
                    <option key={year} value={year} />
                  ))}
                </datalist>
              </>
            ) : (
              <FormField
                id="feeCourse"
                label="Course"
                as="select"
                value={selectedCourse}
                onChange={(event) => setSelectedCourse(event.target.value)}
                disabled={!institutionName}
              >
                <option value="">Select a course</option>
                {selectedInstitution?.courses.map((courseOption) => (
                  <option key={courseOption.name} value={courseOption.name}>
                    {courseOption.name}
                  </option>
                ))}
              </FormField>
            )}
          </div>
          <div id="feeResult" className={styles.result} role="status">
            {selectedCourseFee &&
              `Annual fee: ₹${selectedCourseFee.toLocaleString('en-IN')}`}
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
          <a
            className={styles.resourceButton}
            href="https://library.chitkara.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Access the library
          </a>
        </div>
      </div>
    </>
  );
}
