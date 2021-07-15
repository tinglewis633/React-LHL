describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  //   it("should navigate to Tuesday", () => {
  //     cy.visit("/");

  //     cy.contains("li", "Tuesday").click();
  //   });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("li", "Tuesday").click();
  });
});
