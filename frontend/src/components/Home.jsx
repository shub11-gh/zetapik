import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, decreaseQuantity, cart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [animatingIds, setAnimatingIds] = useState({});

  const handleAddToCartClick = (e, product) => {
    e.preventDefault();
    if (!product.productAvailable) return;

    setAnimatingIds(prev => ({ ...prev, [product.id]: true }));
    addToCart(product);

    setTimeout(() => {
      setAnimatingIds(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem", backgroundColor: "var(--body_background)" }}>
        Unable to fetch products...
      </h2>
    );
  }
  return (
    <>
      <div className="grid">
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gridColumn: "1 / -1",
              width: "100%",
              height: "100%",
            }}
          >
            No Products Available...
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } =
              product;
            return (
              <div
                className="card mb-3 pt-2"
                style={{
                  width: "18rem",
                  height: "24rem",
                  opacity: productAvailable ? 1 : 0.6,
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "180px",
                      padding: "5px",
                      margin: "0",
                      verticalAlign: "middle",
                      borderRadius: "15px",
                      objectFit: "cover"
                    }}
                  />

                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{ margin: "0 0 10px 0" }}
                      >
                        {name ? name.toUpperCase() : "Unnamed Product"}
                      </h5>
                      <i className="card-brand" style={{ fontStyle: "italic" }}>
                        {"~ " + brand}
                      </i>
                    </div>
                    <div>
                      <h5
                        className="card-text"
                        style={{ fontWeight: "600", marginTop: "20px" }}
                      >
                        {"$" + price}
                      </h5>
                      <div style={{ marginTop: "20px" }}>
                        {animatingIds[product.id] ? (
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '45px' }}>
                            <i className="bi bi-check-circle-fill pop-in-anim" style={{ fontSize: '2rem' }}></i>
                          </div>
                        ) : cart.find(item => item.id === product.id) ? (
                          <div className="inline-quantity-control">
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
                            className="btn btn-primary"
                            style={{ width: "100%", height: "38px" }}
                            onClick={(e) => handleAddToCartClick(e, product)}
                            disabled={!productAvailable}
                          >
                            {productAvailable ? "Add to Cart" : "Out of Stock"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
