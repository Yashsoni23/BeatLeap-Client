import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization:"https://accounts.spotify.com/authorize?client_id=006dbf49774c4c07bc93b4ef1f006518&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback/spotify&scope=playlist-read-private%20playlist-modify-private%20streaming%20user-read-private%20user-read-email",
      // accessTokenUrl: 'https://accounts.spotify.com/api/token',
      // authorizationUrl: 'https://accounts.spotify.com/authorize?response_type=code&show_dialog=true',
      // profileUrl: 'https://api.spotify.com/v1/me',
      // scope: 'playlist-read-private playlist-modify-private streaming user-read-private user-read-email',
    }),
    // ...add more providers here
  ],
  // callbacks: { 
  //   async jwt(token, _, account) {
  //     if (account) {
  //       token.id = await account.id
  //       token.accessToken = await account.accessToken
  //     }
  //     console.log(token, account, "token and account");
  //      return await token
  //   },
  //   async session(session, user) {
  //     session.user = await user
  //     return await session
  //   }
  // },
  pages: {
    // signIn: '/auth/SignIn',
    // signOut: '/auth/SignOut',
    
  },



}

export default NextAuth(authOptions)