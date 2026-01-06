const blocks = [
  "Hero Section",
  "Bio Section",
  "Gallery",
  "Publications",
  "Contact Section",
  "Footer",
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Block Library</h3>

      {blocks.map((b) => (
        <div
          key={b}
          className="library-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("blockType", b)
          }
        >
          {b}
        </div>
      ))}

      
    </aside>
  );
}