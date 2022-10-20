const { expect } = require("chai");
const sinon = require("sinon");
const model = require("../../../src/models");
const service = require("../../../src/services");
const { allSales } = require("../mocks/mockSales");

describe("Testes de unidade do service de sales", function () {
  describe("Listar todos os sales", function () {
    it("Listar todos os sales com sucesso", async function () {
      sinon.stub(model.sales, "listAll").resolves(allSales);

      const result = await service.sales.listAll();

      expect(result).to.be.deep.equal(allSales);
    });
    it("Listar sale por id com sucesso", async function () {
      sinon.stub(model.sales, "findById").resolves(allSales[0]);

      const result = await service.sales.findById(1);

      expect(result).to.be.deep.equal(allSales[0]);
    });
    it("Listar sale por id sem sucesso", async function () {
      sinon.stub(model.sales, "findById").resolves([]);

      try {
        await service.sales.findById(0);
      } catch (error) {
        expect(error.status).to.be.deep.equal(404);
      }
    });
    
    beforeEach(sinon.restore);
  });
});
