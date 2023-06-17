
<center><h1>Information about API</h1></center>
<table width="1500" border="1">
Set the database first!
<br>
<tr>
  <td>
Use GET: /tables?[sskey] to get all tables (sskey=admin)
        <br>&emsp;&emsp;&emsp;&emsp; /tables/:num?[sskey] to get table by num (sskey=admin)
  </td></tr><tr> <td>
  Use POST: /reserve?[num]&[client]&[order]    num - table number, client - client data, order - menu items(optional)  to reserve table
           <br> &emsp;&emsp;&emsp; &emsp;/database                          to set database
  </td>
</tr>
  <tr>
    <td>
   Use DELETE: /tables/[num]  num - table number to delete reservation
    </td>
  </tr>
  <tr>
    <td>
  Use PUT: /tables/[num]?[sshkey]&[order]            (sshkey=user  *here should be generated key for each user)
    </td>
  </tr>
</table>
