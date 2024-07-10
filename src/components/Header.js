import React from 'react'

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
                {/* {props.data ? props.data.title : "Loading"} */}
                WE ARE A LANDING PAGE
                <span></span>
              </h1>
              {/* <p>{props.data ? props.data.paragraph : "Loading"}</p> */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.


             
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* css -> index.css */}
  </header>  )
}

export default Header