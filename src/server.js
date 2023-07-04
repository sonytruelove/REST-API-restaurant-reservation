const bodyParser =require('body-parser')
const express = require('express'); 
const app = express(); 
app.use(bodyParser.json());
const path = require('path'); 
const router = express.Router(); 
var DB= {
        
      dishes:{
        breakfasts:{
          omelete:{src:"https://www.onceuponachef.com/images/2021/12/Omelette-1200x1626.jpg",title:"Omelette",price:"1",kcal:"50"},
          bruschetta:{src:"https://images.ctfassets.net/uw7yiu2kuigc/4POzi2JXwHJglZx7kX4AIJ/d3e3b37c811d08c2f28bc80b385f2f73/Avocado-Bruschetta-Lead.jpg",title:"Bruschetta with avacado",price:"1.35",kcal:"70"},
          salad:{src:"https://www.seriouseats.com/thmb/Fi_FEyVa3_-_uzfXh6OdLrzal2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-caesar-salad-recipe-06-40e70f549ba2489db09355abd62f79a9.jpg",title:"Chaesar Salad",price:"2.4",kcal:"100"}
        },
        lunches:{
      pig:{src:"https://www.gastronom.ru/binfiles/images/20170731/b468b30f.jpg",title:"Baked Pork",price:"6",kcal:"200"},
      fish:{src:"https://1000worldrecipes.com/images/recipes/grilled-herring-with-baked-vegetables/b2a5ab3b.jpg",title:"Baked Omul",price:"4.5",kcal:"134"},
      cow:{src:"https://takrecipe.com/wp-content/uploads/2022/10/beef-steak-recipe.jpg",title:"Beef Stake R",price:"9.5",kcal:"134"},
      pizza:{src:"https://eda.ru/img/eda/c390x390/s1.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg",title:"Pipperoni",price:"5",kcal:"100"},
      burger:{src:"https://eda.ru/img/eda/c390x390/s1.eda.ru/StaticContent/Photos/121124234750/131219150003/p_O.jpg",title:"Burger",price:"2",kcal:"150"}
        },
        drinks:{
          lemonade:{src:"https://s0.rbk.ru/v6_top_pics/media/img/6/59/346820747286596.webp",title:"Lemonade",price:"1",kcal:"0"},
          tea:{src:"https://www.nmamilife.com/wp-content/uploads/2020/07/29-now-blog.jpg",title:"Tea",price:"0.5",kcal:"0"},
          coffee:{src:"https://static.toiimg.com/photo/89078867.cms",title:"Cappuccino",price:"2",kcal:"0"},
          pepsi:{src:"https://www.retail.ru/upload/medialibrary/f1a/shutterstock_1481415659.jpg",title:"Pepsi",price:"1",kcal:"0"},
          juice:{src:"https://insanelygoodrecipes.com/wp-content/uploads/2021/10/Delicious-Fruit-Juices-Orange-Kiwi-and-Strawberry.jpg",title:"Juice",price:"1",kcal:"0"}
        }
    },
    tables:{
    1:{num:1,reserved:true,order:["pig","chicken"],client:{"name":"Boris1"},price:2},
  2:{num:2,reserved:false,order:[],client:[],price:2},
  3:{num:3,reserved:false,order:[],client:[],price:2},
  4:{num:4,reserved:true,order:[],client:{"name":"Boriss"},price:1},
  5:{num:5,reserved:false,order:[],client:[],price:1},
  6:{num:6,reserved:true,order:[],client:{"name":"Kolya"},price:1}
         }}



app.get('/dishes', function (req, res) {
  res.status(200);
  res.send(DB.dishes);
})
app.get('/tables', function (req, res) {
  //Check privilege or send tables without order and client data
  res.status(200);
  res.send(DB.tables);
});
app.get('/tables/:num', function (req, res) {
  let auth=req?.query?.sskey;
  let num=req.params.num;
  if(auth=="admin"&&DB.tables.find(table=>table.num==num)){res.status(200);res.send(DB.tables[num]);}
  else {
    res.status(403);
    res.send("You have not permission");
  }
});
app.post('/reserve',function (req, res) {
   let order = (req?.body?.dishes)?Object.entries(req.body.dishes):[];
   const client = (req?.body?.client)?Object.keys(req.body.client):[];
  const order_tables=Object.entries(req.body.tables);
  let isReserved=false;
  let num=[];
      order_tables.forEach(function(table){
   isReserved=isReserved||DB.tables[table[0]].reserved
          num += table[0];
  })
  if(!isReserved){
  if(!num){res.status(400);
   res.send("Failed, number undefined");}else{
if(client.length)  {
  res.status(201);
  if(order.length){
    order=JSON.stringify(order);
    order_tables.forEach(function(table){
      num=table[0];
      DB.tables[num]={"num":num,"reserved":true,"order":order,"price":table[1].price};         
    })
    
    res.send(order);
  }
  else{
     order_tables.forEach(function(table){
      num=table[0];
      DB.tables[num]={"num":num,"reserved":true,"order":[],"price":table[1].price};
    })
  res.send({});}
}else{
  res.status(400)
  res.send("Failed, client data undefined");
     }
   }
}else{
   res.status(400)
  res.send("Failed, tables already reserved");
}});
app.put('/tables/:num', function (req, res) {
 let sshkey=req?.query?.sshkey;
  let num=req?.params?.num;
  let order=JSON.stringify(req?.query?.order);
  if(num&&order){
    DB.tables[num].order=order;
    res.status(202);
    res.send(req.params.num+" have been updated")}
  else
    {
       res.status(400);
       res.send(req.params.num+" have not been updated")};
});
app.delete('/tables/:num', function (req, res) {
  let sskey=req?.query?.sskey;
  if(sskey!="admin"){res.status(403);res.send("You have not permission")}else{
  DB.tables[req.params.num]={num:req.params.num,reserved:false,order:[],client:[],price:DB.tables[req.params.num].price};
  res.status(201);
  res.send(req.params.num+" have been deleted")}
});
router.get('/api-info', function(req, res) { 
    res.sendFile(path.join(__dirname + '/api-info.html')); 
}); 
router.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + '/index.html')); 
}); 
app.use('/', router); 
app.use(express.static(__dirname));
app.listen(process.env.port || 3000); 
console.log('Running at Port 3000'); 