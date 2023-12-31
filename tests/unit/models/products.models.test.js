const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const model = require("../../../src/models");
const { allProductsResponse } = require("../mocks/mockProducts");

describe("Testes de unidade da model de produtos", function () {
  let stubConnection;

  beforeEach(() => {
    stubConnection = sinon.stub(connection, "execute");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Teste para listagem de produtos", function () {
    it("Lista todos os produtos", async function () {
      stubConnection.resolves([allProductsResponse]);

      const result = await model.products.findAll();

      expect(result).to.be.deep.equal(allProductsResponse);
    });

    it("Lista produto por id", async function () {
      stubConnection.resolves([allProductsResponse]);

      const result = await model.products.findById(1);

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });

    it("Lista produto por termo", async function () {
      stubConnection.resolves([allProductsResponse]);

      const [result] = await model.products.findByTerm("Traje de encolhimento");

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });
  });

  describe("Teste para criação de produtos", function () {
    it("Criação de produto", async function () {
      stubConnection.resolves([{ insertId: 4 }]);

      const insertId = await model.products.create("Produto X");

      expect(insertId).to.be.equal(4);
    });
  });

  describe("Teste para atualização de produtos", function () {
    it("Atualização de produto", async function () {
      stubConnection.resolves([{ changedRows: 1 }]);

      const [message] = await model.products.updateById(1, "Produto X");

      expect(message.changedRows).to.be.equal(1);
    });
  });

  describe("Teste para excluir produtos", function () {
    it("Deleta produto por id", async function () {
      stubConnection.resolves([{ affectedRows: 1 }]);

      const [message] = await model.products.remove(1);

      expect(message.affectedRows).to.be.equal(1);
    });
  });
});
