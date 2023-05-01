import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
export default function Component() {
    const spotifyAPI = new SpotifyWebApi();
  const { data: session } = useSession()
//   const { accessToken } = session;
  useEffect(() => {
    if(false){
      signIn()
    }else{
        // spotifyAPI.setAccessToken(accessToken);
        // console.log(accessToken, ":accessToken");
    }
  }, [])
  
//   console.log(accessToken, ":accessToken");
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Image src={session.user?.image} width={300} height={300}/>
        <h1>{session.user?.name}</h1>
        {/* <h1>{accessToken?accessToken:"no token"}</h1> */}
        <h1>{new Date(session?.expires).toLocaleTimeString()}</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}