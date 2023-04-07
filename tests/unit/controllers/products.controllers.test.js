const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const service = require("../../../src/services");
const controller = require("../../../src/controllers");
const {
  allProductsResponse,
  productCreateResponse,
} = require("../mocks/mockProducts");
const { expect } = chai;

chai.use(sinonChai);

describe("Testes de unidade do controller de produtos", () => {
  describe("Listar todos os produtos", () => {
    it("Listar todos os produtos com sucesso", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.products, "findAll").resolves(allProductsResponse);

      await controller.products.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });

    it("Listar produto por id com sucesso", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.products, "findById").resolves(allProductsResponse[0]);

      await controller.products.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    });

    it("Listar produto por termo", async function () {
      const req = {
        query: {
          q: "Traje de encolhimento",
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(service.products, "findByTerm")
        .resolves(allProductsResponse[1]);

      await controller.products.findByTerm(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[1]);
    });

    it("Criar produto ", async function () {
      const req = {
        body: {
          name: "Produto X",
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.products, "create").resolves(productCreateResponse);

      await controller.products.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productCreateResponse);
    });

    it("Atualizar produto ", async function () {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: "Produto Y",
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.products, "updateById").resolves({
        id: 1,
        name: "Produto Y",
      });

      await controller.products.updateById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: "Produto Y",
      });
    });

    it("Deleta produto por id", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.sendStatus = sinon.stub().returns(res);

      sinon.stub(service.products, "remove").resolves();

      await controller.products.remove(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });

    beforeEach(sinon.restore);
  });
});
