const express = require("express")
const PORT = 3000;
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

let usersArray=[];
app.post('/signUp',(req,res)=>{
  let user={
    userId:Math.floor(Math.random()*100),
    userName:req.body.username,
    password:req.body.password,
    firstName:req.body.firstName,
    lastName:req.body.lastName
  }

  for(let i=0;i<usersArray.length;i++){
    if(usersArray[i].userName===user.userName){
      return res.status(400).send("user alrady exits");
    }
  }
  usersArray.push(user);
  res.status(201).send(usersArray);
  console.log(usersArray);
})

app.post('/login',(req,res)=>{
  let userCredentials={
    userName:req.body.username,
    password:req.body.password
  }
  let userFound=false;
  let userDetails=null;
  for(let i=0;i<usersArray.length;i++){
    if(usersArray[i].userName===userCredentials.userName &&
      usersArray[i].password===userCredentials.password){
        userFound=true;
        userDetails=usersArray[i];
        break;
      }
  }
  if(userFound){
    console.log(userDetails);
    res.status(200).send(userDetails)
  }else{
    res.status(401).send("invalid credentials")
  }
})
app.get('/signUp',(req,res)=>{
  let userData={
    userName:req.body.username,
    password:req.body.password,
    firstName:req.body.firstName,
    lastName:req.body.lastName
  
  }  
  res.status(201).send(userData);
  
})
app.get('/data',(req,res)=>{
  let givenUser=req.query.userName;
  let givenPassword=req.query.password;
  let userToSendArray=[]
  let userData=null;
  for(let i=0;i<usersArray.length;i++){
    if(usersArray[i].userName===givenUser &&
      usersArray[i].password===givenPassword){
      userData={
        userName:usersArray[i].userName,
        userId:usersArray[i].userId
    }
    break;
    }
}
if(userData){
  userToSendArray.push(userData);
}

return res.status(200).json(userToSendArray);
})

app.listen(PORT,()=>{
    console.log(`server is up on port ${3000}`);
})