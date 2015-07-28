  // Postgres DATABASE_URL = postgres://user:password@host:port/database
  // Sqlite DATABASE_URL = sqlite://:@:/
  var path = require('path'),
      Sequelize = require('sequelize'),
      url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/),
      DB_name =  (url[6] || null),
      user =     (url[2] || null),
      pwd =      (url[3] || null),
      protocol = (url[1] || null),
      dialect =  (url[1] || null),
      port =     (url[5] || null),
      host =     (url[4] || null),
      storage = process.env.DATABASE_STORAGE;


  var sequelize = new Sequelize(DB_name, user, pwd,
      {
 		dialect: protocol,
 		protocol: protocol,
 		port: port,
 		host: host,
 		storage: storage,
 		omitNull: true
      }
   );

  var quiz_path = path.join(__dirname, 'quiz');
  var Quiz = sequelize.import(quiz_path);
  exports.Quiz = Quiz;

  sequelize.sync().success(function(){
    Quiz.count().success(function(count){
    	if(count === 0){
    		Quiz.create({
    			pregunta: 'Capital de Italia',
    			respuesta: 'Roma'
    		})
    		.success(function(){console.log("Base de datos inicializada")});
    	}
    });
});