import ytdl from 'ytdl-core';

export async function handler(event, context) {
  try {
    const id = event.path.split('/').pop();
    const info = await ytdl.getInfo(id);
    const format = ytdl.chooseFormat(info.formats, { quality: 140 });
    const url = format.url;
    return {
      statusCode: 301,
      headers: {
        Location: url,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
