import React from 'react';

function About() {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src="img/about.jpg" className="img-responsive" alt="" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>ePharma Store is your reliable online pharmacy, offering a wide range of high-quality medicines. Our mission is to ensure quick and secure delivery of essential medications to your doorstep. With 24/7 customer support and safe transactions, we are dedicated to providing you with the best healthcare experience.</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul className="text-center">
                      <li>Wide range of high-quality medicines</li>
                      <li>Fast and reliable delivery service</li>
                      <li>Secure online transactions</li>
                      <li>24/7 customer support</li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul className="text-center">
                      <li>Competitive pricing</li>
                      <li>User-friendly online platform</li>
                      <li>Experienced and knowledgeable staff</li>
                      <li>Commitment to customer satisfaction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
