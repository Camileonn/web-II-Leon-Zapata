import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/product_details.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductsById(id);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
  
    if (!Array.isArray(cart)) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      return;
    }
  
    if (cart.length >= 5) {
      alert("Solo puedes agregar un máximo de 5 productos.");
      return;
    }
  
    const currentTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (currentTotal + product.price > 10000) {
      alert("El total no puede exceder los 10,000 pesos.");
      return;
    }
  
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Si el producto ya está en el carrito, solo actualiza la cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Si el producto no está en el carrito, agrégalo
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const isInCart = Array.isArray(cart) && cart.some((item) => item.id === product?.id);

  const image = "https://imgs.search.brave.com/ti7F41pW3oNrqH6FqBXQEqUEzFDnl1Wf-F8YtVViYTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA";

  return (
    <div>
      {loading ? (
        <div className="loading-container">
        </div>
      ) : (
        product && (
          <div className="page-container">
            <div className="product-details-page-container">
              <div className="product-image-container">
                <img src={product.images?.[0] || image} alt="Product" />
              </div>

              <div className="product-details-container">

                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                </div>

                <div className="product-specifications">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Brand</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{titleCase(product.category)}</td>
                        <td>{product.brand ?? "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>${product.price}</h5>
                </div>
                <div className="product-buttons">
                  {isInCart ? (
                    <button id="added-to-cart-button" disabled>
                      producto agregado
                    </button>
                  ) : (
                    <button id="add-to-cart-button" onClick={addToCart}>
                      Añadir al carrito
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

async function getProductsById(id) {
  const product = await fetch(`https://dummyjson.com/products/${id}`);
  return product.json();
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
