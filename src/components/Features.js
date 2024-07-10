import React from 'react';

function Features() {
  return (
    <>
      <div id="features" className="text-center">
        <div className="contain">
          <div  className=" feature col-md-10 col-md-offset-1 section-title">
            <h2>Features</h2>
          </div>
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <i className='fa fa-comments-o'></i>
              <h3>Wide Range of Medications</h3>
              <p>Find all your essential medicines in one place.</p>
            </div>
            <div className="col-xs-6 col-md-3">
              <i className='fa fa-bullhorn'></i>
              <h3>Fast Delivery</h3>
              <p>Get your medications delivered quickly to your doorstep.</p>
            </div>
            <div className="col-xs-6 col-md-3">
              <i className='fa fa-group'></i>
              <h3>Secure Transactions</h3>
              <p>Enjoy safe and secure online payment options.</p>
            </div>
            <div className="col-xs-6 col-md-3">
              <i className='fa fa-magic'></i>
              <h3>24/7 Customer Support</h3>
              <p>We're here to assist you with your needs anytime, day or night.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
