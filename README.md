
@authdor 
@ugrerdl mongodb nodejs express skeleton


/api/users
post  *all users res
-token require

/api/authenticate
post -login res token
-token not necessary
-username and password require

/api/users/create
post -register 
-username password admin require


/api/users/:id

put
 @pram  : id
 header : password
 
delete 
 @pram  : id
 header : password
