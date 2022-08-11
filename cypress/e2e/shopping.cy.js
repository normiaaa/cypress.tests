describe("Shopping Flows E2E", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
    cy.fixture("texts.json").then((texts) => {
      cy.getByTestID("username").should("be.visible").type(texts.USERNAME);
      cy.getByTestID("password").should("be.visible").type(texts.PASSWORD);
      cy.getByTestID("login-button").should("be.visible");
      cy.getByTestID("login-button").click();
    });
  });

  it("Add two products to the cart", () => {
    cy.fixture("texts.json").then((texts) => {
      cy.get("#item_4_title_link > .inventory_item_name").should("be.visible");
      cy.get("#item_4_title_link > .inventory_item_name").should(
        "have.text",
        texts.ITEM1
      );

      cy.get(
        ":nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price"
      ).should("be.visible");
      cy.get(
        ":nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price"
      ).should("have.text", texts.PRICE_ITEM1);

      cy.getByTestID("add-to-cart-sauce-labs-backpack").should("be.visible");
      cy.getByTestID("add-to-cart-sauce-labs-backpack").click();

      cy.get("#item_5_title_link > .inventory_item_name").should("be.visible");
      cy.get("#item_5_title_link > .inventory_item_name").should(
        "have.text",
        texts.ITEM2
      );

      cy.get(
        ":nth-child(4) > .inventory_item_description > .pricebar > .inventory_item_price"
      ).should("be.visible");
      cy.get(
        ":nth-child(4) > .inventory_item_description > .pricebar > .inventory_item_price"
      ).should("have.text", texts.PRICE_ITEM2);

      cy.getByTestID("add-to-cart-sauce-labs-fleece-jacket").should(
        "be.visible"
      );
      cy.getByTestID("add-to-cart-sauce-labs-fleece-jacket").click();

      cy.get(".shopping_cart_badge").should("be.visible");
      cy.get(".shopping_cart_badge").click();

      cy.url().should("include", "/cart");

      cy.get("#item_4_title_link > .inventory_item_name").should("be.visible");
      cy.get("#item_4_title_link > .inventory_item_name").should(
        "have.text",
        texts.ITEM1
      );

      cy.get("#item_5_title_link > .inventory_item_name").should("be.visible");
      cy.get("#item_5_title_link > .inventory_item_name").should(
        "have.text",
        texts.ITEM2
      );
    });
  });

  it("Remove products from the card", () => {
    cy.fixture("texts.json").then((texts) => {
      cy.getByTestID("add-to-cart-sauce-labs-backpack").click();
      cy.getByTestID("add-to-cart-sauce-labs-fleece-jacket").click();
      cy.get(".shopping_cart_badge").click();

      cy.url().should("include", "/cart");

      cy.get("#item_4_title_link > .inventory_item_name").should("be.visible");
      cy.get("#item_4_title_link > .inventory_item_name").should(
        "have.text",
        texts.ITEM1
      );

      cy.get("#item_5_title_link > .inventory_item_name").should("be.visible");
      cy.get("#item_5_title_link > .inventory_item_name").should(
        "have.text",
        texts.ITEM2
      );

      cy.getByTestID('remove-sauce-labs-backpack').should("be.visible");
      cy.getByTestID('remove-sauce-labs-backpack').click();

      cy.get('#item_4_title_link > .inventory_item_name').should('not.exist');
      cy.get("#item_5_title_link > .inventory_item_name").should("be.visible");

      cy.getByTestID('remove-sauce-labs-fleece-jacket').should("be.visible");
      cy.getByTestID('remove-sauce-labs-fleece-jacket').click();

      cy.get('#item_5_title_link > .inventory_item_name').should('not.exist');

      cy.getByTestID('remove-sauce-labs-fleece-jacket').click();
    });
  });
});
