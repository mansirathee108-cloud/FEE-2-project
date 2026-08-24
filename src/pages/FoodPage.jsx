import styles from './Food.module.css';

export default function Food(){

    function toggleMenu(){
    document.getElementById('side').classList.toggle('show');
    }

    function calculateTip(){

    let bill=parseFloat(document.getElementById('bill').value);
    let tip=parseFloat(document.getElementById('tip').value);

    if(!bill || !tip){
    alert("Please enter all values");
    return;
    }

    let total=bill+(bill*tip/100);

    document.getElementById('tipResult').textContent=
    "Total Bill with Tip: ₹"+total.toFixed(2);
    }

    function generateBill(){

    let item=document.getElementById('foodItem').value;
    let qty=parseInt(document.getElementById('qty').value);

    if(!qty){
    alert("Enter quantity");
    return;
    }

    let price=0;

    if(item.includes("Pizza")) price=250;
    else if(item.includes("Burger")) price=120;
    else if(item.includes("Pasta")) price=180;
    else price=100;

    let total=price*qty;

    document.getElementById('billResult').textContent=
    "Final Amount: ₹"+total;
    }

    function submitReview(){

    let rating=document.getElementById('rating').value;
    let review=document.getElementById('review').value;

    localStorage.setItem("foodReview",rating+" - "+review);

    document.getElementById('reviewResult').textContent=
    "Review submitted successfully";
    }

    function sendComplaint(){

    let complaint=document.getElementById('complaint').value;

    localStorage.setItem("foodComplaint",complaint);

    document.getElementById('complaintResult').textContent=
    "Complaint registered successfully";
    }

    return(
        <>
        <div className={styles.foodPage}>
        <div className={styles.grid}>

        <div className={styles.card}>
        <h2>🍴 Smart Restaurants</h2>

        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80" />

        <p className={styles.small}>
        Oakridge features AI-powered smart restaurants with hygiene tracking,
        digital menus and automated food quality inspections.
        </p>
        </div>

        <div className={styles.card}>
        <h2>🥗 Nutrition & Food Supply</h2>

        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" />

        <p className={styles.small}>
        Daily fresh food supplies are monitored through the city's smart
        distribution system ensuring healthy nutrition for citizens.
        </p>
        </div>

        <div className={styles.card}>
        <h2>💰 Tip Calculator</h2>

        <input className={styles.input} type="number" id="bill" placeholder="Enter bill amount"/>

        <input className={styles.input} type="number" id="tip" placeholder="Tip percentage"/>

        <button className={styles.button} onClick={calculateTip}>
        Calculate Total
        </button>

        <div id="tipResult" className={styles.result}></div>
        </div>

        <div className={styles.card}>
        <h2>🧾 Smart Food Billing</h2>

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
        <h2>⭐ Restaurant Rating</h2>

        <select className={styles.input} id="rating">
        <option>⭐</option>
        <option>⭐⭐</option>
        <option>⭐⭐⭐</option>
        <option>⭐⭐⭐⭐</option>
        <option>⭐⭐⭐⭐⭐</option>
        </select>

        <textarea className={styles.input} id="review" rows="4" placeholder="Write your review"></textarea>

        <button className={styles.button} onClick={submitReview}>
        Submit Review
        </button>

        <div id="reviewResult" className={styles.result}></div>
        </div>

        <div className={styles.card}>
        <h2>📢 Food Complaint Box</h2>

        <textarea className={styles.input} id="complaint" rows="5" placeholder="Enter complaint"></textarea>

        <button className={styles.button} onClick={sendComplaint}>
        Send Complaint
        </button>

        <div id="complaintResult" className={styles.result}></div>
        </div>
        </div>
        </div>
        </>
    )
}