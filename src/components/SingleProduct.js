import React,{useEffect, useState} from 'react'
import "./CSS/SingleProduct.css"
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../config/Config';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';


function SingleProduct(props) {
    const  id  = useParams();
    const productID=id.id;
    console.log("id",id.id);
    console.log(props.userid)
    const history=useNavigate()

    //for fetching individual products
    const [products, setProducts]=useState([]);

    useEffect(() => {
        // Fetch the product data from Firebase Firestore by ID
        const productRef = doc(db, 'products', id.id);
        getDoc(productRef)
  .then((docSnapshot) => {
    if (docSnapshot.exists()) {
      // Document exists, you can access its data
      const productData = docSnapshot.data();
      console.log('Product Data:', productData);
      setProducts(productData);
    } else {
      // Document doesn't exist
      console.log('Product does not exist.');
    }
  })
  .catch((error) => {
    console.error('Error fetching product:', error);
  });
        
      }, []);

//for adding into cart
let Product;
const addToCart =async (product)=>{
    

    Product=products;
        Product['qty']=1;
        Product['TotalProductPrice']=products.qty*products.price;
    
    const docRef = doc(db, "Cart "+props.userid, productID);
    setDoc(docRef, Product)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

}
  



   

  if (!products) {
    return <div>Product not found</div>;
  }


  //add to cart
  

  return (
    <>
  <div class="container-fluid">
        <div class="cart">
            <div class="row row1">
                <div class="col-md-4">
                    <img src={products.image} width="100%" id="ProductImg"/>
                    <div class="small-imgs">
                        {/* <img src="https://g.top4top.io/p_18005g0a61.jpg" width="100%" class="small-img"/>
                        <img src="https://h.top4top.io/p_1800o53842.jpg" width="100%" class="small-img"/>
                        <img src="https://i.top4top.io/p_1800anjtp3.jpg" width="100%" class="small-img"/>
                        <img src="https://j.top4top.io/p_1800a1b5d4.jpg" width="100%" class="small-img"/> */}
                    </div>                
                </div>
                <div class="col-md-6">
                    <h1 class="product-title">{products.name}</h1>
                    {/* <div class="reviews">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                        <p>240 reviews</p>
                    </div> */}
                    <div class="price">
                        <span>₹38.00</span>
                        <span>₹{products.price}</span>
                    </div>
                    {/* <div class="row">
                        <div class="col-md-4">
                            <h4>Color</h4>
                            <div class="colors">
                                <div class="black"></div>
                                <div class="red"></div>
                                <div class="white"></div>
                                <div class="yellow"></div>
                            </div>
                        </div>
                        <div class="col-md-4 sze">
                            <h5>Size</h5>
                            <select class="size custom-select">
                                <option>Select Size</option>
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                                <option>42</option>
                            </select>
                        </div>
                        <div class="col-md-4 qty">
                            <h5>Quantity</h5>
                            <select class="quantity custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                    </div> */}
                    <div id="product" class="product-inf">
                        <ul>
                          <li class="active"><a href="#Description">{products.description}</a></li>
                        </ul>
                        <div class="tabs-content">
                            <div id="Description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, inventore magnam! Natus, quibusdam ea? Modi nemo corrupti alias quae quis.</p>
                            </div>
                            <div id="Details" >
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque sequi eaque quisquam corrupti reprehenderit exercitationem iusto asperiores quae commodi quo?</p>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <div class="row">
                            <div class="col-md-6">
                            <div className='btn btn-danger btn-md cart-btn'  onClick={addToCart}>ADD TO CART</div>
                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    
   
  
    

    
            
    </>
  )
}

export default SingleProduct