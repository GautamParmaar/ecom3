import React from 'react'
import "../CSS/MyOrder.css"

function MyOrder({user}) {
console.log("prop",user.uid)

  
  return (
    <>
<div class="container">
  {/* <!--   sidebar --> */}
  {/* <div class="sidebar">
    <div class="top">
      <div class="profile">
        <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt=""/>

        <div class="profile_info">
          <h2>Indiko Gaspar</h2>
          <p>@igaspar</p>
        </div>
      </div>

      <nav>
        <ul>
          <li><a href="javascript:void()">
              <ion-icon name="flower-outline"></ion-icon> <span>General</span>
            </a></li>
          <li><a href="javascript:void()">
              <ion-icon name="lock-closed-outline"></ion-icon> <span>Password</span>
            </a></li>
          <li><a href="javascript:void()">
              <ion-icon name="mail-outline"></ion-icon> <span>Invitations</span>
            </a></li>
          <li><a href="javascript:void()">
              <ion-icon name="cash-outline"></ion-icon> <span>Billing</span>
            </a></li>
          <li><a href="javascript:void()">
              <ion-icon name="apps-outline"></ion-icon> <span>Apps</span>
            </a></li>
        </ul>
      </nav>
    </div>

    <div class="bottom">
      <a href="javascript:void()">
        <ion-icon name="log-out-outline"></ion-icon> <span>Log out</span>
      </a>
    </div>
  </div> */}

  {/* <!--   main --> */}
  <div align="center" class="main">
    <h1 align="center">Billing</h1>

    <div>
      <h3>Order History</h3>
    </div>

    {/* <!--     table --> */}
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Total Amount</th>

          <th>Recipt</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10 Dec, 2022</td>
          <td>Pro Annual</td>
          <td>
            <a href="">Download</a>
          </td>
        </tr>
        <tr>
          <td>10 Dec, 2022</td>
          <td>Pro Annual</td>
          <td>
            <a href="javascript:void()">Download</a>
          </td>
        </tr>
        <tr>
          <td>10 Dec, 2022</td>
          <td>Pro Annual</td>
          <td>
            <a href="javascript:void()">Download</a>
          </td>
        </tr>
        <tr>
          <td>10 Dec, 2022</td>
          <td>Pro Annual</td>
          <td>
            <a href="javascript:void()">Download</a>
          </td>
        </tr>
      </tbody>
    </table>

    <a href="javascript:void()" class="more">Load More</a>

   

  
  </div>

  {/* <!--   plan --> */}

</div>

{/* <!-- ion-icons --> */}



    </>
  )
}

export default MyOrder