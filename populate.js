// This file automatically adds the json products in json file to our data base

require("dotenv").config();
const fetch = require('node-fetch')

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");
async function fetchImage(imageName, index, products) {
  console.log(`Fetching image for ${imageName} at index ${index}`);

  let data;
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=36828918-6720ba657fbe0f24c206f394d&q=${imageName}&image_type=photo`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch for ${imageName} - ${response.statusText}`
      );
    }

    data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      console.warn(`No image found for ${imageName}`);
      return; // if there are no hits, we return early
    }

    if (products[index]) {
      products[index].imageUrl = data.hits[0].largeImageURL;
    } else {
      console.error(`No product found at index ${index}`);
    }
  } catch (error) {
    console.error(
      `There was a problem with the fetch operation for ${imageName}:`,
      error.message
    );
  }
}
const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() // delete all the products that are already there
        await Product.create(jsonProducts)
        console.log('suceess')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

async function addImagesToProducts(products) {
  await Promise.all(
    products.map(async (product, index) => {
      await fetchImage(product.name, index, products);
    })
  );
}
async function main() {
  await addImagesToProducts(jsonProducts);
  console.log(jsonProducts);

  // You can uncomment and run your database-related logic here
  // ...
  start()
}
main();

// start()
