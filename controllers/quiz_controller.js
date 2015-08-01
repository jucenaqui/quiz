var models = require('../models/models.js');

// faind quiz by id and return to next middleware 
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
        if(quiz){
        	req.quiz = quiz;
        	next();
        }else{next(new Error("No Existe quizId = " + quizId ))}

	}).catch( function(error){ next(error);});

};


// render quiz/index to show all question
exports.index = function(req, res){
  	models.Quiz.findAll().then( function(quizes) {
          res.render('quizes/index.ejs', { quizes: quizes, errors: [] } );
  	}).catch( function(error) { next(error);})
};


// show question with dates of load middleware above
exports.show = function(req,res){
		res.render('quizes/show', { quiz: req.quiz, errors: [] });	
};

// render the answers
exports.answer = function(req,res){
	var resultado = "Lo lamentamos --"+req.query.respuesta+"-- No es la respuesta Intentalo de Nuevo",
	    resp  = req.query.respuesta.toUpperCase(),//answer to question
	    reque = req.quiz.respuesta.toUpperCase() //answer in database
	 	
	 	if(resp === reque){ resultado = "Excelente "+req.query.respuesta+" Es la Respuesta Correcta";}
		res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};



// build new structure quiz by add question and answer
exports.new = function(req, res){
     var quiz = models.Quiz.build(
          {	pregunta: "Pregunta", respuesta: "Respuesta" });
     res.render('quizes/new', { quiz: quiz, errors: [] } );
};


exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );
    quiz.validate()
    .then(function(err){
    	if(err){
    		res.render('quizes/new', { quiz: quiz, errors: err.errors });
    	}else{
    		quiz
    		.save({fields: ["pregunta", "respuesta"]})
    		.then(function(){
    			res.redirect('/quizes')
    		})
    	}
    });
};   


/*
//create a new question and redirect a /quizes
 exports.create = function(req, res) {
   var quiz = models.Quiz.build( req.body.quiz );
 
  var err = quiz.validate();
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err});
      }
      else
      {
        quiz.save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes')});
      }       
 }; */



// search custom questions
exports.search = function(req,res){
	var buscar = req.query.search;
	    if(buscar){
		    var texto = (buscar || '').replace(" ", "%");
			models.Quiz.findAll({where:["pregunta like ?", '%'+texto+'%'],order:'pregunta ASC'})
			.then(function(quizes){
			res.render('quizes/index', {quizes: quizes, errors: [] });
			}).catch(function(error) { next(error);});
		}else {
			models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', {quizes: quizes, errors: [] });
			}).catch(function(error) { next(error);});
		}
};




