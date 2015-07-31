var models = require('../models/models.js');


exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
        if(quiz){
        	req.quiz = quiz;
        	next();
        }else{ next(new Error("No Existe quizId = " + quizId )); }

	}).catch( function(error){ next(error); })

};


exports.index = function(req, res){
  	models.Quiz.findAll().then( function(quizes) {
          res.render('quizes/index', { quizes: quizes } );
  	}).catch( function(error) { next(error); })
};

exports.search = function(req,res){
	var buscar = req.query.search;
	    if(buscar){
		    var texto = (buscar || '').replace(" ", "%");
			models.Quiz.findAll({where:["pregunta like ?", '%'+texto+'%'],order:'pregunta ASC'})
			.then(function(quizes){
			res.render('quizes/index', {quizes: quizes});
			}).catch(function(error) { next(error);});
		}else {
			models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', {quizes: quizes});
			}).catch(function(error) { next(error);});
		}
};

// get /quizes/show
exports.show = function(req,res){
		res.render('quizes/show', { quiz: req.quiz });	
};

// get /quizes/answer
exports.answer = function(req,res){
	var resultado = "Lo lamentamos --"+req.query.respuesta+"-- No es la respuesta Intentalo de Nuevo",
	    resp  = req.query.respuesta.toUpperCase(),//answer to question
	    reque = req.quiz.respuesta.toUpperCase() //answer in database
	 	
	 	if(resp === reque){ resultado = "Excelente "+req.query.respuesta+" Es la Respuesta Correcta";}
		res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado });
};