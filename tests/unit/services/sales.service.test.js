const { expect } = require("chai");
const sinon = require("sinon");
const model = require("../../../src/models");
const service = require("../../../src/services");
const { allSales } = require("../mocks/mockSales");

describe("Testes de unidade do service de sales", () => {
  describe("Listar todos os sales", () => {
    it("Listar todos os sales com sucesso", async () => {
      sinon.stub(model.sales, "listAll").resolves(allSales);

      const result = await service.sales.listAll();

      expect(result).to.be.deep.equal(allSales);
    });
    it("Listar sale por id com sucesso", async () => {
      sinon.stub(model.sales, "findById").resolves(allSales[0]);

      const result = await service.sales.findById(1);

      expect(result).to.be.deep.equal(allSales[0]);
    });
    it("Listar sale por id sem sucesso", async () => {
      sinon.stub(model.sales, "findById").resolves([]);

      const result = await service.sales.findById(0);

      expect(result).to.be.deep.equal([]);
    });
    beforeEach(sinon.restore);
  });
});
