import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./CSS/Carousel.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons'; // Import the pharmacy sign icon
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';











function CarouselProduct({user}) {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const navigate=useNavigate();


      const HandleAddToCart=()=>{
        if(!user){
          navigate("/login")
           }
      }
  return (
    <> 
    {/* <div className='box2'>
    <div className="stylish-box2">
     
          <div className='flex2'>
          <div className='icon2 ico'>
          <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>  
          <div className='icon2'>
          <FontAwesomeIcon icon={faGift} size="2x" />
          </div>  <div className='icon2'>
          <FontAwesomeIcon icon={faTag} size="2x" />
          </div>  
          <div className='icon2'>
          <FontAwesomeIcon icon={faPuzzlePiece} size="2x" />
          </div>  

          </div>

          <div className='textbox'>
          <div className='text2'>
         Pharmacy
          </div>  
          <div className='text2'>
          Free Products Offer
          </div>  
          <div className='text2'>
          Offer on Brands
          </div>  
          <div className='text2'>
          Schemes
          </div>  

          </div>

         

     
          
          
          </div>

          <div className="stylish-box2">
      
          <div className='flex2'>
          <div className='icon2'>
          <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>  
          <div className='icon2'>
          <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>  <div className='icon2'>
          <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>  
          <div className='icon2'>
          <FontAwesomeIcon icon={faClinicMedical} size="2x" />
          </div>  

          </div>

          <div className='textbox'>
          <div className='text2'>
         Pharmacy
          </div>  
          <div className='text2'>
          Pharmacy
          </div>  
          <div className='text2'>
          Pharmacy
          </div>  
          <div className='text2'>
          Pharmacy
          </div>  

          </div>

         

     
          
          
          </div>
          </div> */}

   
<div className="stylish-box">
<div className="offer-label">Free Products Offer</div>
<div className='cardBorder'>

<Carousel responsive={responsive} partialVisible={false}>
  <div className='card'>

<img  className="product--image" src='./1.jpg'></img>
<h2>Product</h2>
<p>description</p>
<p className ="price">₹50</p>
<p>Description</p>
<div className='btn btn-primary'  onClick={HandleAddToCart}>ADD TO CART</div>

  </div>
  <div className='card'>

<img className="product--image" src='./1.jpg'></img>
<h2>Product</h2>
<p>description</p>
<p className ="price">₹50</p>
<p>Description</p>
<div className='btn btn-primary'  onClick={HandleAddToCart}>ADD TO CART</div>
  </div>
  <div className='card'>

<img className="product--image" src='./1.jpg'></img>
<h2>Product</h2>
<p>description</p>
<p className ="price">₹50</p>
<p>Description</p>
<div className='btn btn-primary'  onClick={HandleAddToCart}>ADD TO CART</div>
  </div><div className='card'>

<img className="product--image" src='./1.jpg'></img>
<h2>Product</h2>
<p>description</p>
<p className ="price">₹50</p>
<p>Description</p>
<div className='btn btn-primary'  onClick={HandleAddToCart}>ADD TO CART</div>
  </div><div className='card'>

<img className="product--image" src='./1.jpg'></img>
<h2>Product</h2>
<p>description</p>
<p className ="price">₹50</p>
<p>Description</p>
<div className='btn btn-primary'  onClick={HandleAddToCart}>ADD TO CART</div>
  </div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;
</div>
    </div>
    

   
   

   
    </>
  )
}

export default CarouselProduct