import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function DisplayProduct() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/")
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("err", err));
  }, []);

  const handleAdd = () => {
    navigate("/addproduct/");
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProduct(product.filter((p) => p.id !== id));
        alert("❌ Product deleted");
      })
      .catch((err) => console.log("axios error", err));
  };

  const handleUpdate = (id) => {
    navigate(`/updateproduct/${id}`);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">🛍️ Our Products</h2>
        <Button variant="success" onClick={handleAdd}>
          ➕ Add Product
        </Button>
      </div>

      <Row>
        {product.map((products) => (
          <Col key={products.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="shadow-lg border-0 h-100">
              <Card.Img
                variant="top"
                src={products.image}
                alt={products.title}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title className="text-truncate">{products.title}</Card.Title>
                <Card.Text>
                  <span className="fw-bold text-success">${products.price}</span>
                  <br />
                  <small className="text-muted">{products.category}</small>
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>⭐ {products.rating?.rate} / 5</span>
                  <small>({products.rating?.count} reviews)</small>
                </div>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleUpdate(products.id)}
                  >
                    ✏️ Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(products.id)}
                  >
                    🗑 Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
