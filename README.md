<h2>RESTFUL API SERVICE</h2>
Модель резервации столов 
<br>Table reservation model</br>
<h4>Check in Live!</h4> https://gelatinous-thirsty-option.glitch.me 
<div align="center"><h1>Information about API</h1></div>
<strong>Set the database first!</strong>
<br>
Use GET:&emsp; &emsp;/tables &ensp;to get all tables (sskey=admin)
<br>
&emsp;&emsp; &emsp; &emsp; &emsp; /tables/:num?sskey &ensp; to get table by number (sskey=admin)
<br>
Use POST: &emsp;&ensp;/reserve?num&client&[order] &ensp;num - table number, client - client data, order - menu items(optional) to reserve table 
<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; /database &ensp; to set database
<br>
Use DELETE: &ensp;/tables/[num]?[sskey] &ensp; num - table number to delete reservation
<br>
Use PUT: &nbsp&emsp;&ensp; /tables/[num]?sshkey&[order] &ensp; (sshkey=user *here should be generated key for each user) 
</div>
<br>


![изображение](https://github.com/sonytruelove/REST-API-restaurant-reservation/assets/42536061/b982b7ce-0ed9-417d-b255-6f3cf352fe7b)
![изображение](https://github.com/sonytruelove/REST-API-restaurant-reservation/assets/42536061/d5f68960-c086-44a5-a27a-8dfbb7c51d8b)
![post](https://github.com/sonytruelove/REST-API-restaurant-reservation/assets/42536061/b7ab4812-b5ff-4bc7-88e9-409cacbc3ae3)
![delete](https://github.com/sonytruelove/REST-API-restaurant-reservation/assets/42536061/de106e2a-3ff4-4314-86af-8184fc768311)
