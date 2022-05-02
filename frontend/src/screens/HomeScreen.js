import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <h1> Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Product product={product} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
