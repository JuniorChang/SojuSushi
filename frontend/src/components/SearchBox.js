import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    alert(`Searching for ${name}`);
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setName(e.target.value)}
        placeholder
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
    // <h1> hi</h1>
  );
};

export default SearchBox;
