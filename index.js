const express = require('express');
require('dotenv').config();
const fs = require('fs').promises
const Io = require('./Io')
const Data = new Io('./database/All.json')
const Classes = require('./Classes');


const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.get('/', async (req,res)=>{
    const Database = await Data.read()
    res.status(201).json(Database.length > 0 ? {GET:Database} : {message :"hc nma yo skladda"})
})
app.post('/', async (req,res)=>{
    const { name,num } = req.body;
    const Database = await Data.read();
    const id = (Database[Database.length - 1]?.id || 0) + 1;
    let yes = true
    if (Database.length === 0) {
      const newData = new Classes(
        id,
        name,
        num
    )
    await Data.write([newData])
    res.status(201).json({POST:[newData]})
    }
     
  for(let i = 0; i < Database.length; i++)
  {
    if(Database[i].name === name)
    {
      yes = false
      Database[i].num += num
      await Data.write(Database)
      res.status(200).json({POST:Database})
    }
  }
  if(yes)
  {
    const newData = new Classes(
     id,
     name,
     num
    )
    Database.push(newData);
    await Data.write(Database)
    res.status(200).json({POST:Database})
  }
})

// const { name,num,id } = req.body;
// const Database = await Data.read();
// const userid = Database[id - 1];
// name ? (userid.name = name) : userid.name 
// num ? (userid.num = num) : userid.num
// await Data.write(Database)
// res.status(201).json(Database)

app.put('/', async (req,res)=>{
    const { name,num,id } = req.body;
    const Database = await Data.read();
    const userid = Database[id - 1];
    let yes = true;
    for (let i = 0; i < Database.length; i++) {
        if (Database[i].name === name) {
        yes = false;
        Database[i].num += num
        await Data.write(Database)
        }     
    }
    if (yes) {
        name ? (userid.name = name) : userid.name 
        num ? (userid.num = num) : userid.num
        await Data.write(Database)
    }
    res.status(201).json({PUT:Database})
    
})
app.delete('/',async (req,res)=>{
    const { id } = req.body;
    const Database = await Data.read();
    const deleting = Database.splice(id - 1,1);
    await Data.write(Database)
    res.status(200).json({Delete:deleting})
})

app.listen(PORT,()=>{
    console.log(PORT);
})

