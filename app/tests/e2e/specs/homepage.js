describe('Visit the Webpage', function() {
   it('Should have Announcements', function() {
      cy.visit('http://localhost:8080')
      cy.contains('Announcements')
      cy.get('#announcements_body')
      .should('be.not.empty')
   })

   it('Should be edittable by Admin', function() {
      // State needs to bet set to be admin
   })

   it('Should have About Us', function() {
      cy.visit('http://localhost:8080')
      cy.contains('About Us')
      cy.get('#about-us_body')
      .should('be.not.empty')
   })

})
