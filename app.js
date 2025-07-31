import React from 'react';

export const productsData = [
  { id: 1, name: 'T-Shirt', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jeans', price: 39.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Sneakers', price: 59.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Backpack', price: 24.99, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Cap', price: 14.99, image: 'https://via.placeholder.com/150' }
];

export function App() {
  const [cartItems, setCartItems] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const filteredProducts = productsData.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <h2>🛍️ MyShop</h2>
        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="cart-count">Cart: {cartItems.length}</div>
      </div>

      <div className="main">
        <div className="products">
          {filteredProducts.map(product => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>€{product.price.toFixed(2)}</p>
              <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="cart">
          <h3>🧺 Your Cart</h3>
          {cartItems.length === 0 ? <p>No items added.</p> :
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <span>{item.name}</span>
                <button className="remove" onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
