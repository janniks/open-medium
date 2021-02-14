const { promisify } = require("util");
const Twitter = require("twitter");

const cacheDays = process.env.CACHE_DAYS || 30;
const hostnames = process.env.HOSTNAMES?.split(",") || ["medium.com"];
const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
});

const tweet = promisify(client.post).bind(client);

// adapted from https://stackoverflow.com/a/43467144/1139105
function isValidMediumUrl(string) {
  try {
    const url = new URL(string);
    return hostnames.includes(url.hostname) && url.protocol === "https:";
  } catch (e) {
    return false;
  }
}

export default async (req, res) => {
  try {
    const url = req.query.url || req.body.url;

    if (!url) {
      throw Error("Missing query parameter: 'url'");
    }

    if (!isValidMediumUrl(url)) {
      throw Error("Not a valid Medium URL");
    }

    const result = await tweet("statuses/update", {
      status: `${new Date().toUTCString()}, this article was read ${url}`,
    });

    res.setHeader("Cache-Control", `s-maxage=${cacheDays * 60 * 60 * 24}`);
    return res.json(new String(result.entities.urls[0].url));
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};
