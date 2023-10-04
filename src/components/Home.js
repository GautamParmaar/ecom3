import React, { useEffect, useState } from 'react'
import Navbar2, { Navbar } from './Navbar'
// import Products3 from './Products'
import {db,auth } from "../config/Config.js"
import { collection, getDocs,setDoc,doc } from 'firebase/firestore';
import Products3 from './Products';
import Sidebar from './SideBar';
import { useNavigate } from 'react-router-dom';
import IndividualFilteredProduct2 from './IndividualFilteredProduct2';
import SingleProduct from './SingleProduct';
import SmallNav from './SmallNav';






const Home2 = (props) => {
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
        history('/login2');
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterFunction(event.target.value)
  };

  const filteredData = selectedCategory === 'All' ? data : data.filter(item => item.category === selectedCategory);

const categories=[
  'generic',
  'special'
]

//for filtering by brand
const Branddata = [
  { id: 1, name: 'Cipla', category: 'Cipla' },
  { id: 2, name: 'Jio', category: 'Jio' },
  // Add more data items here
];
const [selectedBrand, setSelectedBrand] = useState('All');
const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
};


//handle change will set category
const handleChange=(individualSpan)=>{
 setActive(individualSpan.id);
 setCategory(individualSpan.text)
 filterFunction(individualSpan.text)
}

//filtered products state
const [filteredProducts,setfilteredProducts]=useState([])
//filter function
const filterFunction=(text)=>{
 const filter=products.filter((product)=>product.category===text)
 setfilteredProducts(filter)
}

const returnToAllProducts=()=>{
  setCategory('');
  setfilteredProducts([]);
}

  return (
   <>

  <br/>
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



   <div className='container-fluid filter-products-main-box'>

   <div>
      <h6>Filter by Category</h6>
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
    <h6>Filter by Category</h6>
      <div>
        <select id="brandFilter" value={selectedBrand} onChange={handleBrandChange}>
          <option value="All">All</option>
          <option value="generic">Jio</option>
          <option value="special">Cipla</option>
        </select>
      </div><br/>
</div>
   </div>
   {
    filteredProducts.length>0 &&(
     <div className='my-products text-center'>
      <h1 className='text-center'>{category}</h1>
      <a className='center' onClick={returnToAllProducts}>Return to All Products</a>
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
