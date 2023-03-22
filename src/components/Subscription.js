import React, { useEffect, useState } from 'react'
import '../assets/css/Subscription.css'
import axios from 'axios'
// import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { authHeader } from '../service/auth-headers';
import { baseURL } from '../utils/base_url';

export default function Subscription() {
    const [username, setUsername] = useState("")
    const data=useSelector(state=>state)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('user'))?.data?.user
      console.log('user: ', user, JSON.parse(localStorage.getItem('user')))
      setUsername(user);
    },[data.isLoggedIn]);

    const [plan, setPlan] = useState()
    const [amount, setAmount] = useState()
    let basicplan_element = document.getElementsByClassName('subcompanyTable1')

    const updatePrice = (price, amount) => {
        document.getElementById('subtotalfee').innerHTML = '$'+amount
        document.getElementById('subtotalpayable').innerHTML = '$'+amount
        setPlan(price)
        setAmount(amount)
    }

    // const stripePromise = loadStripe('pk_test_51KE6cuSBJuQTVpmlxpX5x8q498VlvurtSAVhzV6rYXxhiyvFfKKfYEyJzz4lQrTycoJYrADTpLarIF7v4zuFWHCe00xXlshLwx');
    async function handlePayment(sessionId) {
    //   const stripe = await stripePromise;
    //   const { error } = await stripe.redirectToCheckout({ sessionId }); 
    }
    const handlePaymentserver =async ()=> {
        console.log('called handlPayment')
        const response = await axios.post(`${baseURL}/account/subscribe/`, {'user':username, 'plan':plan},{headers:authHeader})
        
        const sessionId = response?.data?.sessionId
        console.log(`session id: ${sessionId}`)
         let k =  await handlePayment(sessionId)
         console.log('paymnet response', k)
      }
  
    
  return (
    <div style={{height:'80vh'}}>
          <div>
        <div class="subcontainer mt-2">
            <h1>Please Choose your subscription</h1>
            <div class="subtabledetails">
                <div class="subcompanyTable1">
                    <table className='subtable'>
                        <tr>
                            <th className='subtable'>Companies</th>
                        </tr>
                        <tr>
                            <td>--------</td>
                        </tr>
                        <tr>
                            <td>--------</td>
                        </tr>
                        <tr>
                            <td>--------</td>
                        </tr>
                        <tr>
                            <td>--------</td>
                        </tr>
                        <tr>
                            <td>--------</td>
                        </tr>
                        <tr>
                            <td>Subscription Fee:</td>
                        </tr>
                    </table>
                </div>
                <div class="subcompanyTable2" >
                    <table className='subtable basicplan'  onClick={()=>updatePrice('Basic', 100)}>
                        <tr>
                            <th className='subtable'>Basic Plan</th>
                        </tr>
                        <tr>
                            <th>100</th>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td> <i class="fa-solid fa-xmark"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>

                    </table>
                </div>
                <div class="subcompanyTable3">
                    <table className='subtable' onClick={()=>updatePrice('Pro', 100)}>
                        <tr>
                            <th className='subtable'>Pro Plan</th>
                        </tr>
                        <tr>
                            <th className='subtable'>200</th>
                        </tr>
                        <tr>
                            <td> <i class="fa-solid fa-xmark"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-check"></i></td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>

    </div>
    <div class="subsecondcontainer">
        <p class="subdetail">Payment Details:</p>
        <div class="subfee">
            <div class="subtotalfee" >Total Submission Fee:</div>
            <div class="subtotalrupee" id='subtotalfee'></div>
        </div>
        <div class="subline"></div>
        <div class="subfee">
            <div class="subtotalpayable">Total Payable Fee:</div>
            <div class="subtotalrupee" id='subtotalpayable'></div>
        </div>
        <div class="subline"></div>
        <div class="subbuttons">
            <button type="button" class="subcanclebutton">Cancle</button>
            <button type="button" class="subsubscribebutton">SUBSCRIBE</button>
        </div>
    </div>
    </div>
  )
}
