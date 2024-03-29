describe('Product management should be usable', function() {
   beforeEach(function () {
      cy.visit('http://localhost:8080/login')
      cy.contains('Login')
      cy.get('#exampleInputEmail1')
        .type('admin@gmail.com')
      cy.get('#exampleInputPassword1')
         .type('admin')
      cy.get('.btn')
         .click()
      cy.wait(1000)
      cy.visit('http://localhost:8080/manageitems')
   })

   it('Should have options to manage stock', function() {
		cy.contains('Product Management')
		cy.contains('Mountain Bike')
		cy.get('.add-product')
			.click()
		cy.get('#CProduct > .container > [placeholder="Enter Name"]')
			.type('Test Product')
		cy.get('#CProduct > .container > [placeholder="Enter Price"]')
			.type('100')
		cy.get('#CProduct > .container > [placeholder="Enter Quantity"]')
			.type('1')
		cy.get('#CProduct > .container > [placeholder="Enter Image Link"]')
			.type('https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg')
		cy.get('#CProduct > .container > #description')
			.type('Yes Indeed')
		cy.get('#CProduct > .container > :nth-child(18)')
			.get('#1')
			.check()
		cy.get('#CProduct > .container > .clearfix > .signupbtn')
			.click()
		cy.contains('Test Product')
		cy.get(':nth-child(10) > :nth-child(5) > .remove')
			.click()
		cy.get(':nth-child(10) > :nth-child(5)')
	   		.should('not.exist')
   })
})
describe('Product pages reflect changes in manager', function() {
	it('Should display added bike in bike page', function () {
		cy.request("POST", "http://localhost:3000/product", {"Name":"Testing Product","Price":"420","Qty":"69","Description":"12345","ImageLink":"https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg","categoryList":["Bikes"]})
		cy.visit('http://localhost:8080/bikes')
		cy.contains('Testing Product')
      cy.visit('http://localhost:8080/login')
      cy.contains('Login')
      cy.get('#exampleInputEmail1')
        .type('admin@gmail.com')
      cy.get('#exampleInputPassword1')
         .type('admin')
      cy.get('.btn')
         .click()
      cy.wait(1000)
      cy.visit('http://localhost:8080/manageitems')
		cy.contains('Testing Product')
			.parent()
			.children()
			.contains('Remove')
			.click()
	})

	it('Should display added accessory in accesory page', function () {
		cy.request("POST", "http://localhost:3000/product", {"Name":"Testing Product2","Price":"420","Qty":"69","Description":"12345","ImageLink":"https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg","categoryList":["Accessories"]})
		cy.visit('http://localhost:8080/accessories')
		cy.contains('Testing Product2')
      cy.visit('http://localhost:8080/login')
      cy.contains('Login')
      cy.get('#exampleInputEmail1')
        .type('admin@gmail.com')
      cy.get('#exampleInputPassword1')
         .type('admin')
      cy.get('.btn')
         .click()
      cy.wait(1000)
      cy.visit('http://localhost:8080/manageitems')
		cy.contains('Testing Product2')
			.parent()
			.children()
			.contains('Remove')
			.click()
	})
})
