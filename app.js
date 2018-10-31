var keys = require("./config/keys");
var fs = require("fs");
var Track = require("./src/models/track");

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = keys.CLIENT_ID; // Your client id
var client_secret = keys.CLIENT_SECRET; // Your secret
var redirect_uri = keys.REDIRECT_URI; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = "spotify_auth_state";

var app = express();

//const currentTracks = JSON.parse(fs.readFileSync("./data/spotify.json"));
//const tracks = currentTracks.map(t => new Track(t));

const temp = JSON.parse(fs.readFileSync("./data/tracks.json"));

app.use(express.static(__dirname + "/public"))
    .use(cors())
    .use(cookieParser());

app.get("/login", function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = "user-read-private user-read-email playlist-modify-public";
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            })
    );
});

app.get("/callback", function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
                querystring.stringify({
                    error: "state_mismatch"
                })
        );
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code"
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer(client_id + ":" + client_secret).toString(
                        "base64"
                    )
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: "https://api.spotify.com/v1/me",
                    headers: { Authorization: "Bearer " + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    //console.log(body);
                });

                //addTracks(tracks, access_token);
                // temp.forEach(t => {
                //     searchTrack(t, access_token);
                // })

                // we can also pass the token to the browser to make requests from there
                res.redirect(
                    "/#" +
                        querystring.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token
                        })
                );
            } else {
                res.redirect(
                    "/#" +
                        querystring.stringify({
                            error: "invalid_token"
                        })
                );
            }
        });
    }
});

app.get("/refresh_token", function(req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                new Buffer(client_id + ":" + client_secret).toString("base64")
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                access_token: access_token
            });
        }
    });
});

console.log("Listening on 8888");
app.listen(8888);

var createPlaylist = function(name, access_token) {
    var playlistOptions = {
        url: "https://api.spotify.com/v1/users/snackm1x/playlists",
        headers: { Authorization: "Bearer " + access_token },
        json: true,
        body: {
            name: name,
            public: true
        }
    };

    request.post(playlistOptions, function(error, response, body) {
        if (error) {
            console.log("error", error);
        }
        console.log(response);
        console.log(body);
    });
};

var searchTrack = function(track, access_token) {
    var searchOptions = {
        url: "https://api.spotify.com/v1/search",
        headers: { Authorization: "Bearer " + access_token },
        json: true,
        qs: {
            q: track.title,
            type: "track"
        }
    };

    request.get(searchOptions, function(error, response, body) {
        if (error) {
            console.log("error", error);
        }
        if (!body.tracks) return;
        if (body.tracks.items) {
            const spotifyTrack = body.tracks.items.find(function(element) {
                return trackFound(track, element);
            });
            if (spotifyTrack) {
                track.spotifyTrack = spotifyTrack.uri;
                fs.appendFileSync(
                    "./data/spotify.json",
                    JSON.stringify(track) + ",\n"
                );
            }
        }
    });
};

var trackFound = function(track, element) {
    const trackMatches =
        track.title.toLowerCase() === element.name.toLowerCase();
    const artistMatches =
        track.artist.toLowerCase() === element.artists[0].name.toLowerCase();
    return trackMatches && artistMatches;
};

var addTracks = function(tracks, access_token) {
    var uris = [];
    tracks.forEach(t => {
        uris.push(t.spotifyTrack);
    });

    var addOptions = {
        url: `https://api.spotify.com/v1/playlists/${'redditFavoritesId'}/tracks`,
        headers: { Authorization: "Bearer " + access_token },
        json: true,
        body: {
            uris: uris
        }
    };

    request.post(addOptions, function(error, response, body) {
        if (error) {
            console.log("error", error);
        }

        console.log(response.statusCode);
        console.log(body);
    });
};
