const express = require("express")
const app = express()
const port = process.env.port || 3000
const morgan = require("morgan")
const helmet = require("helmet")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const { application } = require("express")
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true},()=>{
    console.log("Connected to MongoDB");
});
//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(port,()=>{
    console.log("Server is up on port " + port);
})