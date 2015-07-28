var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* get /author*/

router.get('/author', function(req,res){
	res.render('author');
});

/* get /quizes/question*/
router.get('/quizes/question', quizController.question);
/* get /quizes/answer*/
router.get('/quizes/answer', quizController.answer);




module.exports = router;
