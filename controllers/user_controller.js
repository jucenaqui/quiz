var users = {
	
	admin: { id: 1, username: 'admin', password: '123'},
	cesar: { id: 2, username: 'cesar', password: '456'} 
 };

 exports.autenticar = function(login, password, callback){
 	if(users[login]){
 		if(password === users[login].password){
 			callback(null, users[login]);	
 		}else{
 			callback(new Error("password erróneo"));
 		}
 	}else{
 		callback(new Error("No existe el usuario"));
 	}
 };