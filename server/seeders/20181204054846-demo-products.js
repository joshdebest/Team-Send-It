'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // fill in Categoires data table
    await queryInterface.bulkInsert('Categories', [{
      name: 'Bikes',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Accessories',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mountain',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Racing',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kids',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tools',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Wheels',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tires',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Helmets',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // fill in Products data table
    await queryInterface.bulkInsert('Products', [{
      Name: 'Marin Rock Spring 2 Mountain Bike - Performance Exclusive',
      Price: 599.99,
      Qty: 6,
      Description: "If you're looking for a great bike to get you out on the trail, then look no further than the Marin Rock Spring 2 mountain bike. This great bike is exclusive to Performance Bicycle and offers up a fun, exciting ride a value that anyone can appreciate.",
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/31-7055-GRY-ANGLE.jpg?resize=500px:500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'Marin Hawk Hill 27.5 Mountain Bike - 2018',
      Price: 1399.99,
      Qty: 2,
      Description: 'If you want to take your trail riding to a whole new level, the Marin Hawk Hill 27.5" mountain bike is a great way to do it. By providing excellent performance and value, the Hawk Hill will redefine your expectations on the trail.',
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/31-6715-BLK-ANGLE.jpg?resize=500px:500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'SE Lil Quad 16 BMX Bike - 2017',
      Price: 399.97,
      Qty: 3,
      Description: 'The SE Quad was probably one of the most unique and iconic BMX bikes ever made. So to celebrate their "40 Years of Radness" SE has brought it back in a 16" version.',
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/31-6491-BLU-SIDE.jpg?resize=500px:500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'Giro Savant MIPS Road Helmet - 2018',
      Price: 119.99,
      Qty: 14,
      Description: 'The Savant MIPS bike helmet is a pure blend of the latest safety technology, race-bred style and unmatched value.',
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/40-3512-MBW-ANGLE.JPG?resize=1500px:1500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'Performance MP-3 Helmet',
      Price: 59.99,
      Qty: 20,
      Description: 'The Performance MP-3 helmet keeps your noggin safe and secure with a dual in-mold construction for extra protection during an impact.',
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/40-5476-MBK-ANGLE.jpg?resize=1500px:1500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'Forté Pisgah 2 Tubeless-Ready Mountain Tire',
      Price: 39.99,
      Qty: 10,
      Description: 'Forte Pisgah 2 Tubeless-ready Mountain Tires were developed on some of the toughest trails in the Pisgah National Forest.',
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/50-4180-NCL-ANGLE.jpg?resize=1500px:1500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Name: 'Continental Gatorskin Folding Road Tire',
      Price: 47.99,
      Qty: 6,
      Description: 'High mileage and puncture resistance team up in this fast-rolling, folding road tire from Continental.',
      ImageLink: 'https://media.performancebike.com/images/performance/products/product-hi/50-3307-BLK-ANGLE.jpg?resize=1500px:1500px&output-quality=100',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const categories = await queryInterface.sequelize.query(
      'SELECT id from CATEGORIES;'
    );

    const products = await queryInterface.sequelize.query(
      'SELECT id from PRODUCTS;'
    );

    const categoryRows = categories[0];
    const productRows = products[0];

    // fill in ProductCategories table so products are tied to categories
    await queryInterface.bulkInsert('ProductCategories', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[0].id,
      CategoryId: categoryRows[0].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[0].id,
      CategoryId: categoryRows[2].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[1].id,
      CategoryId: categoryRows[0].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[1].id,
      CategoryId: categoryRows[2].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[2].id,
      CategoryId: categoryRows[0].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[2].id,
      CategoryId: categoryRows[4].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[3].id,
      CategoryId: categoryRows[1].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[3].id,
      CategoryId: categoryRows[8].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[4].id,
      CategoryId: categoryRows[1].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[4].id,
      CategoryId: categoryRows[8].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[5].id,
      CategoryId: categoryRows[1].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[5].id,
      CategoryId: categoryRows[2].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[5].id,
      CategoryId: categoryRows[7].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[6].id,
      CategoryId: categoryRows[1].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[6].id,
      CategoryId: categoryRows[3].id
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: productRows[6].id,
      CategoryId: categoryRows[7].id
    }], {});

    // fill in Orders data table
    await queryInterface.bulkInsert('Orders', [{
      CustomerName: 'Test User',
      Email: 'test@email.com',
      DateOrdered: new Date(),
      TrackingNumber: Math.random().toString(36).substring(7),
      OrderNumber: Math.random().toString(36).substring(7),
      Status: 'Pending',
      Total: 1999.98,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      CustomerName: 'John John',
      Email: 'john@email.com',
      DateOrdered: new Date(),
      TrackingNumber: Math.random().toString(36).substring(7),
      OrderNumber: Math.random().toString(36).substring(7),
      Status: 'Pending',
      Total: 615.94,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const orders = await queryInterface.sequelize.query(
        'SELECT id from ORDERS;'
    );

    const orderRows = orders[0];

    // fill in BillingAddresses data table and associate them with specific order
    await queryInterface.bulkInsert('BillingAddresses', [{
      Street: '1234 test ave',
      City: 'San Luis Obispo',
      State: 'CA',
      Zipcode: '93401',
      OrderId: orderRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Street: '1 Grand Ave',
      City: 'San Luis Obispo',
      State: 'CA',
      Zipcode: '93410',
      OrderId: orderRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    return await queryInterface.bulkInsert('ProductOrders', [{
      Price: 599.99,
      Qty: 1,
      Date: new Date(),
      OrderId: orderRows[0].id,
      ProductId: productRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Price: 1399.99,
      Qty: 1,
      Date: new Date(),
      OrderId: orderRows[0].id,
      ProductId: productRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Price: 399.97,
      Qty: 1,
      Date: new Date(),
      OrderId: orderRows[1].id,
      ProductId: productRows[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Price: 119.99,
      Qty: 1,
      Date: new Date(),
      OrderId: orderRows[1].id,
      ProductId: productRows[3].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Price: 95.98,
      Qty: 2,
      Date: new Date(),
      OrderId: orderRows[1].id,
      ProductId: productRows[6].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductOrders', null, {});
    return queryInterface.bulkDelete('BillingAddresses', null, {});
    return queryInterface.bulkDelete('Orders', null, {});
    return queryInterface.bulkDelete('ProductCategories', null, {});
    return queryInterface.bulkDelete('Categories', null, {});
    return queryInterface.bulkDelete('Products', null, {});
  }
};
