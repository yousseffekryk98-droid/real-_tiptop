import { useTheme, THEME_PRESETS, BG_MODES } from "../../contexts/ThemeContext";
import { T } from "../../config/tokens";

export function ThemeSettings() {
  const { primaryColor, setPrimaryColor, bgMode, setBgMode, currentTheme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}
    >
      {/* Color Presets */}
      <div>
        <label
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
            fontWeight: 600,
            display: "block",
            marginBottom: "0.8rem"
          }}
        >
          Brand Color
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.6rem"
          }}
        >
          {Object.entries(THEME_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => setPrimaryColor(key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem",
                border: `2px solid ${primaryColor === key ? preset.hex : T.border}`,
                background: "transparent",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                if (primaryColor !== key) {
                  e.currentTarget.style.borderColor = preset.hex;
                  e.currentTarget.style.background = preset.dim;
                }
              }}
              onMouseLeave={(e) => {
                if (primaryColor !== key) {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {/* Color Circle */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: preset.hex,
                  boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
                  border: `3px solid ${T.surface}`
                }}
              />

              {/* Text */}
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  color: primaryColor === key ? preset.hex : T.charcoal,
                  textAlign: "center",
                  letterSpacing: "0.05em"
                }}
              >
                {preset.name}
              </div>

              {/* Checkmark */}
              {primaryColor === key && (
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: preset.hex,
                    color: "#fff",
                    fontSize: "0.7rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Input */}
      <div>
        <label
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
            fontWeight: 600,
            display: "block",
            marginBottom: "0.8rem"
          }}
        >
          Custom Color
        </label>
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            alignItems: "center"
          }}
        >
          <input
            type="color"
            value={currentTheme.hex}
            onChange={(e) => {
              // Create temp preset for custom colors
              const hex = e.target.value;
              setPrimaryColor("custom");
              // Store in localStorage
              localStorage.setItem("tiptop_custom_color", hex);
              document.documentElement.style.setProperty("--primary-gold", hex);
            }}
            style={{
              width: "60px",
              height: "50px",
              border: `2px solid ${T.border}`,
              borderRadius: "6px",
              cursor: "pointer",
              padding: "4px"
            }}
          />
          <input
            type="text"
            value={currentTheme.hex}
            readOnly
            style={{
              flex: 1,
              padding: "0.6rem 0.8rem",
              border: `1px solid ${T.border}`,
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontFamily: T.mono,
              color: T.charcoal,
              background: T.sg
            }}
          />
        </div>
      </div>

      {/* Background Mode */}
      <div>
        <label
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: T.muted,
            fontWeight: 600,
            display: "block",
            marginBottom: "0.8rem"
          }}
        >
          Background Mode
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
          {Object.entries(BG_MODES).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => setBgMode(key)}
              style={{
                padding: "0.8rem",
                border: `2px solid ${bgMode === key ? T.gold : T.border}`,
                background: mode.bg,
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: key === "dark" ? "#ddd" : T.charcoal,
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
              onMouseEnter={(e) => {
                if (bgMode !== key) {
                  e.currentTarget.style.borderColor = T.gold;
                }
              }}
              onMouseLeave={(e) => {
                if (bgMode !== key) {
                  e.currentTarget.style.borderColor = T.border;
                }
              }}
            >
              {mode.name}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setPrimaryColor("gold");
          setBgMode("light");
          localStorage.removeItem("tiptop_theme");
        }}
        style={{
          padding: "0.7rem 1rem",
          background: T.redDim,
          border: `1px solid ${T.red}`,
          color: T.red,
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => {
          e.target.style.background = T.red;
          e.target.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = T.redDim;
          e.target.style.color = T.red;
        }}
      >
        Reset to Defaults
      </button>
    </div>
  );
}
