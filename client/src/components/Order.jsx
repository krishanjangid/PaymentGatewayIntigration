import React from "react";
import axios from "axios";
import { useState } from "react";
import './Signup.css';

export default function Order() {


    const [formData, setFormData] = useState({
        amount: "",
    });

    const loadScript = async () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };

    function handleChange(e) {
        const { value, name } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(formData);
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
        await loadScript();
        try{
            

            const finalfromData = new FormData();
            finalfromData.append("amount", formData.amount);
            const price ="1";
            console.log(finalfromData.get("amount"));
            const { data } = await axios.post(
                `http://localhost:4000/api/v1/users/order`,
                finalfromData,
                {
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkNjNhODM1ZTYzYjliMDg3OTc2NmUiLCJpYXQiOjE2ODcxOTAzNjR9.kSuMbWZGibWNrS9lvE7Ri60YmfTJN-mNfslaDt1EI4Y`
                },
                }
              );
            console.log(data);
              const {key,amount,currency,id} = data;
                const options = {
                    key:"rzp_test_vohzagu9XwrJzD",
                    amount:amount,
                    currency:currency,
                    name:"Krishan Kumar Jangid",
                    description:"Test Transaction",
                    image:"https://res.cloudinary.com/dthmsomhy/image/upload/v1686974848/wv1pe7uedydfbet5zvzd.png",
                    order_id:id,
                    handler: async function (response){
                        axios.post(`http://localhost:4000/api/v1/users/paymentvarification`,{
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_order_id:response.razorpay_order_id,
                            razorpay_signature:response.razorpay_signature,
                            amount:amount,
                        });
                        // response.razorpay_payment_id;
                        // response.razorpay_order_id;
                        // response.razorpay_signature
                    },
                }
              const paymentObject = new window.Razorpay(options); 
              
              paymentObject.open();
                
        }

        catch(error){
            console.log(error);
        }

        

        console.log(formData);
    }
    return (
        <div>
            <h1 className="text-center text-2xl mb-10 mt-5">Order | Rozarpay Payments</h1>
            <div className="card">
            <h1 className="text-center">Order</h1>
            <form onSubmit={handleSubmit} className="my-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="100 INR"
                    className="form-input"
                    />
                </div>
    
                <div className="px-10">
                    <button type="submit" className="w-56  h-10 bg-neutral-950 rounded-full  text-sm font-semibold text-white mt-2 ">Submit</button>
                </div>
            </form>
            </div>
        </div>
    );
}