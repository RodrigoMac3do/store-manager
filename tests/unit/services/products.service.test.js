const { expect } = require("chai");
const sinon = require("sinon");
const model = require("../../../src/models");
const service = require("../../../src/services");
const { allProductsResponse } = require("../../unit/mocks/mockProducts");

describe("Testes de unidade do service de produtos", () => {
  describe("Listar todos os produtos", () => {
    it("Listar todos os produtos com sucesso", async () => {
      sinon.stub(model.products, "listAll").resolves(allProductsResponse);

      const result = await service.products.listAll();

      expect(result).to.be.deep.equal(allProductsResponse);
    });
    beforeEach(sinon.restore);
  });
});
