require('dotenv').config() // access to environment variables in .env file



// async errors
require('express-async-errors') // is a substitute for try catch blocks


const express = require('express') // importing express
const app = express(); // creating an instance of express app

app.use(express.static('./eshopping-front-end')) // to serve data to public folder

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// error handling functions imported from middleware folder
const notFoundMiddleware = require('./middleware/error-handler')

const errorMiddleware = require('./middleware/error-handler')


const cors = require('cors');

app.use(cors());

// middleware
app.use(express.json())

// routes

// app.get('/',(req,res) => {
//     res.send('<h1>Store API</h1><a href = "/api/v1/products">products route</a>')
// })

app.use('/api/v1/products',productsRouter)

// products route
// uses these error handling functions on different routes
app.use(notFoundMiddleware) 
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () =>{ // connect db function returns a promise
    try{
        // connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening port ${port}...`))
    }catch(error){
        console.log(error)
    }
}
start()