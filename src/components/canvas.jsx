import { useState } from "react";

export default function Canvas({ blocks, setBlocks }) {
  const [dragIndex, setDragIndex] = useState(null);

  const onDrop = (e, index = null) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("blockType");

    // ADD
    if (type) {
      setBlocks([
        ...blocks,
        { id: Date.now(), type, content: type },
      ]);
      return;
    }

    // REORDER
    if (dragIndex === null) return;
    const updated = [...blocks];
    const moved = updated.splice(dragIndex, 1)[0];
    updated.splice(index, 0, moved);
    setBlocks(updated);
    setDragIndex(null);
  };

  return (
    <main
      className="canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {blocks.length === 0 && (
        <p className="canvas-hint">
          Drag blocks from the left and drop them here.
        </p>
      )}

      {blocks.map((b, i) => (
        <div
          key={b.id}
          className="canvas-block"
          draggable
          onDragStart={() => setDragIndex(i)}
          onDrop={(e) => onDrop(e, i)}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            value={b.content}
            onChange={(e) =>
              setBlocks(
                blocks.map((x) =>
                  x.id === b.id
                    ? { ...x, content: e.target.value }
                    : x
                )
              )
            }
          />
          <button
            onClick={() =>
              setBlocks(blocks.filter((x) => x.id !== b.id))
            }
          >
            ✕
          </button>
        </div>
      ))}
    </main>
  );
}