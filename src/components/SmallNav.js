import React from 'react'
import './CSS/SmallNav.css'
import { Link } from 'react-router-dom'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
function SmallNav() {
  return (
    <>
<div className="strip">
  <div className="strip-content">
  <div class="search-container2">
       
          <input type="text" placeholder="Search Products" name="search"/>
          <button type="submit"><i class="fa fa-search"></i></button>
        
      </div>  </div>
    <ul className="strip-right">
     
      <li> 
        <Link className='UlText' style={{textDecoration:'none'}}>Offers</Link>
      </li>
    </ul>
    <div className='offerIcon'>
  <LocalOfferIcon/>
</div>
</div>


<div>

  
</div>




    </>
  )
}

export default SmallNav