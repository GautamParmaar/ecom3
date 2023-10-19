import React from 'react'
import "./CSS/Schemes.css"

import FreeIcon from '@mui/icons-material/LocalOffer'; // You can use any Material-UI icon you like
import OfferIcon from '@mui/icons-material/LocalMall';
import SchemesIcon from '@mui/icons-material/LocalOffer';
import PharmaIcon from '@mui/icons-material/LocalPharmacy';



import GradeIcon from '@mui/icons-material/Grade';


function Schemes() {
  return (<>
    <div className="container-offer">
    <div className="container-offer-box">
      {/* <!-- heading image and text to be edited in this div --> */}

      <div className="heading">
        
        <h5>OFFERS AND DEALS!</h5>
      </div>

      {/* <!-- content image (3 images) and thier text to be edited in this div --> */}

      <div className="content-flex">
        <div className="content">
          {/* <img src="img-2.jpg" alt="" /> */}
          <PharmaIcon fontSize="medium" color="primary" />
                    <p>Pharma Products</p>
        </div>

        <div className="content">
          {/* <img src="img-3.jpg" alt="" /> */}
          <FreeIcon fontSize="medium" color="primary" />
          <p>Free Products Offer</p>
        </div>

        <div className="content">
          {/* <img src="img-4.png" alt="" /> */}
          <OfferIcon fontSize="medium" color="secondary" />
          <p>Offers on Brands</p>
        </div>

       
      </div>

      

      {/* <!-- End content  div --> */}
    </div>
    
  </div>
  <div className="container-offer3">
    <div className="container-offer-box">
      {/* <!-- heading image and text to be edited in this div --> */}

      <div className="heading">
        
        <h5>DEALS!</h5>
      </div>

      {/* <!-- content image (3 images) and thier text to be edited in this div --> */}

      <div className="content-flex">
        <div className="content">
          {/* <img src="img-2.jpg" alt="" /> */}
          <PharmaIcon fontSize="medium" color="primary" />
                    <p>Generic Medicines</p>
        </div>

        <div className="content">
          {/* <img src="img-3.jpg" alt="" /> */}
          <FreeIcon fontSize="medium" color="primary" />
          <p>Margin 50% </p>
        </div>

        <div className="content">
          {/* <img src="img-4.png" alt="" /> */}
          <OfferIcon fontSize="medium" color="secondary" />
          <p>Margin 60% </p>
        </div>

       
      </div>

      

      {/* <!-- End content  div --> */}
    </div>
    
  </div>


  <div className="container-offer2">
    <div className="container-offer-box">
      {/* <!-- heading image and text to be edited in this div --> */}

      <div className="heading">
        
        <h5>OFFERS AND DEALS!</h5>
      </div>

      {/* <!-- content image (3 images) and thier text to be edited in this div --> */}

      <div className="content-flex">
        <div className="content">
          {/* <img src="img-2.jpg" alt="" /> */}
          <PharmaIcon fontSize="medium" color="primary" />
                    <p>Generic Medicines</p>
        </div>

        <div className="content">
          {/* <img src="img-3.jpg" alt="" /> */}
          <FreeIcon fontSize="medium" color="primary" />
          <p>Margin 50%</p>
        </div>

        <div className="content">
          {/* <img src="img-4.png" alt="" /> */}
          <OfferIcon fontSize="medium" color="secondary" />
          <p>Margin 60%</p>
        </div>

        {/* <div className="content">
          // {/* <img src="img-4.png" alt="" /> */}
          {/* <SchemesIcon fontSize="medium" color="secondary" />
                    <p>Lot of schemes</p> */}
        {/* </div> */} 
      </div>

      

      {/* <!-- End content  div --> */}
    </div>
  </div>
  

  </>
  )
}

export default Schemes
