import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/products", product)
      .then((res) => {
        setProduct(res.data);
        alert("✅ Product inserted");
        navigate("/");
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="p-4 shadow-lg" style={{ width: "450px" }}>
        <h3 className="text-center text-primary mb-4">➕ Add New Product</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product image URL"
              value={product.image}
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating (0 - 5)</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              placeholder="Enter rating"
              value={product.rating.rate}
              onChange={(e) =>
                setProduct({
                  ...product,
                  rating: { ...product.rating, rate: e.target.value },
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Review Count</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of reviews"
              value={product.rating.count}
              onChange={(e) =>
                setProduct({
                  ...product,
                  rating: { ...product.rating, count: e.target.value },
                })
              }
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            ✅ Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
