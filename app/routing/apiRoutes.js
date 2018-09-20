var fs = require('fs');

module.exports = function(app, path) {
	app.get('/api/friends', function(req, res) {
		fs.readFile("app/data/friends.js", "utf8", function(err, data) {
			if (err) {
				return console.log(err);
			} else {
				res.json(JSON.parse(data));
			}
		});
	});

	app.post('/api/friends', function(req, res) {
		var results = [];
		var postResponse = JSON.stringify(req.body);
		fs.readFile('app/data/friends.js', function (err, data) {
		    var friendFile = JSON.parse(data);
		    var closestMatch = 0;
		    var matchScore = 999999999999999;
			console.log("looking for closest match")
		    // find best match.
		    for (var i = 0; i < friendFile.length; i++) {
				
		    	var spaceBetween = 0;
		    	for (var j = 0; j < friendFile[i]['answers[]'].length; j++) {
					
					spaceBetween += Math.abs((parseInt(req.body['answers[]'][j]) - parseInt(friendFile[i]['answers[]'][j])));
					console.log(spaceBetween)
				}
				
				if(spaceBetween <= matchScore) { matchScore = spaceBetween;	closestMatch = i; }
		    }
			console.log("Closest match", closestMatch)
			results.push(friendFile[closestMatch]);
			console.log(results)
		    friendFile.push(JSON.parse(postResponse));
		    //fs.writeFile("app/data/friends.js", JSON.stringify(friendFile));
			res.send(results[0]);

		});
	});


}
