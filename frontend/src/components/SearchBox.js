import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter a name");
    } else {
      navigate(`/search/${name}`);
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group as={Row} className="" controlId="formHorizontalEmail">
        <Col sm={10}>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for Products..."
            className="mr-sm-2 ml-sm-5 py-2 my-2"
          />
        </Col>
        <Form.Label column sm={2}>
          <Button
            column
            sm={2}
            type="submit"
            variant="outline-success"
            className="p-2"
          >
            Search
          </Button>
        </Form.Label>
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
