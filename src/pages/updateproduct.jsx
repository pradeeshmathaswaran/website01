import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
  });

  const navigate = useNavigate();

  // Fetch product by ID when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("error fetching product:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/products/${id}`, product)
      .then((res) => {
        setProduct(res.data);
        alert("✅ Product updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log("error updating product:", err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Card className="p-4 shadow-lg" style={{ width: "500px" }}>
        <h3 className="text-center text-warning mb-4">✏️ Update Product</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={product.title}
              placeholder="Enter product title"
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              value={product.price}
              placeholder="Enter product price"
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={product.category}
              placeholder="Enter category"
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={product.image}
              placeholder="Enter image URL"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
          </Form.Group>

          {/* Live Image Preview */}
          {product.image && (
            <div className="text-center mb-3">
              <img
                src={product.image}
                alt="preview"
                width="120"
                height="120"
                className="rounded shadow"
              />
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              value={product.rating?.rate || ""}
              placeholder="Enter rating (0-5)"
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
              value={product.rating?.count || ""}
              placeholder="Enter number of reviews"
              onChange={(e) =>
                setProduct({
                  ...product,
                  rating: { ...product.rating, count: e.target.value },
                })
              }
            />
          </Form.Group>

          <Button type="submit" variant="warning" className="w-100">
            💾 Update Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
