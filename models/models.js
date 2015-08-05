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

  var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
  var Comment = sequelize.import(path.join(__dirname, 'comment'));


  Comment.belongsTo(Quiz);
  Quiz.hasMany(Comment);

  exports.Quiz = Quiz;
  exports.Comment = Comment;

  sequelize.sync().then(function(){
    Quiz.count().then(function(count){
    	if(count === 0){
        Quiz.create({
          pregunta: 'Capital de Italia',
          respuesta: 'Roma',
          tema: "Ocio"
        });
    		Quiz.create({
    			pregunta: 'Capital de españa',
    			respuesta: 'Madrid',
          tema: "Otro"
    		});
        Quiz.create({
          pregunta: 'Capital de Brasil',
          respuesta: 'Rio de Janeiro',
          tema: "tecnologia"
        });
        Quiz.create({
          pregunta: 'Capital de Colombia',
          respuesta: 'Bogota',
          tema: "Ocio"
        });
        Quiz.create({
          pregunta: 'Capital de Argentina',
          respuesta: 'Buenos Aires',
          tema: "ciencia"
        });
        Quiz.create({
          pregunta: 'Capital de Portugal',
          respuesta: 'Lisboa',
          tema: "Otro"
        })
    		.then(function(){console.log("Base de datos inicializada")});
    	}
    });
});