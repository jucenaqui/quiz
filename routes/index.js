var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//  autoload de comandos con quiz:Id
router.param('quizId', quizController.load);

// get /quizes
router.get('/quizes', quizController.index);

// get /quizes/:quizId(\\d+)
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* get /quizes/:quizId(\\d+)/answer*/
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* get /author*/
router.get('/author', function(req,res){
	res.render('author');
});


module.exports = router;
