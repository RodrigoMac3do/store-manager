const { expect } = require("chai");
const sinon = require("sinon");
const model = require("../../../src/models");
const service = require("../../../src/services");
const { allSales } = require("../mocks/mockSales");

describe("Testes de unidade da service de sales", function () {
  let stubFindAllSales;
  let stubFindByIdSales;
  let stubRemoveSales;
  let stubCreateSale;
  let stubCreateSales;
  let stubFindByIdProduct;
  let stubUpdateByIdSales;

  beforeEach(() => {
    stubFindAllSales = sinon.stub(model.sales, "findAll");
    stubFindByIdSales = sinon.stub(model.sales, "findById");
    stubRemoveSales = sinon.stub(model.sales, "remove");
    stubFindByIdProduct = sinon.stub(model.products, "findById");
    stubCreateSale = sinon.stub(model.sales, "createSale");
    stubCreateSales = sinon.stub(model.sales, "create");
    stubUpdateByIdSales = sinon.stub(model.sales, "updateById");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Teste para listagem de sales", function () {
    it("Listar todos os sales", async function () {
      stubFindAllSales.resolves(allSales);

      const result = await service.sales.findAll();

      expect(result).to.be.deep.equal(allSales);
    });

    it("Listar sale por id", async function () {
      stubFindByIdSales.resolves(allSales[0]);

      const result = await service.sales.findById(1);

      expect(result).to.be.deep.equal(allSales[0]);
    });

    it("Não lista sale com id que não existe", async function () {
      stubFindByIdSales.resolves([]);

      try {
        await service.sales.findById(0);
      } catch (error) {
        expect(error.status).to.be.deep.equal(404);
        expect(error.message).to.be.deep.equal("Sale not found");
      }
    });
  });

  describe("Teste para criação de sale", function () {
    it("Deve criar uma nova venda com sucesso", async function () {
      const body = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ];

      const mockSaleId = 1;
      const mockProducts = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];

      stubFindByIdProduct.onCall(0).resolves(mockProducts[0]);
      stubFindByIdProduct.onCall(1).resolves(mockProducts[1]);
      stubCreateSale.resolves(mockSaleId);
      stubCreateSales.resolves();

      const result = await service.sales.create(body);

      expect(result).to.deep.equal({
        id: mockSaleId,
        itemsSold: body,
      });
    });

    it("Deve lançar uma exceção se um produto não for encontrado", async function () {
      const body = [{ productId: 1, quantity: 10 }];

      stubFindByIdProduct.resolves(undefined);

      try {
        await service.sales.create(body);
      } catch (error) {
        expect(error.status).to.equal(404);
        expect(error.message).to.equal("Product not found");
      }
    });
  });

  describe("Testes para atualizar um sale", function () {
    it("Deve atualizar uma venda pelo ID com sucesso", async function () {
      const saleId = 1;
      const body = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ];

      const mockProducts = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];

      stubFindByIdSales.resolves(saleId);
      stubFindByIdProduct
        .onCall(0)
        .resolves(mockProducts[0])
        .onCall(1)
        .resolves(mockProducts[1]);

      stubUpdateByIdSales.resolves();

      const result = await service.sales.updateById(saleId, body);

      expect(result).to.deep.equal({
        saleId: saleId,
        itemsUpdated: body,
      });
    });
    it("Deve lançar uma exceção ao atualizar uma venda com produto não encontrado", async function () {
      const saleId = 1;
      const body = [
        { productId: 1, quantity: 10 },
        { productId: 3, quantity: 5 },
      ];

      const mockProducts = [{ id: 1, name: "Product 1" }];

      stubFindByIdSales.resolves(saleId);
      stubFindByIdProduct
        .onCall(0)
        .resolves(mockProducts[0])
        .onCall(1)
        .resolves(undefined);

      stubUpdateByIdSales.resolves();

      try {
        await service.sales.updateById(saleId, body);
      } catch (error) {
        expect(error.status).to.equal(404);
        expect(error.message).to.equal("Product not found");
      }
    });
  });

  describe("Teste para excluir sales", function () {
    it("Deve remover uma venda pelo ID com sucesso", async function () {
      stubFindByIdSales.resolves(allSales[0]);
      stubRemoveSales.resolves([{ affectedRows: 1 }]);

      const [result] = await service.sales.remove(1);

      expect(result.affectedRows).to.be.deep.equal(1);
    });

    it("Deve lançar uma exceção ao tentar remover uma venda inexistente", async function () {
      stubFindByIdSales.resolves([]);

      try {
        await service.sales.remove(1);
      } catch (error) {
        expect(error.status).to.equal(404);
        expect(error.message).to.equal("Sale not found");
      }
    });
  });
});
