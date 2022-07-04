const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c2df3b36dc769f88ee6cbb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmyfkzs5e/image/upload/v1656859952/YelpCamp/lh33cwzdambeapsaj0le.jpg',
                    filename: 'YelpCamp/plicqav4dwxgavse77e9',
                },
                {
                    url: 'https://res.cloudinary.com/dmyfkzs5e/image/upload/v1656859895/YelpCamp/klhxbclkz9vsenlwfjmn.jpg',
                    filename: 'YelpCamp/iphe6pvuzay2sqtw3mrp',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ab tenetur perspiciatis repellat maiores illum quaerat incidunt modi, autem ipsa dignissimos magni earum magnam? Sapiente molestias aut laboriosam explicabo assumenda!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})