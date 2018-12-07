describe('Accessories should be present and interactable', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/accessories')
      cy.contains('Accessories')
   })

   it('Should have accessories', function() {
      cy.contains('Continental Gatorskin Folding Road Tire')
   })
	
   it('Should have filters', function() {
   })
})
