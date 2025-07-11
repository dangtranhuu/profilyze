"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import {
  FaGithub,
  FaDiscord,
  FaYoutube,
  FaTiktok,
  FaGlobe
} from "react-icons/fa";

type SkillOption = {
  label: string;
  value: string;
};

type FormState = {
  name: string;
  role: string;
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

const techOptions = [
  "java", "reactjs", "vsc", "github", "nodejs",
  "js", "vuejs", "python", "angular", "java-gif", "gopher"
];

const skillOptions: SkillOption[] = techOptions.map(skill => ({
  value: skill,
  label: skill.toUpperCase(),
}));

export default function Home() {
  const [form, setForm] = useState<FormState>({
    name: "TRAN HUU DANG",
    role: "FULLSTACK DEVELOPER",
    background: "itachi1",
    tech: "java",
    streaks: "fire",
    view: "sharingan",
    skills: "angular,vuejs,reactjs,nodejs",
  });

  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [backgroundType, setBackgroundType] = useState<"default" | "embed">("default");
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState("");

  useEffect(() => {
    generateUrl(); // Load initial preview
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (selected: readonly SkillOption[] | null) => {
    const values = selected?.map(opt => opt.value).join(",") ?? "";
    setForm(prev => ({ ...prev, skills: values }));
  };

  const generateUrl = () => {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/profile/banner";
    const params = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const fullUrl = `${baseUrl}?${params.toString()}`;
    setUrl(fullUrl);
    setPreviewUrl(""); // Clear current preview to show skeleton
    setTimeout(() => {
      setPreviewUrl(fullUrl);
      setIsLoading(false);
    }, 1200);
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
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>


            {/* Background Type */}
            <div>
              <label className="block font-semibold mb-1">Background Type</label>
              <select
                value={backgroundType}
                onChange={(e) => {
                  const value = e.target.value as "default" | "embed";
                  setBackgroundType(value);
                  setForm(prev => ({
                    ...prev,
                    background: value === "embed" ? `embed:${customBackgroundUrl}` : backgrounds[0]
                  }));
                }}
                className="w-full border rounded px-3 py-2"
              >
                <option value="default">Choose from List</option>
                <option value="embed">Custom Embed URL</option>
              </select>
            </div>

            {/* Background Input/Select */}
            {backgroundType === "default" ? (
              <div>
                <label className="block font-semibold mb-1">Background</label>
                <select
                  name="background"
                  value={form.background}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {backgrounds.map(bg => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block font-semibold mb-1">Embed SVG URL</label>
                <input
                  type="text"
                  placeholder="https://raw.githubusercontent.com/..."
                  value={customBackgroundUrl}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomBackgroundUrl(value);
                    setForm(prev => ({
                      ...prev,
                      background: `embed:${value}`
                    }));
                  }}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            {/* Tech */}
            <div>
              <label className="block font-semibold mb-1">Tech</label>
              <select
                name="tech"
                value={form.tech}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                {techOptions.map(tech => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Streaks & View */}
            {["streaks", "view"].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}

            {/* Skills */}
            <div>
              <label className="block font-semibold mb-1">Skills</label>
              <Select
                isMulti
                options={skillOptions}
                value={skillOptions.filter(opt =>
                  form.skills.split(",").includes(opt.value)
                )}
                onChange={handleSkillsChange}
                className="text-sm"
              />
            </div>

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
                  <div className="border border-dashed border-gray-400 rounded p-3 bg-white min-h-[200px] flex items-center justify-center">
                    {isLoading ? (
                      <div className="animate-pulse w-full h-[120px] bg-gray-200 rounded" />
                    ) : (
                      previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Banner Preview"
                          className="w-full max-h-[300px] object-contain rounded"
                        />
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-1">Using at GitHub README.md</h2>
                  <div className="bg-gray-100 p-3 rounded text-sm border overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                    <code className="block">{"![Banner Profile](" + url + ")"}</code>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t text-sm text-gray-600 text-center">
          <p className="mb-4 font-medium">Made with ❤️ by TRAN HUU DANG</p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-2xl text-gray-500 mb-4">
            <a href="https://github.com/dangtranhuu/profilyze" target="_blank" rel="noopener noreferrer" title="GitHub">
              <FaGithub />
            </a>
            <a href="https://dangth.dev" target="_blank" rel="noopener noreferrer" title="Portfolio">
              <FaGlobe />
            </a>
            <a href="https://discord.com/invite/MxmYrMrJA6" target="_blank" rel="noopener noreferrer" title="Discord">
              <FaDiscord />
            </a>
            <a href="https://www.youtube.com/@devlands" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FaYoutube />
            </a>
            <a href="https://www.tiktok.com/@theanishtar" target="_blank" rel="noopener noreferrer" title="TikTok">
              <FaTiktok />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Profilyze. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
