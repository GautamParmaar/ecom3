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
    console.log(user);
    console.log(user.uid);
    const userDocRef = doc(db, 'users', user.uid);
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
    }
  
   })
  
})

   
  return (
    <> <SideBar/>
   
   <div class="container">
  <div class="col-md-8 col-sm-6">
    <div class="panel profile-panel">
      <div class="panel-heading">
        <div class="text-left">
         
        </div>
      </div>
      {/* <!-- panel body --> */}
      <div class="panel-body">
        <div class="row">
          <div class="col-md-4">
          <div class="figure-wrapper">
            <figure>
              <img src="http://i2.imgbus.com/doimg/5co1mm5on9b50e7.jpg" alt=""/>
            </figure>
          </div>
         
        </div>
          <div class="col-md-8">
          <div class="profile-block">
            <header class="profile-header">
              <h2><i class="fa fa-user"></i> Information</h2>
              <ul class="actions">
                <li class="dropdown">
                  <a href="#" data-toggle="dropdown">
                    <i class="fa fa-pencil-square-o"></i>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-right">
                    <li>
                      <a data-profile-action="edit" href="#">Edit</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </header>
            <div class="profile-body">
              <div class="profile-view">
                <dl class="dl-horizontal">
                  <dt>Full Name</dt>
                  <dd>Joe Doe</dd>
                </dl>
                
                
                <dl class="dl-horizontal">
                  <dt>Phone</dt>
                  <dd>00971 12345678</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>Email</dt>
                  <dd>joedoe@gmail.com</dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt>GST</dt>
                  <dd>joedoe@gmail.com</dd>
                </dl>
              </div>

              <div class="profile-edit">
                {/* <dl class="dl-horizontal">
                  <dt class="p-10">Full Name</dt>
                  <dd>
                    <div class="fg-line">
                      <input type="text" class="form-control" placeholder="eg. Joe Doe"/>
                    </div>
                  </dd>
                </dl> */}
                {/* <dl class="dl-horizontal">
                  <dt class="p-10">Role</dt>
                  <dd>
                    <div class="fg-line">
                      <select class="form-control">
                                                                    <option>Business development</option>
                                                                    <option>Business Analyst</option>
                                                                    <option>Operations Manager</option>
                                                                </select>
                    </div>
                  </dd>
                </dl> */}
                
                <dl class="dl-horizontal">
                  <dt class="p-10">Pincode</dt>
                  <dd>
                    <div class="fg-line">
                      <input type="text" class="form-control" placeholder="eg. 00971 12345678"/>
                    </div>
                  </dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt class="p-10">Address</dt>
                  <dd>
                    <div class="fg-line">
                      <input type="text" class="form-control" placeholder="eg. 00971 12345678"/>
                    </div>
                  </dd>
                </dl>
                <dl class="dl-horizontal">
                  <dt class="p-10">Landmark</dt>
                  <dd>
                    <div class="fg-line">
                      <input type="text" class="form-control" placeholder="eg. 00971 12345678"/>
                    </div>
                  </dd>
                </dl>

                <div class="m-t-30">
                  <button class="btn btn-primary btn-sm waves-effect">Save</button>
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