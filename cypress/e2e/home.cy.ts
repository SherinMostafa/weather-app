describe("Home Page", () => {
  it("successfully loads and displays weather UI elements", () => {
    cy.visit("/");

    cy.contains("My Location").should("be.visible");

    cy.get('[data-testid="current-weather-card"]').should("exist");
    cy.get('[data-testid="hourly-temperature-card"]').should("exist");
    cy.get('[data-testid="weather-details-card"]').should("exist");
    cy.get('[data-testid="weather-forecast-card"]').should("exist");
  });
});
