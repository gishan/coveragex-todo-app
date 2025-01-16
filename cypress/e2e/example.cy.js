describe("My First Test", () => {
  it("Visits the app", () => {
    cy.visit("/");
    cy.contains("Todo Application");
  });
});
