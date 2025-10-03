import React, { useEffect, useState } from "react";

export default function Home() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function fetchJoke(signal) {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single", { signal });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setJoke(data.joke || "No joke returned");
    } catch (e) {
      if (e.name !== "AbortError") setErr("Could not load joke");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const c = new AbortController();
    fetchJoke(c.signal);
    const id = setInterval(() => fetchJoke(c.signal), 12000);
    return () => { c.abort(); clearInterval(id); };
  }, []);

  return (
    <section>
      <h2 style={{ textAlign: "center", marginBottom: 6 }}>Welcome</h2>

      <div style={{ maxWidth: 780, margin: "10px auto", textAlign: "center" }}>

        <div style={{
          background: "rgba(255,255,255,0.03)",
          padding: 18,
          borderRadius: 10,
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {loading ? <em>Loading joke…</em> : err ? <span style={{ color: "var(--muted)" }}>{err}</span> : <div style={{ fontSize: 18 }}>{joke}</div>}
        </div>
      </div>
    </section>
  );
}
