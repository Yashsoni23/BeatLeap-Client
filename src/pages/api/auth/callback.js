import nc from 'next-connect'


var CLIENT_ID = process.env.CLIENT_ID
var CLIENT_SECRET = process.env.CLIENT_SECRET

var spotify_redirect_uri = 'http://localhost:3000/api/auth/callback'
const handler = nc()
    .get((req, res) => {
        

        var code = req.query.code;

          var authOptions = {
              url: 'https://accounts.spotify.com/api/token',
              form: {
                  code: code,
                  redirect_uri: spotify_redirect_uri,
                  grant_type: 'authorization_code'
              },
              headers: {
                  'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Access-Control-Allow-Origin': '*'
              },
              json: true
          }

          request.post(authOptions, function (error, response, body) {
              if (!error && response.statusCode === 200) {
                  access_token = body.access_token;
                  console.log("new access token: " + access_token);
                //   res.redirect('/')
                  res.send({ data: access_token });

              }
          });
          // res.send("token generated")
    })

export default handler