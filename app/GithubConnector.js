var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var Project = mongoose.model('Project');

module.exports  = function (repoOwnerGithubNick, repoName){

    var url = "https://api.github.com/repos/".concat(repoOwnerGithubNick,"/",repoName, "/issues");

    this.githubSync = function (res) {
        var request = require('request');

        var requestOptions = {
            url: url,
            headers: {
                'User-Agent': repoOwnerGithubNick
            }
        }

       function afterRequest(error, response, body) {
            if (!error && response.statusCode == 200) {

                var obj = JSON.parse(body);
                var project = new Project({
                    alias : repoName,
                    url : url
                });

                Project.findOne({url:url}, function (err, doc) {
                    if(doc){
                        res.send({alreadyExistsError: "Project has been added already."});
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

            }
           else {
                res.send({repoNotFoundError: "Project does not exist"});
            }
       }

        request(requestOptions, afterRequest);
    }
}

