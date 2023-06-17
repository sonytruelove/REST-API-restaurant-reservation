Модель резервации столов 
<br>Table reservation model</br>
<div align="center"><h1>Information about API</h1></div>
<strong>Set the database first!</strong>
<br>
Use GET:&emsp; &emsp;/tables?[sskey] &ensp;to get all tables (sskey=admin)
<br>
&emsp;&emsp; &emsp; &emsp; &emsp; /tables/:num &ensp; to get table by number
<br>
Use POST: &emsp;&ensp;/reserve?[num]&[client]&[order] &ensp;num - table number, client - client data, order - menu items(optional) to reserve table 
<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; /database &ensp; to set database
<br>
Use DELETE: &ensp;/tables/[num] &ensp; num - table number to delete reservation
<br>
Use PUT: &nbsp&emsp;&ensp; /tables/[num]?[sshkey]&[order] &ensp; (sshkey=user *here should be generated key for each user) 
</div>
<br>
<em>Post working on request attributes, not in body</em>
<br>
