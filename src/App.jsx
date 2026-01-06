import { useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas";
import "./styles/canvasx.css";

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  /*  LOAD PROJECT (MongoDB → fallback localStorage) */
  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await fetch("http://localhost:5000/load");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setBlocks(data);
          localStorage.setItem("canvasx_blocks", JSON.stringify(data));
        } else {
          const saved = localStorage.getItem("canvasx_blocks");
          if (saved) setBlocks(JSON.parse(saved));
        }
      } catch (err) {
        console.warn("Backend not reachable, using localStorage");
        const saved = localStorage.getItem("canvasx_blocks");
        if (saved) setBlocks(JSON.parse(saved));
      }

      setLoaded(true);
    };

    loadProject();
  }, []);

  /*  AUTOSAVE (Local + MongoDB) */
  useEffect(() => {
    if (!loaded) return;

    // Local autosave
    localStorage.setItem("canvasx_blocks", JSON.stringify(blocks));

    // Backend autosave
    fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    }).catch(() =>
      console.warn("Backend save failed, saved locally")
    );
  }, [blocks, loaded]);

  /* EXPORT (Styled HTML, outer border )*/
  const exportProject = () => {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      alert("Nothing to export");
      return;
    }

    const htmlSections = blocks
      .map(
        (block) => `
          <p class="content-text">${block.content}</p>
        `
      )
      .join("");

    const fullHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>CanvasX Export</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #0f0f0f;
    font-family: "Segoe UI", Arial, sans-serif;
    color: #f2f2f2;
  }

  .outer-wrapper {
    max-width: 900px;
    margin: 60px auto;
    padding: 50px;
    border: 2px solid #d4af37;
    border-radius: 14px;
    background-color: #151515;
  }

  .content-text {
    font-size: 22px;
    line-height: 1.7;
    margin-bottom: 28px;
    color: #f5f5f5;
  }
</style>
</head>

<body>
  <div class="outer-wrapper">
    ${htmlSections}
  </div>
</body>
</html>
`;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvasx-export.html";
    link.click();
  };

  return (
    <div className="app">
      <Header onExport={exportProject} />
      <div className="builder">
        <Sidebar />
        <Canvas blocks={blocks} setBlocks={setBlocks} />
      </div>
    </div>
  );
}