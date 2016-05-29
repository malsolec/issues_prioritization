var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var Project = mongoose.model('Project');

function connectToGithub(req, res) {

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

		  Project.findOne({url:req}, function (err, doc) {
			  if(doc){
				  res.send({error: "Project has been added already."})
			  }
			  else{
				  for (var i = 0; i < obj.length; i++) {
					  var issue = new Issue({
						  number    : obj[i].number,
						  title   : obj[i].title,
						  priority: "undone"
					  });
					  issue.save(function(err){if(err){console.log(err);}});
					  project.issues.push(issue);
				  };

				  project.save(function (err) {
					  if(err){console.log(err)};
					  Project.findOne({url: project.url})
						  .populate('issues')
						  .exec(function (err, project) {
							  res.send(project.issues);
						  })

				  });
			  }
		  })


	  }}
	 
	request(options, callback);

}


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
		connectToGithub(req.body.text, res);
    });

	router.get('/projects', function(req, res, next) {
		Project.find(function(err, projects){
			if(err){ return next(err); }
			res.json(projects);
		});
	});



};