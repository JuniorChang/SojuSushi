import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="ms-auto py-3" md="auto">
            &copy; Demo Project by Junior Chang
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
