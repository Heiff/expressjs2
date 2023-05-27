const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const routers = require('./Router/Router')

app.use(express.json())
app.use("/api",routers)


app.listen(PORT,()=>{
    console.log(PORT);
})

