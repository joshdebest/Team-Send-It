describe('Services should be viewable', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/services')
      cy.contains('Services & Repairs')
   })

   it('Should list the available services', function() {
		cy.contains('SERVICE PACKAGES')
		cy.contains('BRAKES')
		cy.contains('FRONT END')
		cy.contains('FRAME & FORK')
   })
})
