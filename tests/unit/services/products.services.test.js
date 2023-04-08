const { expect } = require("chai");
const sinon = require("sinon");
const model = require("../../../src/models");
const service = require("../../../src/services");
const { allProductsResponse } = require("../mocks/mockProducts");

describe("Testes de unidade da service de produtos", function () {
  beforeEach(sinon.restore);

  describe("Teste para listagem de produtos", function () {
    it("Listar todos os produtos", async function () {
      sinon.stub(model.products, "findAll").resolves(allProductsResponse);

      const result = await service.products.findAll();

      expect(result).to.be.deep.equal(allProductsResponse);
    });

    it("Listar produto por id", async function () {
      sinon.stub(model.products, "findById").resolves(allProductsResponse);

      const [result] = await service.products.findById(1);

      expect(result).to.be.deep.equal(allProductsResponse[0]);
    });

    it("Listar produto por termo", async function () {
      sinon.stub(model.products, "findByTerm").resolves([allProductsResponse]);

      const [result] = await service.products.findByTerm(
        "Traje de encolhimento"
      );

      expect(result[1]).to.be.deep.equal(allProductsResponse[1]);
    });

    it("Listar produto por termo inexistente", async function () {
      sinon.stub(model.products, "findByTerm").resolves([]);

      const result = await service.products.findByTerm("Traje do Batman");

      expect(result).length(0);
      expect(result).to.be.deep.equal([]);
    });

    it("Listar produto sem passar termo", async function () {
      sinon.stub(model.products, "findByTerm").resolves(allProductsResponse);

      const result = await service.products.findByTerm();

      expect(result).to.be.equal(allProductsResponse);
    });

    it("Listar produto por id inexistente", async function () {
      sinon.stub(model.products, "findById").resolves();

      try {
        await service.products.findById(0);
      } catch (error) {
        expect(error.status).to.be.deep.equal(404);
        expect(error.message).to.be.deep.equals("Product not found");
      }
    });
  });

  describe("Teste para criação de produtos", function () {
    it("Criar produtos", async function () {
      sinon.stub(model.products, "create").resolves(4);

      const result = await service.products.create({ name: "Produto X" });

      expect(result).to.be.deep.equal({ id: 4, name: "Produto X" });
    });
  });

  describe("Teste para atualização de produtos", function () {
    it("Criar produtos", async function () {
      sinon.stub(model.products, "updateById").resolves([{ changedRows: 1 }]);
      sinon
        .stub(model.products, "findById")
        .resolves({ id: 1, name: "Produto Y" });

      await service.products.updateById(1, "Produto Y");

      const result = await service.products.findById(1);

      expect(result).to.be.deep.equal({ id: 1, name: "Produto Y" });
    });
  });

  describe("Teste para excluir produtos", function () {
    it("Deleta produto por id", async function () {
      sinon.stub(model.products, "remove").resolves({
        affectedRows: 1,
      });

      const result = await service.products.remove(1);

      expect(result.affectedRows).to.be.deep.equal(1);
    });
  });
});
