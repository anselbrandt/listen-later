import React from 'react';

export default function Footer() {
  return (
    <div className="App-Footer">
      <div className="Text-wrapper">
        <ul>
          <li>Generate a podcast feed from a Youtube playlist.</li>
          <li>Currently only works with public or unlisted playlists.</li>
          <li>Paste the feed URL into your preferred podcast app.</li>
          <li>
            Unfortunately, there are playback issues with the native iOS and Mac
            Podcast App.
          </li>
          <li>
            Works with <a href="https://overcast.fm">Overcast</a>,{' '}
            <a href="https://castro.fm">Castro</a>,{' '}
            <a href="https://www.himalaya.com">Himalaya</a>, and probably any
            Android podcast app.
          </li>
        </ul>
      </div>
    </div>
  );
}
