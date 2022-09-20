const request = require("supertest");
const expect = require("chai").expect;
const app = require("./src/app");

describe("Test api rest full - products routes", () => {
  describe("GET", () => {
    it("Must get all products and status 200", async (done) => {
      await request(app)
        .get("/api/products")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
  describe("POST", () => {
    it("create new product on BD", async (done) => {
      let newProduct = {
        title: "Producto Nuevo",
        price: 100,
        text: "Producto Nuevo",
        thumbnail: "Producto Nuevo",
        code: "Producto Nuevo",
      };
      await request(app)
        .post("/api/products")
        .send(newProduct)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
  /*
   */

  describe("PUT", () => {
    /*
      it('Take a product in inventory and modify some qualities', async () => {
       let newQualities = {
        "title": "actualiza nombre producto",
        "price": 1001,
        "text": "actuliza la descripción",
        "thumbnail": "actualizalarutadeimage.jpg",
        "code": "actualiza el codigo del producto",
        "id": 17,
       };

       let response = await request.put('/api/products/').send(newQualities);
       expect(response.status).to.equal(202)
       
    });
    */
    it("Take a product in inventory and modify some qualities", async (done) => {
      let newQualities = {
        title: "actualiza nombre producto",
        price: 1001,
        text: "actuliza la descripción",
        thumbnail: "actualizalarutadeimage.jpg",
        code: "actualiza el codigo del producto",
        id: 17,
      };
      await request(app)
        .put("/api/products/")
        .send(newQualities)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(202)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe("DELETE", () => {
    it("Search for a product and delete it", async (done) => {
      await request(app)
        .delete("/api/products/18")
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
