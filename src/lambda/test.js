import ytpl from 'ytpl';
import ytdl from 'ytdl-core';

export async function handler(event, context) {
  try {
    const id = 'PLNfjgyhQqUxabn9GB83ZfHpOULCK9Zlpi';
    const playlist = await ytpl(id);
    const urls = playlist.items.map(item => {
      return item.url_simple;
    });
    const descriptions = await Promise.all(
      urls.map(async url => {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 140 });
        const item = `${info.title}\n    ${url}\n\n    ${format.url}`;
        return item;
      }),
    );
    const results = `
    Playlist title: ${playlist ? playlist.title : 'Playlist fetch failed'}

    ${descriptions.join('\n\n    ')}`;
    const contentType = 'text';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
      },
      body: results,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
