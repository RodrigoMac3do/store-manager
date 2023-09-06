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
  beforeEach(() => {
    sinon.restore;
  });

  describe("Teste para listagem de sales", () => {
    it("Listar todos os sales", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.sales, "findAll").resolves(allSales);

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

      sinon.stub(service.sales, "findById").resolves(allSales[0]);

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

      sinon.stub(service.sales, "create").resolves(saleCreateResponse);

      await controller.sales.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreateResponse);
    });

    // it("Teste de joi para criar sale", async function () {
    //   const req = {
    //     body: rightSaleBody,
    //   };
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   try {
    //     await controller.sales.create(req, res);
    //   } catch (error) {
    //     expect(error.status).to.be.deep.equal(401);
    //     expect(error.message).to.be.deep.equals('"productId" is required');
    //   }
    // });
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

      sinon.stub(service.sales, "updateById").resolves(saleUpdateResponse);

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

      sinon.stub(service.sales, "remove").resolves();

      await controller.sales.remove(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });
  });
});
