import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/Config'
import AdminNavbar from './AdminNavbar';
import {Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../CSS/AlOrder.css"
import { collection, getDocs } from 'firebase/firestore';

function AllOrders2() {

    const [items, setItems] = useState([]);
    // const [metadata, setMetadata] = useState([]);
    let metadata


  useEffect(() => {
    const fetchData = async () => {
        try {
          const ordersCollection = collection(db, 'Orders');
          const ordersSnapshot = await getDocs(ordersCollection);
  
          const itemsData = [];
          const metadataData = [];
  
          ordersSnapshot.forEach((doc) => {
            if (doc.exists()) {
              const data = {
                id: doc.id,
                ...doc.data(),
              };
              itemsData.push(data);
  
              // Check if the 'metadata' field exists in the document
              if (data.Orders.metadata) {
                metadataData.push({
                  id: doc.id,
                  metadata: data.metadata.Date,
                });
              }
            }
          });
  
          setItems(itemsData);
          metadata=metadataData
          console.log(items,'items');
          console.log(metadata,'metadata')
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>





    </div>
  )
}

export default AllOrders2