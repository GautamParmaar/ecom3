import React from 'react';

function Header() {
  return (
    <header id="header">
      <div className="intro">
        {/* <img className='intro' src='/intro.jpg'/> */}
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  WE ARE A E-PHARMACY STORE
                  <span></span>
                </h1>
                Your trusted source for high-quality medicines, dedicated to providing safe and effective pharmaceutical products.              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
