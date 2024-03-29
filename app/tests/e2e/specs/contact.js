describe('Navigate to Contact Form', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/contact')
      cy.contains('Contact Us')
   })

   it('Should have form fields', function() {
      cy.get('#name')
      .should('be.empty')
      cy.get('#email')
      .should('be.empty')
      cy.get('#phone')
      .should('be.empty')
      cy.get('#message')
      .should('be.empty')
      cy.get('.btn')
      .should('be.visible')
   })

   it('Should verify fields', function() {
      // error out if form isn't filled out
      cy.get('.btn')
      .click()
      cy.get('#name_validation')
      cy.get('#email_validation')
      cy.get('#phone_validation')
      cy.get('#message_validation')
   })

   it('Should submit the form', function() {
      cy.get('#name')
      .type('Spaghetti Joe')
      .should('have.value', 'Spaghetti Joe')
      cy.get('#email')
      .type('spagetjoe@marinara.com')
      .should('have.value', 'spagetjoe@marinara.com')
      cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      cy.get('#message')
      .type('Do you have noods? Pls.')
      .should('have.value', 'Do you have noods? Pls.')
      cy.get('.btn')
      .click()
   })
})
