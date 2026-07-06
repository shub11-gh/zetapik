import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, decreaseQuantity, refreshData } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        if (response) {
          setProduct(response.data);
        }
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };
    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if (!product.productAvailable) return;

    setIsAnimating(true);
    addToCart(product);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="containers">
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
        />

        <div className="right-column">
          <div className="product-description">
            <span>{product.category}</span>
            <h1>{product.name}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-price">
            <span>{"$" + product.price}</span>
            {isAnimating ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '45px', width: '200px' }}>
                <i className="bi bi-check-circle-fill pop-in-anim" style={{ fontSize: '2rem' }}></i>
              </div>
            ) : cart.find(item => item.id === product.id) ? (
              <div className="inline-quantity-control" style={{ width: '150px', height: '45px' }}>
                <button
                  className="qty-btn"
                  onClick={(e) => { e.preventDefault(); decreaseQuantity(product.id); }}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="qty-amount">{cart.find(item => item.id === product.id).quantity}</span>
                <button
                  className="qty-btn"
                  onClick={(e) => { e.preventDefault(); addToCart(product); }}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            ) : (
              <button
                className={`text-white cart-btn ${!product.productAvailable ? "disabled-btn" : ""}`}
                onClick={handleAddToCartClick}
                disabled={!product.productAvailable}
              >
                <strong>{product.productAvailable ? "Add to cart" : "Out of Stock"}</strong>
              </button>
            )}
            <h6>
              Stock Available :{" "}
              <span style={{ fontWeight: "bold", display: "inline-block", fontSize: "1.3rem" }}>
                {product.stockQuantity}
              </span>
            </h6>
            <div className="release-date">
              <h6 style={{ display: "inline-block" }}>Product listed on:</h6>
              <i>
                {" "}
                {new Date(product.releaseDate).getDate().toString().padStart(2, '0')}-
                {(new Date(product.releaseDate).getMonth() + 1).toString().padStart(2, '0')}-
                {new Date(product.releaseDate).getFullYear()}
              </i>
            </div>
          </div>
          <div className="update-button">
            <button
              className="btn btn-success text-white"
              style={{ fontWeight: "bold" }}
              type="button"
              onClick={handleEditClick}
            >
              Update
            </button>
            {/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
            <button
              className="btn btn-danger text-white"
              style={{ fontWeight: "bold" }}
              type="button"
              onClick={deleteProduct}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
