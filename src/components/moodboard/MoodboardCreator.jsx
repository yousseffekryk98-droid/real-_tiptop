import { useState } from "react";
import { T } from "../../config/tokens";

export function MoodboardCreator({ products = [] }) {
  const [moodboards, setMoodboards] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardItems, setBoardItems] = useState(new Map());
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize] = useState(20);

  const createNew = () => {
    if (!newName.trim()) return;
    const id = Date.now();
    setMoodboards(prev => [...prev, { id, name: newName, createdAt: new Date() }]);
    setBoardItems(prev => new Map(prev).set(id, []));
    setSelectedBoard(id);
    setNewName("");
  };

  const deleteBoard = (id) => {
    setMoodboards(prev => prev.filter(b => b.id !== id));
    const newItems = new Map(boardItems);
    newItems.delete(id);
    setBoardItems(newItems);
    if (selectedBoard === id) setSelectedBoard(null);
  };

  const addProductToBoard = (product) => {
    if (!selectedBoard) return;
    const items = boardItems.get(selectedBoard) || [];
    const newItem = {
      id: Date.now(),
      product,
      x: 50 + (items.length * 20),
      y: 50 + (items.length * 20)
    };
    const updated = [...items, newItem];
    setBoardItems(prev => new Map(prev).set(selectedBoard, updated));
  };

  const updateItemPosition = (boardId, itemId, x, y) => {
    const items = boardItems.get(boardId) || [];
    const updated = items.map(item =>
      item.id === itemId ? { ...item, x: snapToGrid ? Math.round(x / gridSize) * gridSize : x, y: snapToGrid ? Math.round(y / gridSize) * gridSize : y } : item
    );
    setBoardItems(prev => new Map(prev).set(boardId, updated));
  };

  const removeFromBoard = (boardId, itemId) => {
    const items = boardItems.get(boardId) || [];
    const updated = items.filter(item => item.id !== itemId);
    setBoardItems(prev => new Map(prev).set(boardId, updated));
  };

  const saveMoodboard = () => {
    if (!selectedBoard) return;
    const board = moodboards.find(b => b.id === selectedBoard);
    const items = boardItems.get(selectedBoard) || [];
    const data = {
      name: board.name,
      items: items.map(i => ({ productId: i.product.id, x: i.x, y: i.y })),
      createdAt: board.createdAt
    };
    // In real app: POST to backend
    console.log("Saving moodboard:", data);
    alert(`Moodboard "${board.name}" saved successfully!`);
  };

  const currentItems = selectedBoard ? boardItems.get(selectedBoard) || [] : [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "1.5rem", height: "100%" }}>
      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", overflow: "auto" }}>
        {/* New Moodboard */}
        <div style={{ padding: "1rem", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px" }}>
          <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, fontWeight: 600, display: "block", marginBottom: "0.6rem" }}>
            New Collection
          </label>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.8rem" }}>
            <input
              type="text"
              placeholder="e.g. Royal Majlis Set"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createNew()}
              style={{
                flex: 1,
                padding: "0.5rem 0.6rem",
                border: `1px solid ${T.border}`,
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontFamily: T.sans
              }}
            />
          </div>
          <button
            onClick={createNew}
            style={{
              width: "100%",
              padding: "0.5rem",
              background: T.gold,
              color: T.surface,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 600,
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => (e.target.style.background = T.goldBright)}
            onMouseLeave={(e) => (e.target.style.background = T.gold)}
          >
            Create Board
          </button>
        </div>

        {/* Saved Moodboards */}
        <div>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, fontWeight: 600, marginBottom: "0.6rem" }}>
            Collections ({moodboards.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {moodboards.map(board => (
              <div
                key={board.id}
                onClick={() => setSelectedBoard(board.id)}
                style={{
                  padding: "0.7rem 0.8rem",
                  background: selectedBoard === board.id ? T.goldDim : T.bg,
                  border: `1px solid ${selectedBoard === board.id ? T.gold : T.border}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: selectedBoard === board.id ? 600 : 400,
                  color: selectedBoard === board.id ? T.gold : T.charcoal,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s"
                }}
              >
                <span>{board.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBoard(board.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: T.red,
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    padding: "0"
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Library */}
        {selectedBoard && (
          <div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, fontWeight: 600, marginBottom: "0.6rem" }}>
              Add Products
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "300px", overflow: "auto" }}>
              {products.slice(0, 10).map(product => (
                <button
                  key={product.id}
                  onClick={() => addProductToBoard(product)}
                  style={{
                    padding: "0.6rem 0.8rem",
                    background: T.bg,
                    border: `1px solid ${T.border}`,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    textAlign: "left",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = T.goldDim;
                    e.target.style.borderColor = T.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = T.bg;
                    e.target.style.borderColor = T.border;
                  }}
                >
                  <div style={{ fontWeight: 600, color: T.charcoal }}>{product.emoji} {product.name}</div>
                  <div style={{ fontSize: "0.65rem", color: T.muted, marginTop: "0.2rem" }}>
                    {product.cat}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        {selectedBoard && (
          <div style={{ padding: "1rem", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.75rem", cursor: "pointer", marginBottom: "0.8rem" }}>
              <input
                type="checkbox"
                checked={snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                style={{ cursor: "pointer", accentColor: T.gold }}
              />
              <span style={{ fontWeight: 600, color: T.charcoal }}>Snap to Grid</span>
            </label>
            <button
              onClick={saveMoodboard}
              style={{
                width: "100%",
                padding: "0.6rem",
                background: T.green,
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Save Collection
            </button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div
        style={{
          background: "#fff",
          border: `2px solid ${T.border}`,
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        {selectedBoard ? (
          <>
            {/* Canvas Area */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                position: "relative",
                background:
                  snapToGrid ?
                    `linear-gradient(0deg, transparent calc(${gridSize}px - 1px), #f0f0f0 calc(${gridSize}px - 1px)), linear-gradient(90deg, transparent calc(${gridSize}px - 1px), #f0f0f0 calc(${gridSize}px - 1px))`
                    : "transparent",
                backgroundSize: snapToGrid ? `${gridSize}px ${gridSize}px` : "auto"
              }}
            >
              {currentItems.map(item => (
                <DraggableProductCard
                  key={item.id}
                  item={item}
                  onMove={(x, y) => updateItemPosition(selectedBoard, item.id, x, y)}
                  onRemove={() => removeFromBoard(selectedBoard, item.id)}
                />
              ))}
            </div>

            {/* Status Bar */}
            <div
              style={{
                padding: "0.8rem 1rem",
                background: T.bg,
                borderTop: `1px solid ${T.border}`,
                fontSize: "0.75rem",
                color: T.muted,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>Items on board: {currentItems.length}</span>
              <span style={{ fontFamily: T.mono }}>
                Grid: {snapToGrid ? `${gridSize}px` : "Free"}
              </span>
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.muted,
              fontSize: "1rem"
            }}
          >
            Select or create a collection to start
          </div>
        )}
      </div>
    </div>
  );
}

// Draggable product card component
function DraggableProductCard({ item, onMove, onRemove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - item.x,
      y: e.clientY - item.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    onMove(e.clientX - offset.x, e.clientY - offset.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        width: "100px",
        padding: "0.6rem",
        background: T.surface,
        border: `2px solid ${isDragging ? T.gold : T.border}`,
        borderRadius: "6px",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        transition: isDragging ? "none" : "all 0.2s"
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center", marginBottom: "0.4rem" }}>
        {item.product.emoji}
      </div>
      <div style={{ fontSize: "0.65rem", fontWeight: 600, color: T.charcoal, textAlign: "center", marginBottom: "0.4rem", lineHeight: 1.2 }}>
        {item.product.name}
      </div>
      <button
        onClick={onRemove}
        style={{
          width: "100%",
          padding: "0.3rem",
          background: T.redDim,
          border: `1px solid ${T.red}`,
          color: T.red,
          borderRadius: "3px",
          cursor: "pointer",
          fontSize: "0.65rem",
          fontWeight: 600
        }}
      >
        Remove
      </button>
    </div>
  );
}
