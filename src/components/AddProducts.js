import React,{useState} from 'react'
import { setDoc,doc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {db,storage } from "../config/Config.js"




function AddProducts() {
    const [values, setValues] = useState({
		name: '',
		brand: '',
		category:'',
		price:'',
		desc:'',
		// img:''
	
		// name: '',
		// number: ''
	
	  })
      const [image, setImage] = useState('');
      const handleSubmit=async(event)=>{
		event.preventDefault();
		// if(image==null)return;
		// const imageRef=storage.ref(`/image/${image.name}`).put(image).on("state_changed");
		// imageRef()
		// const imageUrl = await getDownloadURL(imageRef);
		const timestamp = new Date().getTime();
		const uniqueFileName = `${timestamp}_${image.name}`;

		const storageRef =ref(storage, 'ProductImages/' + uniqueFileName);
    await uploadBytes(storageRef, image);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);
		
		
		 try {
		  const docRef =  addDoc(collection(db, "products" ), {
				name:values.name,
				brand:values.brand,
				category:values.category,
				price:values.price,
				description:values.desc,
				image:imageUrl

		  });
		  console.log("Document written with ID: ");
		} catch (e) {
		  console.error("Error adding document: ", e);
		}
		 
		
	  
		 
	   
		 
		
		
	  }

  return (
    <>
    
    <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        
            <>
                <div className='success-msg'></div>
                <br></br>
            </>
            <form autoComplete="off" className='form-group'onSubmit={handleSubmit} >
                <label>Product Title</label>
                <input type="text" className='form-control' required
                name='name' onChange={(events)=>{
                    setValues((prev)=>({...prev,name:events.target.value}))
                  }}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                onChange={(events)=>{
                    setValues((prev)=>({...prev,desc:events.target.value}))
                  }}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                name='price'  onChange={(events)=>{
                    setValues((prev)=>({...prev,price:events.target.value}))
                  }}></input>
                <br></br>
                <label>Category</label>

                <input type="text" className='form-control' required
                name='category'  onChange={(events)=>{
                    setValues((prev)=>({...prev,category:events.target.value}))
                  }}></input>
                <br></br>
                {/* <label>Product Category</label>
                <select className='form-control' required
                value={category} onChange={(e)=>setCategory(e.target.value)}>                                    
                    <option value="">Select Product Category</option>                   
                    <option>Electronic Devices</option>
                    <option>Mobile Accessories</option>
                    <option>TV & Home Appliances</option>
                    <option>Sports & outdoors</option>
                    <option>Health & Beauty</option>
                    <option>Home & Lifestyle</option>
                    <option>Men's Fashion</option>
                    <option>Watches, bags & Jewellery</option>
                    <option>Groceries</option>
                </select> */}
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
               onChange={(e)=>setImage(e.target.files[0])}></input>
                
                
                    <br></br>
                    <div className='error-msg'></div>
                   
            
                <br></br>           
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
           <>
                    <br></br>
                    <div className='error-msg'></div>
                    
                </>

        </div>
    </>
  )
}

export default AddProducts