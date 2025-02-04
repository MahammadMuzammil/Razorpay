import './index.css'

const Product = () => {
    const handlePayment = async (e) => {
        const data = {
            amount: 5000,
            currency: 'INR',
            receipt: 'qwsaq1',
        }
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        const response = await fetch('http://localhost:5000/orders',options)
        const order = await response.json()
        console.log(order)
        var options2 = {
            "key": "rzp_test_G9L8dGnUMFSEXD", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
               const body ={
                ...response
               }
               const validateResponse = await fetch('http://localhost:5000/orders/validate',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(body)
               })
            const jsonRes = await validateResponse.json()
            console.log(jsonRes)

            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com", 
                "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options2);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
       
        rzp1.open();
        e.preventDefault();
    }
    return (
        <div className="card">
            <h1>T-shirt</h1>
            <img src="https://fullyfilmy.in/cdn/shop/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1639657077" alt="" className="t-shirt" />
            <button className='button' onClick={handlePayment}>Buy</button>
        </div>
    )
}
export default Product