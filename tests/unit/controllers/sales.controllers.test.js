const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const service = require("../../../src/services");
const controller = require("../../../src/controllers");
const {
  allSales,
  rightSaleBody,
  saleCreateResponse,
  saleUpdateResponse,
} = require("../mocks/mockSales");

const { expect } = chai;

chai.use(sinonChai);

describe("Testes de unidade do controller de sales", () => {
  let stubFindAllSales;
  let stubFindByIdSales;
  let stubCreateSales;
  let stubUpdateByIdSales;
  let stubRemoveSales;

  beforeEach(() => {
    stubFindAllSales = sinon.stub(service.sales, "findAll");
    stubFindByIdSales = sinon.stub(service.sales, "findById");
    stubCreateSales = sinon.stub(service.sales, "create");
    stubUpdateByIdSales = sinon.stub(service.sales, "updateById");
    stubRemoveSales = sinon.stub(service.sales, "remove");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Teste para listagem de sales", () => {
    it("Listar todos os sales", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubFindAllSales.resolves(allSales);

      await controller.sales.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
    it("Listar sale por id", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubFindByIdSales.resolves(allSales[0]);

      await controller.sales.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales[0]);
    });
  });

  describe("Teste para criação de sale", function () {
    it("Criar sale ", async function () {
      const req = {
        body: rightSaleBody,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubCreateSales.resolves(saleCreateResponse);

      await controller.sales.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreateResponse);
    });
  });

  describe("Teste para atualização de sale", function () {
    it("Atualizar sale", async function () {
      const req = {
        params: {
          id: 1,
        },
        body: rightSaleBody,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      stubUpdateByIdSales.resolves(saleUpdateResponse);

      await controller.sales.updateById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleUpdateResponse);
    });
  });

  describe("Teste para excluir sale", function () {
    it("Deleta sale por id", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.sendStatus = sinon.stub().returns(res);

      stubRemoveSales.resolves();

      await controller.sales.remove(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });
  });
});
