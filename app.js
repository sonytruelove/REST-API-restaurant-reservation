var express = require('express'); 
var app = express();
var DB;




var server = app.listen(8081, function () {
    var host = server.address().address 
    var port = server.address().port
    
    console.log(host, port)
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/database', function (req, res) {
  DB=[
  {num:1,reserved:true,order:["pig","chicken"]},
  {num:2,reserved:false,order:[]},
  {num:3,reserved:true,order:["cow","cabbage"]},
  {num:4,reserved:true,order:[]}
];
  res.sendStatus(201);
})
app.post('/reserve', function (req, res) {
    let num = req?.headers?.num;
   let order = (req?.headers?.order)?req.headers.order:[];
   let client = (req?.headers?.client)?req.headers.client:[];
  let reserved=DB.find(table=>table.reserved==false&&table.num==num);
  if(!num){res.status(400);
   res.send("Failed, number undefined");}else{
if(!reserved){
  res.status(400);
   res.send("Failed, table reserved");}
else{
if(client.length)  {
  res.status(201);
  if(order.length){
    res.send("Reserved table "+num+" <br>Your order: "+order)
    DB[num-1]=[num,true,order,client];}
  else{
    DB[num-1]=[num,true,[],client];
  res.send("Reserved table "+num+" without reservation");}
}else{
  res.status(400)
  res.send("Failed, client data undefined");
     }
}}
});

app.get('/', function (req, res) {
 res.sendFile(__dirname + "/client/index.html");
});
app.get('/tables', function (req, res) {
  let auth=req?.query?.sskey;
  if(auth=="admin"){res.status(200);res.send(DB);}
  else {
    res.status(403);
    res.send("You have not permission");
  }
});
app.get('/tables/:num', function (req, res) {
  let auth=req?.query?.sskey;
  let num=req.params.num;
  if(auth=="admin"&&DB.find(table=>table.num==num)){res.status(200);res.send(DB[num-1]);}
  else {
    res.status(403);
    res.send("You have not permission");
  }
});
app.put('/tables/:num', function (req, res) {
 let sshkey=req.query.sshkey;
  let num=req?.params?.num;
  let order=req?.query?.order;
  if(num&&order){
    DB[num-1].order=order;
    res.status(202);
    res.send(req.params.num+" have been updated")}
  else
    {
       res.status(400);
       res.send(req.params.num+" have not been updated")};
});
app.delete('/tables/:num', function (req, res) {
  DB[req.params.num-1]=[];
  res.status(201);
  res.send(req.params.num+" have been deleted")
});

app.use(function(req, res) {
	res.status(404).send('not found');
});


