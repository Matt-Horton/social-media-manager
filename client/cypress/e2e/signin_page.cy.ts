describe("Sign In Page", () => {
  it("user is able to sign in", () => {
    cy.visit("/signin");

    cy.get("input[name=username]").type("testuser01@gmail.com");
    cy.get("input[name=password]").type("password123");

    cy.get("form") // yields <form>...</form>
      .contains("form", "Submit") // yields <form>...</form>
      .submit();

    cy.url().should("include", "/dashboard");

    cy.getCookie("accessToken").should("exist");
  });
});
