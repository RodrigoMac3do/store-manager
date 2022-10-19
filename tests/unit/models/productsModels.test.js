const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const model = require("../../../src/models");
const { allProductsResponse } = require("../mocks/mockProducts");

describe("Testes de unidade do model de produtos", () => {
  describe("Listagem de todos os produtos", () => {
    it("Lista todos os produtos com sucesso", async () => {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);

      const result = await model.products.listAll();

      expect(result).to.be.deep.equal(allProductsResponse);
    });
    it("Lista produto por id com sucesso", async () => {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);

      const [result] = await model.products.findById(1);

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });
    
    beforeEach(sinon.restore);
  });
});
