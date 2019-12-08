// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const response = await fetch('http://api.icndb.com/jokes/random');
    const data = await response.json();
    const joke = data.value.joke.replace(/&quot;/g, '"');
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: joke }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
