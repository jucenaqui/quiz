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

// get /quizes
router.get('/quizes', quizController.index);
// get /quizes/:quizId(\\d+)
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* get /quizes/:quizId(\\d+)/answer*/
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);




module.exports = router;
