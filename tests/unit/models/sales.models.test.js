const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const model = require("../../../src/models");
const { allSales } = require("../mocks/mockSales");

describe("Testes de unidade da model de sales", function () {
  let stubConnection;

  beforeEach(() => {
    stubConnection = sinon.stub(connection, "execute");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Teste para listagem de sales", function () {
    it("Lista todos as sales", async function () {
      stubConnection.resolves([allSales]);

      const result = await model.sales.findAll();

      expect(result).to.be.deep.equal(allSales);
    });

    it("Lista sale por id", async function () {
      stubConnection.resolves([allSales]);

      const [result] = await model.sales.findById(1);

      expect(result).to.be.deep.equal(allSales[0]);
    });
  });

  describe("Teste para criação de sale", function () {
    it("Criação de sale", async function () {
      stubConnection
        .onFirstCall()
        .resolves([{ insertId: 3 }])
        .onSecondCall()
        .resolves([{ affectedRows: 1 }]);

      const insertId = await model.sales.createSale();

      expect(insertId).to.be.equal(3);

      const [{ affectedRows }] = await model.sales.create({
        productId: 1,
        quantity: 10,
        id: insertId,
      });

      expect(affectedRows).to.be.equal(1);
    });
  });

  describe("Testes de atualização de sales", () => {
    it("Atualização de sale", async () => {
      stubConnection.resolves({ affectedRows: 1 });

      const id = 1;
      const result = await model.sales.updateById(id, {
        productId: 1,
        quantity: 10,
      });

      expect(result.affectedRows).to.equal(1);
    });
  });

  describe("Teste para excluir sale", function () {
    it("Remove sale por id", async function () {
      stubConnection.resolves([{ affectedRows: 1 }]);

      const [message] = await model.sales.remove(1);

      expect(message.affectedRows).to.be.equal(1);
    });
  });
});
