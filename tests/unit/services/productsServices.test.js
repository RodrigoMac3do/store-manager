const { expect } = require("chai");
const sinon = require("sinon");
const model = require("../../../src/models");
const service = require("../../../src/services");
const { allProductsResponse } = require("../mocks/mockProducts");

describe("Testes de unidade do service de produtos", function () {
  describe("Listar todos os produtos", function () {
    it("Listar todos os produtos com sucesso", async function () {
      sinon.stub(model.products, "listAll").resolves(allProductsResponse);

      const result = await service.products.listAll();

      expect(result).to.be.deep.equal(allProductsResponse);
    });
    it("Listar produto por id com sucesso", async function () {
      sinon.stub(model.products, "findById").resolves(allProductsResponse);

      const result = await service.products.findById(1);

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });
    it("Listar produto por id sem sucesso", async function () {
      sinon.stub(model.products, "findById").resolves([]);

      try {
        await service.products.findById(0);
      } catch (error) {
        expect(error.status).to.be.deep.equal(404);
      }
    });
    
    beforeEach(sinon.restore);
  });
});
