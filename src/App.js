import React, { useState } from 'react';

function App() {
  const [size, setSize] = useState('Small');
  const [cheese, setCheese] = useState('Cheese');
  const [email, setEmail] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleSizeChange = (event) => setSize(event.target.value);
  const handleCheeseChange = (event) => setCheese(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmitOrder = () => {
    setOrderSubmitted(true);
  };

  const handlePlaceOrder = () => {
    setSize('Small');
    setCheese('Cheese');
    setEmail('');
    setOrderSubmitted(false);
  };

  return (
    <div>
      <h1>Your selection: {size} {cheese}</h1>

      <label>
        Size:
        <select value={size} onChange={handleSizeChange}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </label>

      <label>
        Cheese:
        <select value={cheese} onChange={handleCheeseChange}>
          <option value="cheese">Cheese</option>
          <option value="no cheese">No Cheese</option>
        </select>
      </label>

      <br />

      <input
        placeholder="email address"
        type="text"
        value={email}
        onChange={handleEmailChange}
      />

      <button
        disabled={!email}
        onClick={handleSubmitOrder}
      >
        Submit Order
      </button>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>

      {orderSubmitted && <h2>Thank you for your order!</h2>}
    </div>
  );
}

export default App;
