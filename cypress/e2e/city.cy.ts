describe("Search and Add City to Favorites", () => {
  it("searches a city, adds it to favorites, and confirms it appears on the homepage", () => {
    cy.visit("/");

    cy.get('button[data-testid="search-button"]').click();

    cy.get('input[placeholder="Search cities..."]', { timeout: 10000 })
      .should("be.visible")
      .type("Cairo");

    cy.get('[role="option"]', { timeout: 10000 }).first().click();

    cy.url().should("include", "/city/");
    cy.contains("Cairo").should("be.visible");

    cy.get('[data-testid="add-to-favorites"]').should("exist").click();

    cy.visit("/");

    cy.contains("Favorites").should("exist");
    cy.contains("Cairo").should("exist");
  });
});
