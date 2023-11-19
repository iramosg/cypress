/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
    cy.get("#firstName").type("Igor");
    cy.get("#lastName").type("Ramos");
    cy.get("#email").type("igorteste@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get("button[type='submit']").click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida", function () {
    cy.get("#firstName").type("Igor");
    cy.get("#lastName").type("Ramos");
    cy.get("#email").type("igortestegmail.com");
    cy.get("#open-text-area").type("Teste");
    cy.get("button[type='submit']").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Igor");
    cy.get("#lastName").type("Ramos");
    cy.get("#email").type("igorteste@gmail.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Teste");
    cy.get("button[type='submit']").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Igor")
      .should("have.value", "Igor")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Ramos")
      .should("have.value", "Ramos")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("igorteste@gmail.com")
      .should("have.value", "igorteste@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1234567890")
      .should("have.value", "1234567890")
      .clear()
      .should("have.value", "");
  });

  it.only("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });
});
