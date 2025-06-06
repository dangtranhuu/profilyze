"use client";

import { useState } from "react";

type FormState = {
  background: string;
  tech: string;
  streaks: string;
  view: string;
  skills: string;
};

const backgrounds = [
  "thean", "chillGaming", "blackCatNoise", "girlRain", "koiPond", "winScreen", "relax", "sunsetFishing",
  "itasasu", "minato", "itachi1", "itachi5", "minato1", "itachi6", "itachi2", "itachi4"
];



export default function Home() {
  const [form, setForm] = useState<FormState>({
    background: "itachi1",
    tech: "java",
    streaks: "fire",
    view: "sharingan",
    skills: "angular,vuejs,reactjs,nodejs",
  });

  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/profile/banner";
    const params = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const fullUrl = `${baseUrl}?${params.toString()}`;
    setUrl(fullUrl);
    setPreviewUrl(fullUrl);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🎨 Banner Generator</h1>

      <div style={{ marginBottom: "1rem" }}>
        {/* Background select */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.2rem" }}>
            background
          </label>
          <select
            name="background"
            value={form.background}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            {backgrounds.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Other text fields */}
        {(["tech", "streaks", "view", "skills"] as (keyof FormState)[]).map((field) => (
          <div key={field} style={{ marginBottom: "0.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.2rem" }}>{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        ))}

        <button
          onClick={generateUrl}
          style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        >
          Generate Banner
        </button>
      </div>

      {url && (
        <>
          <h3>🔗 URL:</h3>
          <code style={{ display: "block", marginBottom: "1rem" }}>{url}</code>

          <h3>🖼️ Preview:</h3>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <img src={previewUrl} alt="Banner Preview" style={{ width: "100%" }} />
          </div>
        </>
      )}
    </div>
  );
}
