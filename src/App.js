import React, { useState } from 'react';
import './App.css';
import headerImage from './lib/Asset 14@4x.png'; // Correct import for the header image

const menuItems = [
  { name: 'Lemon Juice', price: 1.5, image: 'https://images.unsplash.com/photo-1653542772393-71ffa417b1c4?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Spaghetti', price: 5, image: 'https://plus.unsplash.com/premium_photo-1664391765043-57f702c4d41d?q=80&w=3735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Orange Juice', price: 1.5, image: 'https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Coffee', price: 1.25, image: 'https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=3749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'BBQ', price: 3.5, image: 'https://images.unsplash.com/photo-1523139348426-081681667818?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Bread', price: 2.5, image: 'https://images.unsplash.com/photo-1486887396153-fa416526c108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const firstHalfItems = menuItems.slice(0, 3);
const secondHalfItems = menuItems.slice(3);

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addItem = (item) => {
    setSelectedItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(selected => selected.name === item.name);
  
      if (existingItemIndex > -1) {
        // Item already exists in the cart, increase its quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return newItems;
      } else {
        // Item does not exist in the cart, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  

  const removeItem = (index) => {
    setSelectedItems(prevItems => {
      const newItems = [...prevItems];
      if (newItems[index].quantity > 1) {
        // Decrease quantity if more than 1
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity - 1
        };
        return newItems;
      } else {
        // Remove the item if quantity is 1
        newItems.splice(index, 1);
        return newItems;
      }
    });
  };
  

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePurchase = () => {
    if (selectedItems.length > 0) {
      setShowConfirmation(true);
      setSelectedItems([]); // Clear the cart after purchase
    }
  };

  const closeOverlay = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="App">
      <div className="Sidebar">
        <div className="Sidebar-logo">
          <img className="Header-logo" src={headerImage} alt="Little Lemon Logo" /> {/* Use headerImage correctly */}
        </div>
        <nav className="navigationBar">
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">Book</a>
          <a href="#">About</a>
        </nav>
      </div>

      <div className="MainContent">
        <header className="header">
          <div className="headerBG">
            <img
              className="Header-bg"
              src="https://plus.unsplash.com/premium_photo-1666262371157-b3da64e89298?q=80&w=3774&auto=format&fit=crop"
              alt="Header Background"
            />
          </div>
          <div className="header-info">
            <h3>30% off this weekend</h3>
            <p>
              Celebrate the weekend with a burst of freshness at Little Lemon! We're offering an
              exclusive 30% discount on all our signature citrus-inspired dishes and beverages.
            </p>
          </div>
        </header>

        <div className="wrapper">
          <main>
            <h1>Menu</h1>
            <div className="menu-section">
              <div className="menu-list">
                {firstHalfItems.map((item, index) => (
                  <div key={index} className="menu-item">
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button onClick={() => addItem(item)}>Add</button>
                  </div>
                ))}
              </div>
              <div className="menu-list">
                {secondHalfItems.map((item, index) => (
                  <div key={index} className="menu-item">
                    <img src={item.image} alt={item.name} className="menu-item-image" />
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button onClick={() => addItem(item)}>Add</button>
                  </div>
                ))}
              </div>
            </div>

            <h2>Your Order</h2>
            {selectedItems.length === 0 ? (
              <p>No items selected</p>
            ) : (
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                    <button onClick={() => removeItem(index)} className="remove-button">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <h3>Total: ${calculateTotal()}</h3>

            {selectedItems.length > 0 && (
              <button className="buy-now-button" onClick={handlePurchase}>
                Buy Now
              </button>
            )}
          </main>
        </div>

        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-content">
              <h2>Thank you for your purchase!</h2>
              <p>Your order has been confirmed and is being prepared.</p>
              <button onClick={closeOverlay}>Close</button>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>&copy; 2024 Little Lemon. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
