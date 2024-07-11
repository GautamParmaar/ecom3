import React, { useState } from 'react';
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../config/Config.js";
import AdminNavbar from './Admin/AdminNavbar.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProducts({ user }) {
  const [values, setValues] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    desc: '',
  });
  const [image, setImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${image.name}`;

    const storageRef = ref(storage, 'ProductImages/' + uniqueFileName);
    await uploadBytes(storageRef, image);

    const imageUrl = await getDownloadURL(storageRef);

    try {
      await addDoc(collection(db, "products"), {
        name: values.name,
        brand: values.brand,
        category: values.category,
        price: values.price,
        description: values.desc,
        image: imageUrl
      });
      toast.success('Product added successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error('Error adding product: ' + e.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const adminUID = process.env.REACT_APP_ADMINUID;
  const admin2 = 'CuEVOvzoiEhhn50CPJMeSzXKuoK2';

  return (
    <>
      <ToastContainer />
      {user && (user.uid === adminUID || user.uid === admin2) ? (
        <div>
          <AdminNavbar />
          <div className="add-products-container">
            <div className="add-products-box">
              <div className="add-products-title">Add Products</div>
              <form onSubmit={handleSubmit} className="add-products-form">
                <div className="add-products-row">
                  <div className="add-products-textbox">
                    <input
                      type="text"
                      placeholder="Product Title"
                      required
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="add-products-row">
                  <div className="add-products-textbox">
                    <input
                      type="text"
                      placeholder="Product Description"
                      required
                      onChange={(e) => setValues({ ...values, desc: e.target.value })}
                    />
                  </div>
                </div>
                <div className="add-products-row">
                  <div className="add-products-textbox">
                    <input
                      type="number"
                      placeholder="Product Price"
                      required
                      onChange={(e) => setValues({ ...values, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="add-products-row">
                  <div className="add-products-textbox">
                    <input
                      type="text"
                      placeholder="Category"
                      required
                      onChange={(e) => setValues({ ...values, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="add-products-row">
                  <div className="add-products-textbox">
                    <input
                      type="file"
                      required
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <button type="submit" className="add-products-button">SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="error-message">Error: You are not authorized to view this content</div>
      )}
    </>
  )
}

export default AddProducts;
