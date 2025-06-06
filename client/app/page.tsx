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

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8">
          🎨 Banner Generator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Background */}
            <div>
              <label className="block font-semibold mb-1">Background</label>
              <select
                name="background"
                value={form.background}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                {backgrounds.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Inputs */}
            {(["tech", "streaks", "view", "skills"] as (keyof FormState)[]).map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-2">
              <button
                onClick={generateUrl}
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition w-full md:w-auto"
              >
                Generate Banner
              </button>
              {url && (
                <button
                  onClick={copyUrl}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300 transition w-full md:w-auto"
                >
                  📋 Copy URL
                </button>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            {url && (
              <>
                <div>
                  <h2 className="text-lg font-semibold mb-1">🔗 URL</h2>
                  <div className="bg-gray-100 p-3 rounded break-all text-sm border">
                    {url}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-1">🖼️ Preview</h2>
                  <div className="border border-dashed border-gray-400 rounded p-3 bg-white">
                    <img
                      src={previewUrl}
                      alt="Banner Preview"
                      className="w-full max-h-[300px] object-contain rounded"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
