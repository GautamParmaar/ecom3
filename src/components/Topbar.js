import React from 'react'
import "./CSS/Topbar.css"

function Topbar() {
  return (
   <>
    <div className="top-bar-strip" style={{ backgroundColor: '#fffcb7',position: 'sticky', top: '0' }}>
      <div className="top-bar-content">
        <div className="top-bar-element">How to Register</div>
        <div className="top-bar-element">Free Products Scheme</div>
        <div className="top-bar-element">Margin 60%</div>
        <div className="top-bar-element">Margin 50%</div>
        <div className="top-bar-element">Margin 40%</div>
        <div className="top-bar-element">Trending & Generic Medicines</div>
      </div>
    </div>
   </>
  )
}

export default Topbar