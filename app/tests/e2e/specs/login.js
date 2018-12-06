describe('Login should be usable', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/login')
      cy.contains('Login')
   })

   it('Should login with valid credentials', function() {
      cy.get('#exampleInputEmail1')
        .type('admin@gmail.com')
      cy.get('#exampleInputPassword1')
         .type('admin')
      cy.get('.btn')
         .click()
      cy.wait(1000)
		cy.contains('Welcome to the Admin/Employee Page!')
   })

   it('Should not login with invalid credentials', function() {
      cy.get('#exampleInputEmail1')
        .type('dootdoot@gmail.com')
      cy.get('#exampleInputPassword1')
         .type('notarealaccountpasswordpizza123')
      cy.get('.btn')
         .click()
      cy.wait(1000)
		cy.contains('Incorrect Email or Password')
   })
})
