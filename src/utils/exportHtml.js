export function exportHTML(blocks) {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>CanvasX Export</title>
<style>
body {
  margin: 0;
  font-family: Arial;
  background: #0d0d0d;
  color: #f2d38b;
}
section {
  padding: 80px 20px;
  border-bottom: 1px solid #333;
}
.container {
  max-width: 1000px;
  margin: auto;
}
h2 { color: #e6c06a; }
</style>
</head>

<body>
${blocks.map(b => `
<section>
  <div class="container">
    <h2>${b.type}</h2>
    <p>${b.content}</p>
  </div>
</section>
`).join("")}
</body>
</html>
`;

  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "canvasx-export.html";
  link.click();
}