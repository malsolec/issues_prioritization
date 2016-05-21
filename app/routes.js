var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var IssueScore = mongoose.model('IssueScore');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

function connectToGithub(req) {

	var request = require('request');

 	var agent = req.split("/")[4];
	var options = {
		url: req,
	  headers: {
		'User-Agent': agent
	  }
	};

	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {


		  var obj = JSON.parse(body);

		  var projectAlias = req.split("/")[5];
		  var project = new Project({
			  alias : projectAlias,
			  url : req
		  });
		  Project.update({url: project.url}, project, {upsert: true, setDefaultsOnInsert: true}, function (err) {});
		  Project.findOne({url: project.url}, function(error, project) {
			  console.log(project);
			  for (var i = 0; i < obj.length; i++) {
				  obj[i].project = project._id;
				  delete obj[i]._id;
				  Issue.update({number: obj[i].number}, obj[i], {
					  upsert: true,
					  setDefaultsOnInsert: true
				  }, function (err) {
				  });

			  }
		  });

	  }};
	 
	request(options, callback);

};


module.exports = function (router) {
	router.get('/issues', function(req, res, next) {
	  Issue.find(function(err, issues){
	    if(err){ return next(err); }
	    res.json(issues);
	  });
	});


	router.post('/issue', function(req, res, next) {
	    var issue = new Issue(req.body);
	    issue.save(function(err, issue){
		     if(err){ return next(err); }

		    res.json(issue);
		  
		});
	});

	router.post('/githubsync', function(req, res, next) {
		connectToGithub(req.body.text)
        Issue.find(function(err, issues){
		    if(err){ return next(err); }
		    res.json(issues);
		  });
    });

	router.get('/projects', function(req, res, next) {
		Project.find(function(err, projects){
			if(err){ return next(err); }
			res.json(projects);
		});
	});



};