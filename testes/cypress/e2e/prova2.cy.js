// Arquivo de teste: teste.spec.js
/// <reference types="cypress" />

// Função para gerar um número aleatório para ser utilizado no teste
function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

// Descrevendo o conjunto de testes
describe('Testes no Computer Database', () => {

  // Teste positivo: Adicionar um computador
 // Teste positivo: Adicionar um computador
  it('Deve adicionar um computador com sucesso', () => {
  // Acessar a página principal
  cy.visit('https://computer-database.gatling.io/computers');
  // Clicar no botão para adicionar um novo computador
  cy.get('#add').click();
  // Preencher o formulário para adicionar um computador
  const computerName = `Computer-${generateRandomNumber()}`;
  cy.get('#name').type(computerName);
  cy.get('#introduced').type('2022-01-01');
  cy.get('#discontinued').type('2023-01-01');
  cy.get('#company').select('RCA');
  // Clicar no botão para criar o computador
  cy.contains('input', 'Create this computer').click();
  // Verificar se a mensagem de sucesso é exibida
  cy.get('.alert-message.warning').should('contain.text', /Done\s*!\s*Computer Computer-\d+ has been created/);
});

  // Teste positivo: Editar um computador
  it('Deve editar um computador com sucesso', () => {
    // Acessar a página principal
    cy.visit('https://computer-database.gatling.io/computers');
    // Clicar no link para editar o primeiro computador da lista
    cy.get('table tbody tr').first().find('td a').click();
    // Editar o nome do computador
    const editedComputerName = `Edited-Computer-${generateRandomNumber()}`;
    cy.get('#name').clear().type(editedComputerName);
    // Clicar no botão para salvar as alterações
    cy.contains('input', 'Save this computer').click();
    // Verificar se a mensagem de sucesso é exibida
    cy.get('.alert-message.warning').should('have.text', `Done! Computer ${editedComputerName} has been updated`);
  });

  // Teste negativo: Tentar excluir um computador que não existe
  it('Deve mostrar mensagem de erro ao tentar excluir um computador inexistente', () => {
    // Acessar a página principal
    cy.visit('https://computer-database.gatling.io/computers');
    // Clicar no botão para excluir um computador inexistente
    cy.get('#delete-this-computer').click();
    // Verificar se a mensagem de erro é exibida
    cy.get('.alert-message.error').should('have.text', 'Not found');
  });

});
