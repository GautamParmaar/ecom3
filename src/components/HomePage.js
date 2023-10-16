import React from 'react'
import "./CSS/Home.css"
import SignUp from './SignUp'
import CarouselProduct from './CarouselProduct'
import SmallNav from './SmallNav'
import Schemes from './Schemes'



function HomePage({user}) {


  return (
    <>
    


    <div className='d-sm-flex borderBox' >
    <div id="carouselExampleAutoplaying" data-interval="3000" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img  src="./4.png" className="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="./5.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="./3.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<SignUp/>

</div>
<br/>
<Schemes/>
<CarouselProduct user={user}/>



    </>
  )
}

export default HomePage