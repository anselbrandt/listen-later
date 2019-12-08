import ytpl from 'ytpl';
import ytdl from 'ytdl-core';

export async function handler(event, context) {
  try {
    const id = event.path.split('/').pop();
    const playlist = await ytpl(id);
    const date = new Date();
    const podcast = {
      title: playlist.title,
      url: 'https://listenlater.netlify.com',
      feed: `https://listenlater.netlify.com/.netlify/functions/${id}`,
      description: playlist.description,
      email: 'mail@me.com',
      image: 'https://listenlater.netlify.com/listenlater.jpg',
      updated: date.toUTCString(),
    };
    const urls = playlist.items.map(item => {
      return item.url_simple;
    });
    const descriptions = await Promise.all(
      urls.map(async url => {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 140 });
        const video = {
          title: info.title,
          permalink: url,
          description: info.description,
          source: format.url.replace(/&/g, '&amp;'),
          size: format.contentLength,
          id: info.video_id,
          updated: date.toUTCString(),
        };
        const item = `<item>
        <title>${video.title}</title>
        <link>${video.permalink}</link>
        <description>${video.description}</description>
        <enclosure url="${video.source}" length="${video.size}" type="audio/mp4"></enclosure>
        <guid isPermaLink="false">${video.id}</guid>
        <pubDate>${video.updated}</pubDate>
        </item>`;
        return item;
      }),
    );
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0">
        <channel>
            <title>${podcast.title}</title>
            <link>${podcast.url}</link>
            <description>${podcast.description}</description>
            <atom:link href="${
              podcast.feed
            }" rel="self" type="application/rss+xml"></atom:link>
            <itunes:owner>
                <itunes:name>${podcast.title}</itunes:name>
                <itunes:email>${podcast.email}</itunes:email>
            </itunes:owner>
            <itunes:author>${podcast.title}</itunes:author>
            <itunes:image href="${podcast.image}"></itunes:image>
            <googleplay:block>yes</googleplay:block>
            <itunes:block>Yes</itunes:block>
            <language>en-US</language>
            <pubDate>${podcast.updated}</pubDate>
            <lastBuildDate>${podcast.updated}</lastBuildDate>
            <image>
                <url>${podcast.image}</url>
                <title>${podcast.title}</title>
                <link>${podcast.url}</link>
            </image>
            ${descriptions.join('')}
        </channel>
    </rss>`;
    const contentType = 'text/xml';
    //const contentType = 'text';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
      },
      body: rss,
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
