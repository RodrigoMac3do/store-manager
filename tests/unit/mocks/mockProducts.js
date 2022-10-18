/*-------------------------- Products --------------------------*/
const wrongProductBody = {};
const wrongSizeProductBody = { name: "Prod" };
const rightProductBody = { name: "Produto1" };
const allProductsResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];
const productCreateResponse = { id: 4, name: "Produto1" };
const productUpdateBody = { name: "Machado do Thor Stormbreaker" };
const productUpdateExistsNameBody = { name: "Martelo de Thor" };
const productSearchNameResponse = [{ id: 1, name: "Martelo de Thor" }];

module.exports = {
  wrongProductBody,
  wrongSizeProductBody,
  rightProductBody,
  allProductsResponse,
  productCreateResponse,
  productUpdateBody,
  productUpdateExistsNameBody,
  productSearchNameResponse,
};
