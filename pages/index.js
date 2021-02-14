import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const updateUrl = (e) => setUrl(e.target.value);

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
            {"curl http://localhost:3000/api/open?url=<MEDIUM_URL>"}
          </code>
        </div>

        <h2>Try it out!</h2>
        <div className={styles.try}>
          <div className={styles.input}>
            <label>
              Medium URL <input type="text" id="url" onChange={updateUrl} />
            </label>
          </div>
          <div className={styles.submit}>
            <button onClick={() => alert("todo")}>Get URL</button>
          </div>
        </div>

        <h2>Extensions</h2>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>iOS Shortcut &rarr;</h3>
            <p>Installable iOS shortcut</p>
          </a>
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Bookmarklet</h3>
            <p>Drag this link to your bookmarks</p>
          </a>
        </div>

        <h2>API Reference</h2>

        <div className={styles.reference}>
          <h3>/api/open</h3>
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
