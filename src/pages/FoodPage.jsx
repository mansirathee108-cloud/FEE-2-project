import styles from './Food.module.css';

export default function Food(){

    function toggleMenu(){
    document.getElementById('side').classList.toggle('show');
    }

    function calculateTip(){

    let bill=parseFloat(document.getElementById('bill').value);
    let tip=parseFloat(document.getElementById('tip').value);

    if(!bill || !tip){
    alert("Please enter both the bill amount and tip percentage");
    return;
    }

    let total=bill+(bill*tip/100);

    document.getElementById('tipResult').textContent=
    "Total with tip: ₹"+total.toFixed(2);
    }

    function generateBill(){

    let item=document.getElementById('foodItem').value;
    let qty=parseInt(document.getElementById('qty').value);

    if(!qty){
    alert("Please enter a quantity");
    return;
    }

    let price=0;

    if(item.includes("Pizza")) price=250;
    else if(item.includes("Burger")) price=120;
    else if(item.includes("Pasta")) price=180;
    else price=100;

    let total=price*qty;

    document.getElementById('billResult').textContent=
    "Total amount: ₹"+total;
    }

    function submitReview(){

    let rating=document.getElementById('rating').value;
    let review=document.getElementById('review').value;

    localStorage.setItem("foodReview",rating+" - "+review);

    document.getElementById('reviewResult').textContent=
    "Thanks! Your review has been submitted.";
    }

    function sendComplaint(){

    let complaint=document.getElementById('complaint').value;

    localStorage.setItem("foodComplaint",complaint);

    document.getElementById('complaintResult').textContent=
    "Your complaint has been registered. We'll look into it.";
    }

    return(
        <>
        <div className={styles.foodPage}>
        <div className={styles.grid}>

        <div className={styles.card}>
        <div className={styles.imageWrap}>
            <img
            className={styles.cardImage}
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
            />
            <span className={styles.badge}>Featured</span>
            <div className={styles.imageOverlay} />
        </div>
        <h2>🍴 Local Restaurant Highlights</h2>
        <p className={styles.small}>
            Explore top-rated restaurants in your area, complete with hygiene
            ratings, digital menus, and verified food quality checks.
        </p>
        </div>

        <div className={styles.card}>
        <div className={styles.imageWrap}>
            <img
            className={styles.cardImage}
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
            />
            <span className={styles.badge}>Daily Update</span>
            <div className={styles.imageOverlay} />
        </div>
        <h2>🥗 Food Supply & Nutrition</h2>
        <p className={styles.small}>
            Fresh produce and daily essentials are sourced and distributed
            through a monitored supply chain to keep meals healthy and reliable.
        </p>
        </div>

        <div className={styles.card}>
        <h2>💰 Tip Calculator</h2>

        <input className={styles.input} type="number" id="bill" placeholder="Bill amount (₹)"/>

        <input className={styles.input} type="number" id="tip" placeholder="Tip percentage (%)"/>

        <button className={styles.button} onClick={calculateTip}>
        Calculate Total
        </button>

        <div id="tipResult" className={styles.result}></div>
        </div>

        <div className={styles.card}>
        <h2>🧾 Quick Order Billing</h2>

        <select className={styles.input} id="foodItem">
        <option>Pizza - ₹250</option>
        <option>Burger - ₹120</option>
        <option>Pasta - ₹180</option>
        <option>Sandwich - ₹100</option>
        </select>

        <input className={styles.input} type="number" id="qty" placeholder="Quantity"/>

        <button className={styles.button} onClick={generateBill}>
        Generate Bill
        </button>

        <div id="billResult" className={styles.result}></div>
        </div>

        <div className={styles.card}>
        <h2>⭐ Rate a Restaurant</h2>

        <select className={styles.input} id="rating">
        <option>⭐</option>
        <option>⭐⭐</option>
        <option>⭐⭐⭐</option>
        <option>⭐⭐⭐⭐</option>
        <option>⭐⭐⭐⭐⭐</option>
        </select>

        <textarea className={styles.input} id="review" rows="4" placeholder="Tell us about your experience"></textarea>

        <button className={styles.button} onClick={submitReview}>
        Submit Review
        </button>

        <div id="reviewResult" className={styles.result}></div>
        </div>

        <div className={styles.card}>
        <h2>📢 Report an Issue</h2>

        <textarea className={styles.input} id="complaint" rows="5" placeholder="Describe the issue you faced"></textarea>

        <button className={styles.button} onClick={sendComplaint}>
        Submit Complaint
        </button>

        <div id="complaintResult" className={styles.result}></div>
        </div>
        </div>
        </div>
        </>
    )
}