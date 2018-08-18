var path = require('path');
var friendData = require(path.join(__dirname, '../data/friends'));

//exported a function that could accept arguements attaches routes to app
module.exports = function (app) {

    //some route
    app.get("/api/friends", function (req, res) {
        return res.json(friendData);
    });
    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);
        //take result of the user's survey POST and parse it 
        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        for (var i = 0; i < friendData.length; i++) {
            console.log(friendData[i]);
            totalDifference = 0;

            for (var j = 0; j < friendData[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));
                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friendData[i].name;
                    bestMatch.photo = friendData[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friendData.push(userData);
        res.json(bestMatch);
    });
};