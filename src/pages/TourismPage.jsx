import styles from "./Tourism.module.css";
import { saveActivity } from '../modules/storage.js';

export default function Tourism(){
    function calculateTrip(){
        
        let people=parseInt(document.getElementById('people').value);
        
        let days=parseInt(document.getElementById('days').value);
        
        let stay=parseInt(document.getElementById('stay').value);
        
        if(!people || !days){
            
            alert('Please enter all details');
            
            return;
            
        }
        
        let total=people*days*stay;
        
        document.getElementById('tripResult').textContent=
        'Estimated Trip Cost: ₹'+total;
        
    }
    
    function submitReview(){
        
        let rating=document.getElementById('rating').value;
        
        let review=document.getElementById('review').value;
        
        if(review==''){
            
            alert('Please write a review');
            
            return;
            
        }
        
        saveActivity('Tourism Review', rating+' | '+review, 'review');
        
        document.getElementById('reviewResult').textContent=
        'Thank you for your review!';
        
    }
    
    function visaCheck(){
        
        let name=document.getElementById('touristName').value;
        let country=document.getElementById('country').value;
        
        saveActivity('Visa Approval', name+' from '+country, 'visa');
        
        document.getElementById('visaResult').textContent=
        'Visa Approved for '+name+' from '+country;
        
    }
    return(
        <div className={styles.tourismPage}>
        <h1 className={styles.header}><svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 48 48">
	<path d="M0 0h48v48H0z" fill="none" />
	<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
		<path d="m9 24l-4-4s-1.4 4.728-1.076 7.578S7.274 32.574 10 31c2.727-1.574 34-21 34-21l-9-2z" />
		<path d="m26 13l-15.202-1.615L8 13l7 7m14 24l-4-5h17v-4m-10-7l4 5H19v4" />
	</g>
</svg>
 Travel And Tourism</h1>

        <div className={styles.grid}>
            <div id="trCost" className={styles.card}>
            
                <h2>🏖 Famous Tourist Places</h2>
                
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" alt="Tourist beach"/>
                
                <p className={styles.small}>
                    Explore Oakridge's beautiful beaches, smart parks,
                    cultural landmarks and futuristic skyline attractions.
                </p>
                
            </div>

            <div className={styles.card}>
                
                <h2>🏨 Luxury Hotels</h2>
                
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80" alt="Luxury hotel"/>
                
                <div className={styles.hotel}>
                    <p>⭐ Grand Horizon Hotel — 5 Star</p>
                    <p>⭐ Ocean View Resort — 4.8 Rating</p>
                    <p>⭐ Royal Palm Suites — Luxury Stay</p>
                </div>
                
            </div>

            <div className={styles.card}>
                
                <h2>🧮 Travel Cost Calculator</h2>
                
                <input className={styles.input} type="number" id="people" placeholder="Number of People"/>
                
                <input className={styles.input} type="number" id="days" placeholder="Number of Days"/>
                
                <select className={styles.input} id="stay">
                    
                    <option value="5000">Luxury Hotel</option>
                    
                    <option value="2500">Budget Hotel</option>
                    
                    <option value="1000">Camping</option>
                    
                    <option value="500">Stay with Relatives</option>
                    
                </select>
                
                <button className={styles.button} onClick={calculateTrip}>
                    Calculate Trip Cost
                </button>
                
                <div id="tripResult" className={styles.result}></div>
                
            </div>

            <div className={styles.card}>
                
                <h2>🖼 Museums & Art Galleries</h2>
                
                <img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80" alt="Art gallery"/>
                
                <p className={styles.small}>
                    Discover digital museums, heritage art galleries,
                    interactive history halls and modern cultural exhibitions.
                </p>
                
            </div>

            <div className={styles.card}>
                
                <h2>🌍 Tourist Reviews</h2>
                
                <select className={styles.input} id="rating">
                    
                    <option>⭐</option>
                    <option>⭐⭐</option>
                    <option>⭐⭐⭐</option>
                    <option>⭐⭐⭐⭐</option>
                    <option>⭐⭐⭐⭐⭐</option>
                    
                </select>
                
                <textarea className={styles.input} id="review" rows="5" placeholder="Write your review"></textarea>
                
                <button className={styles.button} onClick={submitReview}>
                    Submit Review
                </button>
                
                <div id="reviewResult" className={styles.result}></div>
                
            </div>

            <div className={styles.card}>
                
                <h2>🛂 Visa Approval Department</h2>
                
                <input className={styles.input} type="text" id="touristName" placeholder="Tourist Name"/>
                
                <select className={styles.input} id="country">
                    
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Japan</option>
                    <option>Australia</option>
                    
                </select>
                
                <button className={styles.button} onClick={visaCheck}>
                    Check Visa Status
                </button>
                
                <div id="visaResult" className={styles.result}></div>
                
            </div>

        </div>
        </div>
    )
}