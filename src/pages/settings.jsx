import React, { useState } from 'react';


function Settings(){
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, send data to the backend
    console.log(cardDetails);

    // Example API call to submit data:
    // await fetch('/api/payment', { method: 'POST', body: JSON.stringify(cardDetails) });
  };

  return (
    <div className="settings-container">
      <h2>Payment Information</h2>


      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="name">Cardholder Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={cardDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="number">Card Number</label>
          <input
            type="text"
            id="number"
            name="number"
            placeholder="1234 5678 9012 3456"
            value={cardDetails.number}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry">Expiry Date</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            placeholder="CVC"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Save Payment Info</button>
      </form>
    </div>
  );
};

export default Settings;