const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const service = require("../../../src/services");
const controller = require("../../../src/controllers");
const { allProductsResponse } = require("../../unit/mocks/mockProducts");
const { expect } = chai;

chai.use(sinonChai);

describe("Testes de unidade do controller de produtos", () => {
  describe("Listar todos os produtos", () => {
    it("Listar todos os produtos com sucesso", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.products, "listAll").resolves(allProductsResponse);

      await controller.products.listAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
    beforeEach(sinon.restore);
  });
});
