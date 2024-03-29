describe('Cart should be interactable', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/accessories')
		cy.wait(2500)
   })

   it('Should add an item when "add to cart"', function() {
      cy.visit('http://localhost:8080/bikes')
      cy.get(':nth-child(1) > .card > .card-body > .row > .btn')
	   .click()
      cy.get('[data-toggle="modal"]')
	   .contains('Cart (1)')
   })

   it('Should bring up an empty cart when "cart"', function() {
      cy.visit('http://localhost:8080/bikes')
      cy.get('[data-toggle="modal"]')
	   .click()
      cy.get('tr > :nth-child(3)')
	   .contains('0')
      cy.get('.close')
	   .click()
   })
  
   it('Should bring up an item in cart when "cart"', function() {
      cy.visit('http://localhost:8080/bikes')
      cy.get(':nth-child(1) > .card > .card-body > .row > .btn')
	   .click()
      cy.get('[data-toggle="modal"]')
	   .click()
      cy.get('tbody > :nth-child(1) > :nth-child(1)')
	   .contains('Marin Rock')
      cy.get('tbody > :nth-child(2) > :nth-child(3)')
	   .contains('$599.99')
      cy.get('.close')
	   .click()
   })

   it('Should remove an item from cart when "x"', function() {
      cy.visit('http://localhost:8080/bikes')
      cy.get(':nth-child(1) > .card > .card-body > .row > .btn')
	   .click()
      cy.get('[data-toggle="modal"]')
	   .click()
      cy.get('tbody > :nth-child(1) > :nth-child(1)')
	   .contains('Marin Rock')
      cy.get('tbody > :nth-child(2) > :nth-child(3)')
	   .contains('$599.99')
      cy.get('tbody > :nth-child(1) > :nth-child(4) > .btn')
	   .click()
      cy.get('tr > :nth-child(3)')
	   .contains('0')
      cy.get('.close')
	   .click()
   })

   it('Should redirect to cart when "Check Out" and allow checking out', function() {
      cy.visit('http://localhost:8080/bikes')
      cy.get(':nth-child(1) > .card > .card-body > .row > .btn')
	   .click()
      cy.get('[data-toggle="modal"]')
	   .click()
      cy.get('tbody > :nth-child(1) > :nth-child(1)')
	   .contains('Marin Rock')
      cy.get('tbody > :nth-child(2) > :nth-child(3)')
	   .contains('$599.99')
      cy.get('.modal-footer > .btn-primary')
      	   .click()
		cy.wait(1000)
      cy.url().should('include', '/checkout')
      cy.get('tbody > :nth-child(2) > :nth-child(3)')
	   	.contains('$599.99')
		cy.get(':nth-child(2) > #InputName')
			.type('Jeff Bridges')
		cy.get(':nth-child(3) > #InputEmail')
			.type('jbridge@gmail.com')
		cy.get('#InputAddress')
			.type('Yes canyon drive')
		cy.get(':nth-child(5) > #InputEmail')
			.type('Bal Boly')
		cy.get('#InputState')
			.type('CA')
		cy.get('#InputZipcode')
			.type('93410')
		cy.get('#InputCardNum')
			.type('1234 5678 9101 1121')
		cy.get('#InputSecurity')
			.type('314')
		cy.get(':nth-child(4) > #InputName')
			.type('Jefe Brihess')
		cy.get('#InputExpiration')
			.type('Never')
		cy.get('.btn-success')
			.click()
		cy.wait(1000)
		cy.contains('Successfully Placed!')
   })
})
