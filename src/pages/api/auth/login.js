import nc from 'next-connect'






var CLIENT_ID = process.env.CLIENT_ID
var CLIENT_SECRET = process.env.CLIENT_SECRET

var spotify_redirect_uri = 'http://localhost:3000/api/auth/callback'




var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const handler = nc()
    .get((req, res) => {
        var scope = "streaming user-read-email user-read-private"
        var state = generateRandomString(16);

        var auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: spotify_redirect_uri,
            state: state
        })

        res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString())

    })

export default handler;