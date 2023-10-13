import React,{useEffect, useState} from 'react'
import "./CSS/Profile.css"
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/Config'
import SideBar from './SideBar'

function Profile({user}) {
  const [userName,setUsername]=useState("")
 const [userEmail,setUserEmail]=useState("")
 const [userPhoneNo,setUserPhoneNo]=useState("")
 const [userUID,setUserUID]=useState("")
 const[userPhone,setUserPhone]=useState("")
 const [userGST,setUserGST]=useState("")
 useEffect(()=>{
  auth.onAuthStateChanged(async(user)=>{
    if(user){
      setUsername(user.displayName)
      setUserEmail(user.email)
      // setUserPhoneNo(user.phoneNumber)
      setUserUID(user.uid);}
    else{
      setUsername()
    }
  
   if(user){ const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      // Document data exists, you can access it using .data() method
      const userData = userDoc.data();
      console.log('Fetched data:', userData);
      setUserPhone(userData.phone);
      setUserGST(userData.GST);
      
      return userData;
    } else {
      console.log('No such document!');
      return null;
    }}
  
   })
  
})

   
  return (
    <> 
   
   <div className="container">
  <div className="col-md-8 col-sm-6">
    <div className="panel profile-panel">
      <div className="panel-heading">
        <div className="text-left">
         
        </div>
      </div>
      {/* <!-- panel body --> */}
      <div className="panel-body">
        <div className="row">
          <div className="col-md-4">
          <div className="figure-wrapper">
            <figure>
              <img src="http://i2.imgbus.com/doimg/5co1mm5on9b50e7.jpg" alt=""/>
            </figure>
          </div>
         
        </div>
          <div className="col-md-8">
          <div className="profile-block">
            <header className="profile-header">
              <h2><i className="fa fa-user"></i> Profile</h2>
              <ul className="actions">
                <li className="dropdown">
                  <a href="#" data-toggle="dropdown">
                    {/* <i className="fa fa-pencil-square-o"></i> */}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <a data-profile-action="edit" href="#">Edit</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </header>
            <div className="profile-body">
              <div className="profile-view">
                <dl className="dl-horizontal">
                  <dt>Full Name</dt>
                  <dd>{userName}</dd>
                </dl>
                
                
                <dl className="dl-horizontal">
                  <dt>Phone</dt>
                  <dd>{userPhone}</dd>
                </dl>
                <dl className="dl-horizontal">
                  <dt>Email</dt>
                  <dd>{userEmail}</dd>
                </dl>
                <dl className="dl-horizontal">
                  <dt>GST</dt>
                  <dd>{userGST}</dd>
                </dl>
              </div>

              <div className="profile-edit">
                {/* <dl className="dl-horizontal">
                  <dt className="p-10">Full Name</dt>
                  <dd>
                    <div className="fg-line">
                      <input type="text" className="form-control" placeholder="eg. Joe Doe"/>
                    </div>
                  </dd>
                </dl> */}
                {/* <dl className="dl-horizontal">
                  <dt className="p-10">Role</dt>
                  <dd>
                    <div className="fg-line">
                      <select className="form-control">
                                                                    <option>Business development</option>
                                                                    <option>Business Analyst</option>
                                                                    <option>Operations Manager</option>
                                                                </select>
                    </div>
                  </dd>
                </dl> */}
                
                <dl className="dl-horizontal">
                  <dt className="p-10">Pincode</dt>
                  <dd>
                    <div className="fg-line">
                      <input type="text" className="form-control" placeholder="eg. 00971 12345678"/>
                    </div>
                  </dd>
                </dl>
                <dl className="dl-horizontal">
                  <dt className="p-10">Address</dt>
                  <dd>
                    <div className="fg-line">
                      <input type="text" className="form-control" placeholder="eg. 00971 12345678"/>
                    </div>
                  </dd>
                </dl>
                <dl className="dl-horizontal">
                  <dt className="p-10">Landmark</dt>
                  <dd>
                    <div className="fg-line">
                      <input type="text" className="form-control" placeholder="eg. 00971 12345678"/>
                    </div>
                  </dd>
                </dl>

                <div className="m-t-30">
                  <button className=" btn btn-primary " style={{color:'white'}}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      {/* <!-- end panel body --> */}
    </div>
  </div>
</div>
    </>
  )
}

export default Profile