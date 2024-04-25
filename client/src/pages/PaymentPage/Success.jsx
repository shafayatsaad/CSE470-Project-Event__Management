import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const SuccessPage = () => {

  useEffect(()=>{
    const setdata = async() =>{
      const response = await axios.put("http://localhost:8080/user", {
        username : window.localStorage.getItem("username"),
        purchasedEventID: window.localStorage.getItem("EventID")
      })
      console.log(response.data);
    }
    setdata();
  },[])

  return (
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet" />
      </head>
      <style>
        {`
          .bodyname {
            display: flex;
            text-align: center;
            padding: 40px;
            background: #EBF0F5;
          }
          h1 {
            color: #88B04B;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-weight: 900;
            font-size: 40px;
            margin-bottom: 10px;
          }
          p {
            color: #404F5E;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-size: 20px;
            margin: 0;
          }
          .checkmark {
            color: #9ABC66;
            font-size: 100px;
            line-height: 200px;
            margin-left: -15px;
          }
          .card-11 {
            margin-top: 500px;
            background: white;
            padding: 60px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #C8D0D8;
            display: inline-block;
            margin: 0 auto;
          }
          .boxxxx{
            display: flex;
            margin-top: 10%;
            width: 100%;
            height: 50vh;
          }
        `}
      </style>
      <body className='bodyname'>
        <div className='boxxxx'>
          <div className="card-11">
            <div>
              <i className="checkmark">✓</i>
            </div>
            <h1>Success</h1>
            <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
          </div>
        </div>
      </body>
    </html>
  );
}

export default SuccessPage;
