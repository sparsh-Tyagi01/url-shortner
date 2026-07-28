const express = require("express")
const urlRoute = require("./routes/url")
const { connectToMongo } = require("./connect")
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT

connectToMongo(process.env.MONGO_URI).then(()=>console.log(`MongoDB connected`))

app.use(express.json())
app.use('/url', urlRoute)

app.listen(PORT, ()=>console.log(`Server running on PORT: ${PORT}`))