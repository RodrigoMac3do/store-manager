const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const model = require("../../../src/models");
const { allSales } = require("../../unit/mocks/mockSales");

describe("Testes de unidade do model de sales", () => {
  describe("Listagem de todos os sales", () => {
    it("Lista todos os sales com sucesso", async () => {
      sinon.stub(connection, "execute").resolves([allSales]);

      const result = await model.sales.listAll();

      expect(result).to.be.deep.equal(allSales);
    });
  });

  it("Lista sale por id com sucesso", async () => {
    sinon.stub(connection, "execute").resolves([allSales]);

    const [result] = await model.sales.findById(1);

    expect(result).to.be.deep.equal(allSales[0]);
  });
  beforeEach(sinon.restore);
});
