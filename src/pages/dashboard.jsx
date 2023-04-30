import React, { useState, useEffect } from 'react';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback() {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb("BQA2nEdp0OWK4YdEkrYJ5Vx_Z343isPJVXiiwTDyBjEgAs7uOU5Vu6wyySocCOS85uI4jJPGHpqfZCB9LdIxOJ48OGwdnpXI0aNN9bymKbrBBLOmOJuRgABthUstYzLhc_5setg8X7TnjXHQCZ8CxP9SaJHTtA0ht-6OaVnQ7IAXJ9eqd3UTpLpljzOpo45JFzvQ_E8-aPQZ9VE6J2tNzeS-pfIgAGiHMxhrHpI_hU7nLZafEbq_iW4ElbwqFTt-zyA"); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            player.addListener('player_state_changed', ( state => {
                console.log("above state change");

                // if (!state) {
                //     return;
                // }
                console.log("state:", state);
                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    if (!state) {
                        console.error('User is not playing music through the Web Playback SDK');
                        return;
                      }
                    
                      var current_track = state.track_window.current_track;
                      var next_track = state.track_window.next_tracks[0];
                    
                      console.log('Currently Playing', current_track);
                      console.log('Playing Next', next_track);
                    (!state)? setActive(true) : setActive(true) 
                });

            }));

            player.connect().then(success => {
                if (success) {
                    console.log("The Web Playback SDK successfully connected to Spotify!");
                }
            }).catch(error => {
                console.log("Web Playback SDK not connected to Spotify", error.message);
            }); 

        };
    }, []);

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>

                            <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                                &lt;&lt;
                            </button>

                            <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                            <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback
