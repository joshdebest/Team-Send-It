describe('Visit the Webpage', function() {
   it('Should have Announcements & About Us', function() {
      cy.visit('http://localhost:8080')
      cy.contains('Announcements')
      cy.contains('About Us')

      cy.get('#announcements_body')
      .should('be.not.empty')

      cy.get('#about-us_body')
      .should('be.not.empty')
   })
})
