import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("show display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Product 1 test",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Price must be greater than 0");
  });

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Product 1 test",
      price: 100,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/products", () => {
  it("should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(400);
  });

  it("should get all products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/products/:id", () => {
  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");
  });

  it("Should check a valid ID in the url", async () => {
    const productId = "test";
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Invalid ID");
  });

  it("Should get a product by ID", async () => {
    const productId = 1;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.id).toBe(productId);
  });
});

describe("PUT /api/products/:id", () => {
  it("should check a valid ID in the url", async () => {
    const productId = "test";
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Product 1 test",
        price: 100,
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Invalid ID");
  });

  it("should display validation errors message when updating a product", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
  });
});

describe("DELETE /api/products/:id", () => {
  it("should check a valid ID in the url", async () => {
    const productId = "test";
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Invalid ID");
  });

  it("should delete a product", async () => {
    const productId = 1;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
  });
});
