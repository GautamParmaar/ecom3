import React from 'react';

function Testimonial() {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src="./img/testimonials/01.jpg" alt="Client 1" />
              </div>
              <div className="testimonial-content">
                <p>"I've been using ePharma Store for years. Their medications are always high quality, and their service is fast and reliable."</p>
                <div className="testimonial-meta"> - Sarah Johnson </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src="./img/testimonials/02.jpg" alt="Client 2" />
              </div>
              <div className="testimonial-content">
                <p>"ePharma Store saved me a lot of hassle with their easy online ordering and doorstep delivery. Highly recommend!"</p>
                <div className="testimonial-meta"> - Mark Davis </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src="./img/testimonials/03.jpg" alt="Client 3" />
              </div>
              <div className="testimonial-content">
                <p>"Their customer support team is fantastic. They helped me with my queries promptly and efficiently."</p>
                <div className="testimonial-meta"> - Anna Smith </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src="./img/testimonials/04.jpg" alt="Client 4" />
              </div>
              <div className="testimonial-content">
                <p>"I'm impressed with their commitment to quality and safety. It's comforting to know I can rely on them for my medications."</p>
                <div className="testimonial-meta"> - Michael Brown </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src="./img/testimonials/05.jpg" alt="Client 5" />
              </div>
              <div className="testimonial-content">
                <p>"ePharma Store has simplified my life. I no longer have to worry about running out of my essential medications."</p>
                <div className="testimonial-meta"> - Emily White </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src="./img/testimonials/06.jpg" alt="Client 6" />
              </div>
              <div className="testimonial-content">
                <p>"Their online platform is user-friendly and secure. Ordering is a breeze, and deliveries are always on time."</p>
                <div className="testimonial-meta"> - John Anderson </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
