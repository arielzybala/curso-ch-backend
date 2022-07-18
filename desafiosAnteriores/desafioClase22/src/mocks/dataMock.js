const { faker } = require('@faker-js/faker/locale/es');




module.exports.createMocks = ( cant , mocks ) => {
    for(let i = 0; i < cant; i++ ){
        mocks.push({
            name:  faker.vehicle.model(),
            brand: faker.vehicle.manufacturer(),
            price: faker.commerce.price(15000, 200000),
            image: faker.image.imageUrl(300,300,'luxuryCar',true)
        }
        )
    }
}
