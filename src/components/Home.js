import React, { useEffect, useState } from 'react'
import {db,auth } from "../config/Config.js"
import { collection, getDocs,setDoc,doc } from 'firebase/firestore';
import Products3 from './Products';
import { useNavigate } from 'react-router-dom';
import IndividualFilteredProduct2 from './IndividualFilteredProduct2';
import { Link } from 'react-router-dom'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';






const Home2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');


  const history=useNavigate();
//getting current user id
function GetUserId(){
const [uid,setUID]=useState(null)

useEffect(()=>{
  auth.onAuthStateChanged(user=>{
    if(user){
      setUID(user.uid)
    }
  })
 
},[])
return uid
}

const uid=GetUserId()




// for navbar
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };



//for products fetching
  const [products, setProducts]=useState([]);




  //getting products function

 
  const fetchData = async () => {
    try {
      const products = await getDocs(collection(db, 'products')); 
      const dataArray = [];

      for(var snap of products.docs){
    var data=snap.data();
    data.ID=snap.id;
    dataArray.push({
      ...data
    })
    if(dataArray.length===products.docs.length){
      setProducts(dataArray)
    }
      }

      // querySnapshot.forEach((doc) => {
      //   // Get the document data and add it to the array
      //   const docData = doc.data();
      //   // console.log("this is data" ,docData)
      //   dataArray.push(docData);
      // });

      // // Update the state with the fetched data
      // if(dataArray.length===querySnapshot.docs.length){
      //   setProducts(dataArray);

      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
useEffect(()=>{
  fetchData();
},[])
console.log("product",products)

let Product;
const addToCart =async (product)=>{
    if(uid!==null){
        console.log("home",product);
        Product=product;
        Product['qty']=1;
        Product['TotalProductPrice']=Product.qty*Product.price;
        const docRef = await setDoc(doc(db, 'Cart '+uid,product.ID ), {
          ID:Product.ID,
          TotalProductPrice:Product.TotalProductPrice,
          brand:Product.brand,
          category:Product.category,
          description:Product.description,
          image:Product.image,
          name:Product.name,
          price:Product.price,
          qty:Product.qty
         
          
    },
    console.log("added"));
        

    }
    else{
        history('/login');
        setTimeout(() => {
          // login first toast message
          toast.info('Please Login for adding items into cart', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }, 500);
    }
    
}


const [spans]=useState([
  {id:'generic',text:"generic"},
  {id:'special',text:"special"}

])
//active class state
const[active,setActive]=useState("")

//category filter state
const [category,setCategory]=useState("")
//for filtering category
const data = [
  { id: 1, name: 'Item 1', category: 'generic' },
  { id: 2, name: 'Item 2', category: 'special' },
  // Add more data items here
];
const [selectedCategory, setSelectedCategory] = useState('All');

const handleChange = (individualSpan) => {
  setActive(individualSpan.id);
  setCategory(individualSpan.text);
  filterFunction(individualSpan.text, selectedBrand); // Include selected brand
};

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
  filterFunction(event.target.value, selectedBrand); // Include selected brand
};
const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
  filterFunction(category, event.target.value); // Include selected category
};

  const filteredData = selectedCategory === 'All' ? data : data.filter(item => item.category === selectedCategory);



//for filtering by brand



//handle change will set category


//filtered products state
const [filteredProducts,setfilteredProducts]=useState([])
//filter function
const filterFunction = (categoryText, brandText) => {
  const filter = products.filter(
    (product) =>
      (categoryText === '' || product.category === categoryText) &&
      (brandText === 'All' || product.brand === brandText)
  );
  setfilteredProducts(filter);
};

const returnToAllProducts=()=>{
  setCategory('');
  setfilteredProducts([]);
}


//code for searching products through search box
const handleSearch = () => {
  // Perform a search based on the searchQuery
  // You can filter the products using the searchQuery
  // For example, if you want to search by product name:
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setfilteredProducts(filteredProducts);
};

  return (
   <>

 
  {/* {products.length>0 &&
  (
    <div className='container-fluid'>

      <h1 className='text-center'>Products</h1>
      <div className='products-box'>

        <Products3 products={products} addToCart={addToCart}/>
      </div>
    </div>
  )
  
  } {products.length<1 && (
    <div className='container-fluid'>Please wait......</div>
  )}   */}
{/* code of small navbar */}
<div className="strip">
  <div className="strip-content">
  <div class="search-container2">
  <input
    type="text"
    placeholder="Search Products"
    name="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button type="submit" onClick={handleSearch}>
    <i class="fa fa-search"></i>
  </button>
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



{/* small navbar code ends */}

   <div  className='container-fluid filter-products-main-box'>

   <div className='filterBox'>
      <h6 >Filter by Category</h6>
      <div>
        <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="generic">Generic</option>
          <option value="special">Special</option>
        </select>
      </div><br/>
      {/* <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name} - {item.category}</li>
        ))}
      </ul> */}
    </div>
    <div>
    <h6>Filter by Brand</h6>
      <div>
        <select id="brandFilter"   value={selectedBrand}
  onChange={handleBrandChange} >
          <option value="All">All</option>
          <option value="Jio">Jio</option>
          <option value="Cipla">Cipla</option>
        </select>
      </div><br/>
</div>
   </div>
   {
    filteredProducts.length>0 &&(
     <div className='my-products text-center'>
      <h1 className='text-center'>{category}</h1>
      <a className='center' onClick={returnToAllProducts}><h3>Return to All Products</h3></a>
      <div className='products-box'>
        {filteredProducts.map(IndividualFilteredProduct=>(
          <IndividualFilteredProduct2 data={data} key={IndividualFilteredProduct.ID} IndividualFilteredProduct={IndividualFilteredProduct} addToCart={addToCart} />
        ))}
      </div>
     </div>
    )
   }

   {filteredProducts.length< 1 &&(
    <>
    {products.length>0 &&
   (
    <div className='my-products'>
      <h1 className='text-center'>All Products</h1>
      <div className='products-box'>
        <Products3 products={products} addToCart={addToCart}/>
        
      </div>
    </div>
   )
    }
    {products.length<1 &&(
      <div className='my-products please wait'> Please wait...</div>
    )}
    
    </>
   )}

   </>
  )
}

export default Home2
