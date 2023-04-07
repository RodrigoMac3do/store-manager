const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const model = require("../../../src/models");
const { allProductsResponse } = require("../mocks/mockProducts");

describe("Testes de unidade do model de produtos", function () {
  describe("Funções da model de produto", function () {
    it("Lista todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);

      const result = await model.products.findAll();

      expect(result).to.be.deep.equal(allProductsResponse);
    });

    it("Lista produto por id", async function () {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);

      const result = await model.products.findById(1);

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });

    it("Lista produto por termo", async function () {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);

      const [result] = await model.products.findByTerm("Traje de encolhimento");

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });

    it("Criação de produto", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);

      const insertId = await model.products.create("Produto X");

      expect(insertId).to.be.equal(4);
    });

    it("Atualização de produto", async function () {
      sinon.stub(connection, "execute").resolves([{ changedRows: 1 }]);

      const [message] = await model.products.updateById(1, "Produto X");

      expect(message.changedRows).to.be.equal(1);
    });

    it("Deleta produto por id", async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const [message] = await model.products.remove(1);

      expect(message.affectedRows).to.be.equal(1);
    });

    beforeEach(sinon.restore);
  });
});
