var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var Project = mongoose.model('Project');
var GithubConnector = require('./GithubConnector');

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


	router.post('/issueUpdate', function(req, res, next) {
		Issue.findOne({ id: req.body.id },  function(err, issue){
			if(err){console.log(err);}
			issue.priority = req.body.priority;
			issue.save()
			res.send(issue);
		});
	});

	router.post('/issueByProject', function(req, res, next) {
		var url = req.body.text;
		Project.findOne({url: url})
			.populate('issues')
			.exec(function (err, project) {
				if(err){console.log(err);};
				res.send(project.issues);
			})
	});

	router.post('/githubsync', function(req, res, next) {
		var connector = new GithubConnector(req.body.repoOwnerName, req.body.repoName);
		connector.githubSync(res);
    });

	router.get('/projects', function(req, res, next) {
		Project.find(function(err, projects){
			if(err){ return next(err); }
			res.json(projects);
		});
	});



};