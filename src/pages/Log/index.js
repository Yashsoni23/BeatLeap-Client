import axios from 'axios';
import React from 'react'

export default function Login() {
    const AUTH_URI = "https://accounts.spotify.com/authorize?client_id=1860adcf9c8d460ca7419707e2b9bd67&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email"
//   const [tracks, setTracks] = useState();
  async function getNewToken() {
    const Token = await axios.get('http://localhost:5000/auth/login', {
      headers: {
        "mode": "no-cors",
        'Acess-Control-Allow-Origin': '*',
        "options": {
          "allow_accessibility": "*",
          "access-Control-Allow-Origin": "*"
        },
      }
    }).then(data => {
      console.log(data, "promise")
      
    })
    // console.log(Token.data.data);
    // setToken(Token.data.data);

  }

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen">
                <a className='bg-orange-500 p-3 rounded-2xl' href={AUTH_URI}>Login</a>
            </div>
        </>
    )
}
