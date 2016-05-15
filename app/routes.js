var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var IssueScore = mongoose.model('IssueScore');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

function connectToGithub(res) {

	var request = require('request');
 
	var options = {
	 	url: 'https://api.github.com/repos/autyzm-pg/mroza/issues',
	  headers: {
	    'User-Agent': 'autyzm-pg'
	  }
	};
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    
	    var obj = JSON.parse(body);

		for (var i=0;i<obj.length;i++) {
 			delete obj[i]._id;
			Issue.update({number: obj[i].number}, obj[i], {upsert: true, setDefaultsOnInsert: true}, function (err) {} );
	  	}
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

	router.get('/githubsync', function(req, res, next) { 
		connectToGithub(res)
        Issue.find(function(err, issues){
		    if(err){ return next(err); }
		    res.json(issues);
		  });
    });

	
};