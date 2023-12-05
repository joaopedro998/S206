/// <reference types="cypress" />
function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

// Descrevendo o conjunto de testes
describe('Testes no Computer Database', () => {

  // Teste positivo: Adicionar um computador
  it('Deve adicionar um computador com sucesso', () => {
  cy.visit('https://computer-database.gatling.io/computers');
  cy.get('#add').click();
  const computerName = `Computer-${generateRandomNumber()}`;
  cy.get('#name').type(computerName);
  cy.get('#introduced').type('2022-01-01');
  cy.get('#discontinued').type('2023-01-01');
  cy.get('#company').select('RCA');
  cy.contains('input', 'Create this computer').click();
  cy.get('.alert-message.warning').should('contain.text', /Done\s*!\s*Computer Computer-\d+ has been created/);
});

  // Teste positivo: Editar um computador
  it('Deve editar um computador com sucesso', () => {
    cy.visit('https://computer-database.gatling.io/computers');
    cy.get('table tbody tr').first().find('td a').click();
    const editedComputerName = `Edited-Computer-${generateRandomNumber()}`;
    cy.get('#name').clear().type(editedComputerName);
    cy.contains('input', 'Save this computer').click();
    cy.get('.alert-message.warning').should('have.text', `Done! Computer ${editedComputerName} has been updated`);
  });

  // Teste negativo: Tentar excluir um computador que não existe
  it('Deve mostrar mensagem de erro ao tentar excluir um computador inexistente', () => {
    cy.visit('https://computer-database.gatling.io/computers');
    cy.get('#delete-this-computer').click();
    cy.get('.alert-message.error').should('have.text', 'Not found');
  });
  after(() => {
    // Executar o comando mochawesome-merge para mesclar os relatórios
    cy.exec('npx mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mochawesome.json')
      .its('code').should('eq', 0);
  
    // Executar o comando mochawesome-report-generator para gerar o relatório HTML
    cy.exec('npx mochawesome-report-generator cypress/reports/mochawesome.json --report-dir cypress/reports/html')
      .its('code').should('eq', 0);
  });

});
