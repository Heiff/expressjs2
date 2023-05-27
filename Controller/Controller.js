const Io = require('../Io')
const Data = new Io('./database/All.json')
const Classes = require('../Classes');


const Register = async (req,res) => {
    
    const { user,pass } = req.body;
    const Database = await Data.read();
    const id = (Database[Database.length - 1]?.id || 0) + 1;
    let yes = true
    if (Database.length === 0) {
      const newData = new Classes(
        id,
        user,
        pass
    )
    await Data.write([newData])
    res.status(201).json({message:'register succes'})
    }
     
  for(let i = 0; i < Database.length; i++)
  {
    if(Database[i].user === user)
    {
      yes = false
      res.status(200).json({message:'bunday user bor'})
    }
  }
  if(yes)
  {
    const newData = new Classes(
     id,
     user,
     pass
    )
    Database.push(newData);
    await Data.write(Database)
    res.status(200).json({message:'succes register'})
  }
}

const Login = async (req,res) => {
  const { user,pass } = req.body;
  const Database = await Data.read();
  let yes = true
  for (let i = 0; i < Database.length; i++) {
    const element = Database[i];
    if (element.user == user && element.pass == pass) {
      res.status(200).json({message:'succes login'})
      yes = false
    }
  }
  if (yes) {
    res.status(400).json({message:'not'})
  }
}


const Delete = async (req,res) => {
  const { id } = req.params;
  const Database = await Data.read();
  if (Database.length > 0) {
    const DataFilter = Database.filter(el => el.id != id)
    const ID = DataFilter.map(el => {
      el.id = parseInt(el.id) - 1
      return el
    })
  await Data.write(ID)
  res.status(200).json({message:'succes deleting'})
  }
  else {
    res.status(400).json({message:'database bosh'})
  }
}

module.exports = { Register,Login,Delete }