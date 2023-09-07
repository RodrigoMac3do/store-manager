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

describe("Testes de unidade do controller de produtos", function () {
  let stubFindAllProducts;
  let stubFindByIdProducts;
  let stubFindByTermProducts;
  let stubCreateProducts;
  let stubUpdateByIdProducts;
  let stubRemoveProducts;

  beforeEach(() => {
    stubFindAllProducts = sinon.stub(service.products, "findAll");
    stubFindByIdProducts = sinon.stub(service.products, "findById");
    stubFindByTermProducts = sinon.stub(service.products, "findByTerm");
    stubCreateProducts = sinon.stub(service.products, "create");
    stubUpdateByIdProducts = sinon.stub(service.products, "updateById");
    stubRemoveProducts = sinon.stub(service.products, "remove");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Teste para listagem de produtos", function () {
    it("Listar todos os produtos", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubFindAllProducts.resolves(allProductsResponse);

      await controller.products.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });

    it("Listar produto por id", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubFindByIdProducts.resolves(allProductsResponse[0]);

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

      stubFindByTermProducts.resolves(allProductsResponse[1]);

      await controller.products.findByTerm(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[1]);
    });
  });

  describe("Teste para criação de produtos", function () {
    it("Criar produto ", async function () {
      const req = {
        body: {
          name: "Produto X",
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubCreateProducts.resolves(productCreateResponse);

      await controller.products.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productCreateResponse);
    });
  });

  describe("Teste para atualização de produtos", function () {
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

      stubUpdateByIdProducts.resolves({
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
  });

  describe("Teste para excluir produtos", function () {
    it("Deleta produto por id", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.sendStatus = sinon.stub().returns(res);

      stubRemoveProducts.resolves();

      await controller.products.remove(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });
  });
});
