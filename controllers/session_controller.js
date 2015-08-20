var moment = require('moment');

// MW de autorizacion de acesso http
exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};

// GET/login
exports.new = function(req, res){
	var errors = req.session.errors || {} ;
	req.session.errors = {};
	res.render('sessions/news', { errors: errors });
};

// POST/login
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{ "message": 'se ha producido un error'+ error}];
			res.redirect('/login');
			return;
		}

		req.session.user = { id: user.id, username: user.username};
		//req.session.time = moment(new Date());
		res.redirect(req.session.redir.toString());//redirecciona al path anterior a login

	});
};

// GET/logout
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};