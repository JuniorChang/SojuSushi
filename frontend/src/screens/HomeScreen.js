import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(name));
  }, [dispatch, name]);
  console.log("name", name);

  return (
    <>
      <h1> Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Link
                style={{ textDecoration: "none " }}
                to={`/product/${product._id}`}
              >
                <Product product={product} />
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
