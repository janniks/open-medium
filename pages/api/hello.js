const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
});

// https://stackoverflow.com/a/43467144/1139105
function isValidMediumUrl(string) {
  try {
    const url = new URL(string);
    return url.hostname === "medium.com" && url.protocol === "https:";
  } catch (e) {
    return false;
  }
}

export default (req, res) => {
  try {
    const url = req.query.url || req.body.url;

    if (!url) {
      throw Error("'url' query parameter missing");
    }

    if (!isValidMediumUrl(url)) {
      throw Error("Not a valid Medium URL");
    }

    // todo: pad length if too short
    client.post(
      "statuses/update",
      { status: `${new Date().toUTCString()}, this article was read ${url}` },
      function (err, tweet) {
        if (err) throw err;
        res.json(tweet.entities.urls[0].url);
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};
