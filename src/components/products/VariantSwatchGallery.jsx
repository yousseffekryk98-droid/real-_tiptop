import { useState, useRef } from "react";
import { T } from "../../config/tokens";

export function VariantSwatchGallery({ variants = [] }) {
  const [swatches, setSwatches] = useState(variants.map((v, idx) => ({
    id: idx,
    name: v.size || v.style || `Variant ${idx + 1}`,
    color: v.color || "#d4af37",
    texture: null,
    textureUrl: null
  })));
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const [previewMode, setPreviewMode] = useState("grid"); // grid, gallery, 3d
  const fileInputRef = useRef(null);

  const handleTextureUpload = (e, swatchId) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSwatches(prev => prev.map(s =>
        s.id === swatchId
          ? { ...s, texture: file.name, textureUrl: event.target.result }
          : s
      ));
    };
    reader.readAsDataURL(file);
  };

  const updateSwatchColor = (swatchId, color) => {
    setSwatches(prev => prev.map(s =>
      s.id === swatchId ? { ...s, color } : s
    ));
  };

  const deleteTexture = (swatchId) => {
    setSwatches(prev => prev.map(s =>
      s.id === swatchId ? { ...s, texture: null, textureUrl: null } : s
    ));
  };

  const currentSwatch = swatches[selectedSwatch];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", height: "100%" }}>
      {/* Editor Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", overflow: "auto" }}>
        {/* Mode Selector */}
        <div>
          <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, fontWeight: 600, display: "block", marginBottom: "0.6rem" }}>
            Preview Mode
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem" }}>
            {[
              { id: "grid", label: "Grid View" },
              { id: "gallery", label: "Gallery" },
              { id: "3d", label: "3D View" }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setPreviewMode(mode.id)}
                style={{
                  padding: "0.6rem",
                  background: previewMode === mode.id ? T.gold : T.bg,
                  color: previewMode === mode.id ? T.surface : T.charcoal,
                  border: `1px solid ${previewMode === mode.id ? T.gold : T.border}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  transition: "all 0.2s"
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Swatch Editor */}
        <div style={{ padding: "1rem", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px" }}>
          <label style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, fontWeight: 600, display: "block", marginBottom: "0.6rem" }}>
            Edit Selected Swatch
          </label>

          {/* Swatch List */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.4rem", marginBottom: "1rem" }}>
            {swatches.map((swatch, idx) => (
              <button
                key={swatch.id}
                onClick={() => setSelectedSwatch(idx)}
                style={{
                  padding: "0.6rem 0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  background: selectedSwatch === idx ? T.goldDim : T.bg,
                  border: `1px solid ${selectedSwatch === idx ? T.gold : T.border}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background: swatch.color,
                    border: `2px solid ${T.border}`,
                    borderRadius: "3px"
                  }}
                />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: T.charcoal, flex: 1 }}>
                  {swatch.name}
                </span>
                {swatch.texture && (
                  <span style={{ fontSize: "0.65rem", color: T.green, fontWeight: 600 }}>
                    ✓ Texture
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Color Picker */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.7rem", textTransform: "uppercase", color: T.muted, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
              Color
            </label>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
              <input
                type="color"
                value={currentSwatch.color}
                onChange={(e) => updateSwatchColor(selectedSwatch, e.target.value)}
                style={{
                  width: "50px",
                  height: "40px",
                  border: `2px solid ${T.border}`,
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              />
              <input
                type="text"
                value={currentSwatch.color}
                onChange={(e) => updateSwatchColor(selectedSwatch, e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.4rem 0.6rem",
                  border: `1px solid ${T.border}`,
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontFamily: T.mono
                }}
              />
            </div>
          </div>

          {/* Texture Upload */}
          <div>
            <label style={{ fontSize: "0.7rem", textTransform: "uppercase", color: T.muted, fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
              Texture Image
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                padding: "0.8rem",
                background: T.bg,
                border: `2px dashed ${T.goldDim}`,
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: T.gold,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = T.goldDim;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = T.bg;
              }}
            >
              {currentSwatch.texture ? `📷 ${currentSwatch.texture} (Click to replace)` : "📤 Upload Texture"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleTextureUpload(e, selectedSwatch)}
              style={{ display: "none" }}
            />
            {currentSwatch.texture && (
              <button
                onClick={() => deleteTexture(selectedSwatch)}
                style={{
                  width: "100%",
                  padding: "0.4rem",
                  background: T.redDim,
                  border: `1px solid ${T.red}`,
                  borderRadius: "4px",
                  color: T.red,
                  cursor: "pointer",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  marginTop: "0.4rem"
                }}
              >
                Remove Texture
              </button>
            )}
          </div>
        </div>

        {/* Export Info */}
        <div style={{ padding: "1rem", background: T.bg, border: `1px solid ${T.border}`, borderRadius: "8px" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: T.muted, fontWeight: 600, marginBottom: "0.6rem" }}>
            Variants Ready
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: T.gold, fontFamily: T.mono }}>
            {swatches.length} swatches
          </div>
          <div style={{ fontSize: "0.7rem", color: T.muted, marginTop: "0.4rem" }}>
            {swatches.filter(s => s.texture).length} with textures
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div
        style={{
          background: previewMode === "3d" ? "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)" : "#fff",
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          overflow: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}
      >
        {previewMode === "grid" && (
          <GridPreview swatches={swatches} />
        )}
        {previewMode === "gallery" && (
          <GalleryPreview swatches={swatches} />
        )}
        {previewMode === "3d" && (
          <ThreeDPreview swatches={swatches} />
        )}
      </div>
    </div>
  );
}

// Grid preview component
function GridPreview({ swatches }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", width: "100%" }}>
      {swatches.map((swatch) => (
        <div
          key={swatch.id}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              background: swatch.textureUrl ? `url(${swatch.textureUrl})` : swatch.color,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: `3px solid ${T.border}`,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = `0 8px 24px rgba(200, 169, 110, 0.3)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: T.charcoal }}>
              {swatch.name}
            </div>
            <div style={{ fontSize: "0.65rem", color: T.muted, fontFamily: T.mono, marginTop: "0.2rem" }}>
              {swatch.color}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Gallery preview component
function GalleryPreview({ swatches }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = swatches[activeIdx];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: "500px" }}>
      {/* Main Image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1",
          background: current.textureUrl ? `url(${current.textureUrl})` : current.color,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: `4px solid ${T.gold}`,
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}
      />

      {/* Info */}
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: T.charcoal, margin: "0 0 0.4rem 0" }}>
          {current.name}
        </h3>
        <p style={{ fontSize: "0.85rem", color: T.muted, margin: "0 0 0.8rem 0" }}>
          {current.texture ? `📷 Texture: ${current.texture}` : "Color Only"}
        </p>
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: "0.8rem", overflow: "auto", justifyContent: "center" }}>
        {swatches.map((swatch, idx) => (
          <button
            key={swatch.id}
            onClick={() => setActiveIdx(idx)}
            style={{
              width: "60px",
              height: "60px",
              background: swatch.textureUrl ? `url(${swatch.textureUrl})` : swatch.color,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: `3px solid ${activeIdx === idx ? T.gold : T.border}`,
              borderRadius: "6px",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              if (activeIdx !== idx) {
                e.target.style.borderColor = T.goldDim;
              }
            }}
            onMouseLeave={(e) => {
              if (activeIdx !== idx) {
                e.target.style.borderColor = T.border;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 3D-style preview component
function ThreeDPreview({ swatches }) {
  return (
    <div
      style={{
        perspective: "1000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          transformStyle: "preserve-3d",
          animation: "rotate3d 20s infinite linear"
        }}
      >
        <style>{`
          @keyframes rotate3d {
            from { transform: rotateX(0deg) rotateY(0deg); }
            to { transform: rotateX(360deg) rotateY(360deg); }
          }
        `}</style>
        {swatches.slice(0, 6).map((swatch, idx) => {
          const rotation = (idx / swatches.slice(0, 6).length) * 360;
          return (
            <div
              key={swatch.id}
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                background: swatch.textureUrl ? `url(${swatch.textureUrl})` : swatch.color,
                backgroundSize: "cover",
                backgroundPosition: "center",
                left: "100px",
                top: "100px",
                border: `2px solid ${T.gold}`,
                borderRadius: "4px",
                transform: `rotateY(${rotation}deg) translateZ(180px)`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "0.4rem",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "#fff",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)"
              }}
            >
              {swatch.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
