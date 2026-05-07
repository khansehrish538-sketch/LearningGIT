import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
;

function Card() {
  return (

   <div className="card shadow" style={{ width: "18rem" }}>
      <img
        src="https://via.placeholder.com/300x200"
        className="card-img-top"
        alt="card"
      />

      <div className="card-body">
        <h5 className="card-title">My Card</h5>
        <p className="card-text">
          This is a reusable React Bootstrap card component.
        </p>
        <button className="btn btn-primary">Click Me</button>
      </div>
    </div>
  )
}

export default Card
