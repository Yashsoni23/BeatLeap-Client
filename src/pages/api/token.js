// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect"
const dotenv = require('dotenv').config()

var CLIENT_ID = process.env.CLIENT_ID
var CLIENT_SECRET = process.env.CLIENT_SECRET

var spotify_redirect_uri = 'http://localhost:3000/auth/callback'

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


export default function handler(req, res) {
    var scope = "streaming user-read-email user-read-private"
    var state = generateRandomString(16);
    console.log(state, "state");
   const refresh =  `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`

      console.log(refresh, "refresh");
    var authParameters = {
        method: 'POST',
        form: {
            // code:  state,
            redirect_uri: spotify_redirect_uri,
            // grant_type: 'authorization_code'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token:"AQCbsLDOFHfDKr_aSbVSWM6TzFXdmjVNxYUnJAZvjhfv6FUwUqBTiKqWd5tigiEyyd7MWDFa0ebjljBp5cXqAvqssWtf1PIHaTPFg-pk6-wd5GdZJFpBQJMfhtntHj0yMbU",
            client_id: CLIENT_ID,
            redirect_uri: spotify_redirect_uri,
            scope: scope,
            state: state
        })


    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(response => response.json())
        .then(data => {
            console.log(data.access_token)
            console.log(data);
            res.status(200).json({ data: data.access_token })

        })
}






const handlers = nc()
    .get((req, res) => {
        var authParameters = {
            method: 'POST',
            form: {
                          code: code,
                          redirect_uri: spotify_redirect_uri,
                          grant_type: 'authorization_code'
                      },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=1860adcf9c8d460ca7419707e2b9bd67&client_secret=14a101b4ffe042cbaec9788514558dbc',
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data.access_token)
                res.status(200).json({ data: data.access_token })
                // res.send(data.access_token)
            })
        console.log(process.emit.CLIENT_ID, "CLIENT_ID", process.env.CLIENT_SECRET);
    })







// app.get('/auth/login', (req, res) => {

//   var scope = "streaming user-read-email user-read-private"
//   var state = generateRandomString(16);

//   var auth_query_parameters = new URLSearchParams({
//       response_type: "code",
//       client_id: CLIENT_ID,
//       scope: scope,
//       redirect_uri: spotify_redirect_uri,
//       state: state
//   })

//   res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString())

// })

// app.get('/auth/callback', (req, res) => {

//   var code = req.query.code;

//   var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//           code: code,
//           redirect_uri: spotify_redirect_uri,
//           grant_type: 'authorization_code'
//       },
//       headers: {
//           'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Access-Control-Allow-Origin': '*'
//       },
//       json: true
//   }

//   request.post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//           access_token = body.access_token;
//           console.log("new access token: " + access_token);
//           res.redirect('/')
//           // res.status(200).json({ data: access_token });

//       }
//   });
//   // res.send("token generated")


// })
// app.get('/auth/token', (req, res) => {
//   res.json({ access_token: access_token })
// })


// export default handlers;