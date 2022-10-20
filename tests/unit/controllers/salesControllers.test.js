const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const service = require("../../../src/services");
const controller = require("../../../src/controllers");
const { allSales } = require("../mocks/mockSales");

const { expect } = chai;

chai.use(sinonChai);

describe("Testes de unidade do controller de sales", () => {
  describe("Listar todos os sales", () => {
    it("Listar todos os sales com sucesso", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.sales, "listAll").resolves(allSales);

      await controller.sales.listAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
    it("Listar produto por id com sucesso", async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service.sales, "findById").resolves(allSales[0]);

      await controller.sales.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales[0]);
    });

    beforeEach(sinon.restore);
  });
});
