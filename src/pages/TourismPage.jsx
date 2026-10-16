import styles from './Tourism.module.css';
import { saveActivity } from '../modules/storage.js';
import { useState } from 'react';
import FormField from '../components/FormField.jsx';

export default function Tourism() {
  const [people, setPeople] = useState('');
  const [days, setDays] = useState('');
  const [stay, setStay] = useState('5000');
  const [tripResult, setTripResult] = useState('');
  const [rating, setRating] = useState('⭐');
  const [review, setReview] = useState('');
  const [reviewResult, setReviewResult] = useState('');
  const [touristName, setTouristName] = useState('');
  const [country, setCountry] = useState('India');
  const [visaResult, setVisaResult] = useState('');

  function calculateTrip(event) {
    event.preventDefault();
    setTripResult(`Estimated Trip Cost: ₹${Number(people) * Number(days) * Number(stay)}`);
  }

  function submitReview(event) {
    event.preventDefault();
    saveActivity('Tourism Review', `${rating} | ${review.trim()}`, 'review');
    setReviewResult('Thank you for your review!');
    setReview('');
    setRating('⭐');
  }

  function visaCheck(event) {
    event.preventDefault();
    saveActivity('Visa Approval', `${touristName.trim()} from ${country}`, 'visa');
    setVisaResult(`Visa request recorded for ${touristName.trim()} from ${country}.`);
    setTouristName('');
  }
  return (
    <div className={styles.tourismPage}>
      <h1 className={styles.header}>
        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 48 48">
          <path d="M0 0h48v48H0z" fill="none" />
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
          >
            <path d="m9 24l-4-4s-1.4 4.728-1.076 7.578S7.274 32.574 10 31c2.727-1.574 34-21 34-21l-9-2z" />
            <path d="m26 13l-15.202-1.615L8 13l7 7m14 24l-4-5h17v-4m-10-7l4 5H19v4" />
          </g>
        </svg>
        Travel And Tourism
      </h1>

      <div className={styles.grid}>
        <div id="trCost" className={styles.card}>
          <h2>🏖 Famous Tourist Places</h2>

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
            alt="Tourist beach"
          />

          <p className={styles.small}>
            Explore Oakridge's beautiful beaches, smart parks, cultural landmarks and futuristic
            skyline attractions.
          </p>
        </div>

        <div className={styles.card}>
          <h2>🏨 Luxury Hotels</h2>

          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
            alt="Luxury hotel"
          />

          <div className={styles.hotel}>
            <p>⭐ Grand Horizon Hotel — 5 Star</p>
            <p>⭐ Ocean View Resort — 4.8 Rating</p>
            <p>⭐ Royal Palm Suites — Luxury Stay</p>
          </div>
        </div>

        <div className={styles.card}>
          <h2>🧮 Travel Cost Calculator</h2>
          <form onSubmit={calculateTrip}>
            <FormField
              id="people"
              label="Travelers"
              type="number"
              min="1"
              max="100"
              step="1"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
              placeholder="Number of People"
              className={styles.input}
              required
            />
            <FormField
              id="days"
              label="Trip duration"
              type="number"
              min="1"
              max="365"
              step="1"
              value={days}
              onChange={(event) => setDays(event.target.value)}
              placeholder="Number of Days"
              className={styles.input}
              required
            />
            <FormField
              id="stay"
              label="Accommodation"
              as="select"
              value={stay}
              onChange={(event) => setStay(event.target.value)}
              className={styles.input}
              required
            >
              <option value="5000">Luxury Hotel</option>
              <option value="2500">Budget Hotel</option>
              <option value="1000">Camping</option>
              <option value="500">Stay with Relatives</option>
            </FormField>
            <button className={styles.button} type="submit">
              Calculate Trip Cost
            </button>
          </form>
          <div id="tripResult" className={styles.result} role="status">
            {tripResult}
          </div>
        </div>

        <div className={styles.card}>
          <h2>🖼 Museums & Art Galleries</h2>

          <img
            src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80"
            alt="Art gallery"
          />

          <p className={styles.small}>
            Discover digital museums, heritage art galleries, interactive history halls and modern
            cultural exhibitions.
          </p>
        </div>

        <div className={styles.card}>
          <h2>🌍 Tourist Reviews</h2>
          <form onSubmit={submitReview}>
            <FormField
              id="rating"
              label="Rating"
              as="select"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              className={styles.input}
              required
            >
              <option>⭐</option>
              <option>⭐⭐</option>
              <option>⭐⭐⭐</option>
              <option>⭐⭐⭐⭐</option>
              <option>⭐⭐⭐⭐⭐</option>
            </FormField>
            <FormField
              id="review"
              label="Your review"
              as="textarea"
              rows="5"
              minLength={5}
              maxLength={500}
              value={review}
              onChange={(event) => setReview(event.target.value)}
              className={styles.input}
              required
            />
            <button className={styles.button} type="submit">
              Submit Review
            </button>
          </form>
          <div id="reviewResult" className={styles.result} role="status">
            {reviewResult}
          </div>
        </div>

        <div className={styles.card}>
          <h2>🛂 Visa Approval Department</h2>
          <form onSubmit={visaCheck}>
            <FormField
              id="touristName"
              label="Tourist name"
              value={touristName}
              onChange={(event) => setTouristName(event.target.value)}
              placeholder="Tourist Name"
              className={styles.input}
              minLength={2}
              maxLength={100}
              required
            />
            <FormField
              id="country"
              label="Country"
              as="select"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={styles.input}
              required
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Japan</option>
              <option>Australia</option>
            </FormField>
            <button className={styles.button} type="submit">
              Check Visa Status
            </button>
          </form>
          <div id="visaResult" className={styles.result} role="status">
            {visaResult}
          </div>
        </div>
      </div>
    </div>
  );
}
