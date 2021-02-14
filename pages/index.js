import Head from "next/head";
import { useState } from "react";
import styles from "../styles/index.module.css";
import convert from "../lib/convert";

import { promises as fs } from "fs";
import path from "path";
import terser from "terser";

export async function getStaticProps() {
  const code = await fs.readFile(
    path.join(process.cwd(), "lib", "bookmarklet.js"),
    "utf8"
  );
  const minified = await terser.minify(code);
  const anonymous = `(function(){${minified.code}}());`;

  return {
    props: { bookmarklet: `javascript:${encodeURIComponent(anonymous)}` },
  };
}

export default function Home({ bookmarklet }) {
  const [inputUrl, setInputUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState(null);

  const updateInputUrl = (e) => setInputUrl(e.target.value);
  const getUrl = (e) => {
    e.preventDefault();
    convert(inputUrl, (url) => setOutputUrl(url));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>OpenMedium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.gradient}>OpenMedium</span>
        </h1>

        <p className={styles.description}>An API for sharing Medium articles</p>
        <div className={styles.example}>
          <code className={styles.code}>
            {"curl https://open-medium.now.sh/api/open?url=<MEDIUM_URL>"}
          </code>
        </div>

        <h2>Try it out!</h2>
        <form className={styles.try} onSubmit={getUrl}>
          <div className={styles.input}>
            <label>
              Medium URL{" "}
              <input type="text" id="url" onChange={updateInputUrl} />
            </label>
          </div>
          <div className={styles.submit}>
            <button type="submit">Get URL</button>
          </div>
          {outputUrl && (
            <div className={styles.link}>
              <a href={outputUrl} className={styles.gradient}>
                {outputUrl}
              </a>
            </div>
          )}
        </form>

        <h2>Extensions</h2>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>iOS Shortcut &rarr;</h3>
            <p>Installable iOS shortcut</p>
          </a>
          <div className={styles.card}>
            <a href={bookmarklet} className={styles.bookmarklet}>
              OpenMedium
            </a>
            <h3>Bookmarklet</h3>
            <p>Drag this link to your bookmarks</p>
          </div>
        </div>

        <h2>API Reference</h2>

        <div className={styles.reference}>
          <h3>
            /api/open <span className={styles.tag}>GET</span>
            <span className={styles.tag}>POST</span>
          </h3>
          <p>
            Returns the short <strong>t.co</strong> link for a given Medium
            article
          </p>
          <h4>Parameters</h4>
          <p>
            <code className={styles.code}>url</code> the Medium article URL
            <i> (as a form, JSON, or query parameter; everything works)</i>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        Made by{" "}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </footer>
    </div>
  );
}
