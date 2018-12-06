describe('Bikes should be present and interactable', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/bikes')
      cy.contains('Bikes')
   })

   it('Should have bikes', function() {
      cy.contains('Marin Rock Spring 2 Mountain Bike - Performance Exclusive')
   })
	
	it('Should have filters', function() {
	})
})
