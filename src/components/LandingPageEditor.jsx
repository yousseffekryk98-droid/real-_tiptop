import { useState } from "react";
import { T } from "../config/tokens";
import { LANDING_PAGE_CONFIG } from "../config/landingPageConfig";

export function LandingPageEditor({ onSave }) {
  const [config, setConfig] = useState(LANDING_PAGE_CONFIG);
  const [activeTab, setActiveTab] = useState("hero");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleImageUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Here you would typically send to backend
    localStorage.setItem("landingPageConfig", JSON.stringify(config));
    onSave?.(config);
    alert("Landing page updated successfully!");
  };

  const updateSlide = (idx, field, value) => {
    const updated = [...config.heroSlides];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, heroSlides: updated });
  };

  const addSlide = () => {
    const newSlide = {
      id: `slide-${config.heroSlides.length}`,
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
      alt: "New Slide",
      eyebrow: "New Slide",
      headline: "Your Headline Here",
      subheading: "Your subheading text here",
      cta: "Learn More",
      ctaHref: "#categories"
    };
    setConfig({ ...config, heroSlides: [...config.heroSlides, newSlide] });
  };

  const deleteSlide = (idx) => {
    if (config.heroSlides.length <= 1) {
      alert("You must keep at least one slide!");
      return;
    }
    const updated = config.heroSlides.filter((_, i) => i !== idx);
    setConfig({ ...config, heroSlides: updated });
  };

  const updateCategoryCard = (idx, field, value) => {
    const updated = [...config.categoryCards];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, categoryCards: updated });
  };

  const updateFeature = (idx, field, value) => {
    const updated = [...config.features];
    updated[idx] = { ...updated[idx], [field]: value };
    setConfig({ ...config, features: updated });
  };

  const addFeature = () => {
    const newFeature = {
      id: `feat-${config.features.length}`,
      title: "New Feature",
      description: "Feature description here",
      icon: "star"
    };
    setConfig({ ...config, features: [...config.features, newFeature] });
  };

  const deleteFeature = (idx) => {
    if (config.features.length <= 1) {
      alert("You must keep at least one feature!");
      return;
    }
    const updated = config.features.filter((_, i) => i !== idx);
    setConfig({ ...config, features: updated });
  };

  const addCategoryCard = () => {
    const newCard = {
      id: `cat-${config.categoryCards.length}`,
      number: String(config.categoryCards.length + 1).padStart(2, "0"),
      title: "New\nCategory",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
      alt: "Category",
      link: "#"
    };
    setConfig({ ...config, categoryCards: [...config.categoryCards, newCard] });
  };

  const deleteCategoryCard = (idx) => {
    if (config.categoryCards.length <= 1) {
      alert("You must keep at least one category!");
      return;
    }
    const updated = config.categoryCards.filter((_, i) => i !== idx);
    setConfig({ ...config, categoryCards: updated });
  };

  const updateAbout = (field, value) => {
    setConfig({ ...config, about: { ...config.about, [field]: value } });
  };

  const updateAboutStat = (idx, field, value) => {
    const updated = config.about.stats.map((s, i) => i === idx ? { ...s, [field]: value } : s);
    setConfig({ ...config, about: { ...config.about, stats: updated } });
  };

  const addAboutStat = () => {
    const newStat = { value: "0", label: "New Stat" };
    setConfig({ ...config, about: { ...config.about, stats: [...config.about.stats, newStat] } });
  };

  const deleteAboutStat = (idx) => {
    if (config.about.stats.length <= 1) {
      alert("You must keep at least one stat!");
      return;
    }
    const updated = config.about.stats.filter((_, i) => i !== idx);
    setConfig({ ...config, about: { ...config.about, stats: updated } });
  };

  const updateShowcase = (field, value) => {
    setConfig({ ...config, showcase: { ...config.showcase, [field]: value } });
  };

  const updateHotspot = (idx, field, value) => {
    const updated = config.showcase.hotspots.map((h, i) => i === idx ? { ...h, [field]: value } : h);
    setConfig({ ...config, showcase: { ...config.showcase, hotspots: updated } });
  };

  const addHotspot = () => {
    const newHotspot = {
      id: config.showcase.hotspots.length,
      title: "New Hotspot",
      description: "Hotspot description",
      top: "50%",
      left: "50%"
    };
    setConfig({ ...config, showcase: { ...config.showcase, hotspots: [...config.showcase.hotspots, newHotspot] } });
  };

  const deleteHotspot = (idx) => {
    if (config.showcase.hotspots.length <= 1) {
      alert("You must keep at least one hotspot!");
      return;
    }
    const updated = config.showcase.hotspots.filter((_, i) => i !== idx);
    setConfig({ ...config, showcase: { ...config.showcase, hotspots: updated } });
  };

  const addLookbookItem = () => {
    const newItem = {
      id: config.lookbook.items.length,
      label: "New Item",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
      alt: "Lookbook Item"
    };
    setConfig({ ...config, lookbook: { ...config.lookbook, items: [...config.lookbook.items, newItem] } });
  };

  const deleteLookbookItem = (idx) => {
    if (config.lookbook.items.length <= 1) {
      alert("You must keep at least one lookbook item!");
      return;
    }
    const updated = config.lookbook.items.filter((_, i) => i !== idx);
    setConfig({ ...config, lookbook: { ...config.lookbook, items: updated } });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.8rem",
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    fontSize: "0.9rem",
    fontFamily: "inherit"
  };

  const fileInputStyle = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.8rem",
    border: `2px dashed ${T.gold}`,
    borderRadius: 6,
    fontSize: "0.9rem",
    fontFamily: "inherit",
    cursor: "pointer"
  };

  const imagePreviewStyle = {
    maxWidth: "100%",
    maxHeight: "150px",
    borderRadius: 6,
    marginBottom: "0.8rem",
    border: `1px solid ${T.border}`
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: T.muted,
    marginBottom: "0.3rem"
  };

  const sectionStyle = {
    padding: "1.2rem",
    marginBottom: "1rem",
    background: "#fff",
    border: `1px solid ${T.border}`,
    borderRadius: 8
  };

  const tabStyle = (active) => ({
    padding: "0.7rem 1.2rem",
    border: "none",
    background: active ? T.gold : "#f5f5f5",
    color: active ? T.black : T.muted,
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500,
    transition: "all 0.2s",
    borderBottom: active ? `3px solid ${T.gold}` : "none"
  });

  return (
    <div style={{ overflow: "auto", flex: 1 }}>
      <div style={{ padding: "1.2rem" }}>
        <h2 style={{ marginBottom: "1.2rem", fontSize: "1.4rem", fontWeight: 600 }}>Landing Page Editor</h2>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.8rem" }}>
          {["hero", "categories", "features", "about", "showcase", "lookbook", "footer"].map((tab) => (
            <button
              key={tab}
              style={tabStyle(activeTab === tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* HERO SLIDES */}
        {activeTab === "hero" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Hero Slides ({config.heroSlides.length})</h3>
              <button
                onClick={addSlide}
                style={{
                  padding: "0.5rem 1rem",
                  background: T.gold,
                  color: T.black,
                  border: "none",
                  borderRadius: 6,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = T.goldLight}
                onMouseOut={(e) => e.target.style.background = T.gold}
              >
                + Add Slide
              </button>
            </div>
            {config.heroSlides.map((slide, idx) => (
              <div key={idx} style={sectionStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <h4 style={{ color: T.muted, margin: 0 }}>Slide {idx + 1}</h4>
                  {config.heroSlides.length > 1 && (
                    <button
                      onClick={() => deleteSlide(idx)}
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.background = "#ffcdd2"}
                      onMouseOut={(e) => e.target.style.background = "#ffebee"}
                    >
                      Delete Slide
                    </button>
                  )}
                </div>
                <label style={labelStyle}>Eyebrow</label>
                <input
                  style={inputStyle}
                  value={slide.eyebrow}
                  onChange={(e) => updateSlide(idx, "eyebrow", e.target.value)}
                />
                <label style={labelStyle}>Headline</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "60px" }}
                  value={slide.headline}
                  onChange={(e) => updateSlide(idx, "headline", e.target.value)}
                />
                <label style={labelStyle}>Subheading</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "60px" }}
                  value={slide.subheading}
                  onChange={(e) => updateSlide(idx, "subheading", e.target.value)}
                />
                <label style={labelStyle}>CTA Text</label>
                <input
                  style={inputStyle}
                  value={slide.cta}
                  onChange={(e) => updateSlide(idx, "cta", e.target.value)}
                />
                <label style={labelStyle}>Image</label>
                {slide.img && (
                  <div>
                    <img src={slide.img} alt="Preview" style={imagePreviewStyle} />
                    <button
                      onClick={() => updateSlide(idx, "img", "")}
                      style={{
                        width: "100%",
                        padding: "0.4rem",
                        marginBottom: "0.8rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.8rem",
                        cursor: "pointer"
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={fileInputStyle}
                  onChange={(e) => {
                    handleImageUpload(e.target.files?.[0], (base64) => {
                      updateSlide(idx, "img", base64);
                      e.target.value = "";
                    });
                  }}
                />
                <p style={{ fontSize: "0.75rem", color: T.muted, marginBottom: "0.8rem" }}>
                  Or paste URL below:
                </p>
                <input
                  style={inputStyle}
                  placeholder="https://..."
                  value={slide.img && slide.img.startsWith("http") ? slide.img : ""}
                  onChange={(e) => updateSlide(idx, "img", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === "categories" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Category Cards ({config.categoryCards.length})</h3>
              <button
                onClick={addCategoryCard}
                style={{
                  padding: "0.5rem 1rem",
                  background: T.gold,
                  color: T.black,
                  border: "none",
                  borderRadius: 6,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = T.goldLight}
                onMouseOut={(e) => e.target.style.background = T.gold}
              >
                + Add Category
              </button>
            </div>
            {config.categoryCards.map((cat, idx) => (
              <div key={idx} style={sectionStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <h4 style={{ color: T.muted, margin: 0 }}>Category {idx + 1}</h4>
                  {config.categoryCards.length > 1 && (
                    <button
                      onClick={() => deleteCategoryCard(idx)}
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.background = "#ffcdd2"}
                      onMouseOut={(e) => e.target.style.background = "#ffebee"}
                    >
                      Delete Category
                    </button>
                  )}
                </div>
                <label style={labelStyle}>Number</label>
                <input
                  style={inputStyle}
                  value={cat.number}
                  onChange={(e) => updateCategoryCard(idx, "number", e.target.value)}
                />
                <label style={labelStyle}>Title</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "60px" }}
                  value={cat.title}
                  onChange={(e) => updateCategoryCard(idx, "title", e.target.value)}
                />
                <label style={labelStyle}>Image</label>
                {cat.img && (
                  <div>
                    <img src={cat.img} alt="Preview" style={imagePreviewStyle} />
                    <button
                      onClick={() => updateCategoryCard(idx, "img", "")}
                      style={{
                        width: "100%",
                        padding: "0.4rem",
                        marginBottom: "0.8rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.8rem",
                        cursor: "pointer"
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={fileInputStyle}
                  onChange={(e) => {
                    handleImageUpload(e.target.files?.[0], (base64) => {
                      updateCategoryCard(idx, "img", base64);
                      e.target.value = "";
                    });
                  }}
                />
                <p style={{ fontSize: "0.75rem", color: T.muted, marginBottom: "0.8rem" }}>
                  Or paste URL below:
                </p>
                <input
                  style={inputStyle}
                  placeholder="https://..."
                  value={cat.img && cat.img.startsWith("http") ? cat.img : ""}
                  onChange={(e) => updateCategoryCard(idx, "img", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* FEATURES */}
        {activeTab === "features" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Features ({config.features.length})</h3>
              <button
                onClick={addFeature}
                style={{
                  padding: "0.5rem 1rem",
                  background: T.gold,
                  color: T.black,
                  border: "none",
                  borderRadius: 6,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = T.goldLight}
                onMouseOut={(e) => e.target.style.background = T.gold}
              >
                + Add Feature
              </button>
            </div>
            {config.features.map((feat, idx) => (
              <div key={idx} style={sectionStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <h4 style={{ color: T.muted, margin: 0 }}>Feature {idx + 1}</h4>
                  {config.features.length > 1 && (
                    <button
                      onClick={() => deleteFeature(idx)}
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.background = "#ffcdd2"}
                      onMouseOut={(e) => e.target.style.background = "#ffebee"}
                    >
                      Delete Feature
                    </button>
                  )}
                </div>
                <label style={labelStyle}>Title</label>
                <input
                  style={inputStyle}
                  value={feat.title}
                  onChange={(e) => updateFeature(idx, "title", e.target.value)}
                />
                <label style={labelStyle}>Description</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "60px" }}
                  value={feat.description}
                  onChange={(e) => updateFeature(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>About Section</h3>
            <div style={sectionStyle}>
              <label style={labelStyle}>Eyebrow</label>
              <input
                style={inputStyle}
                value={config.about.eyebrow}
                onChange={(e) => updateAbout("eyebrow", e.target.value)}
              />
              <label style={labelStyle}>Title</label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px" }}
                value={config.about.title}
                onChange={(e) => updateAbout("title", e.target.value)}
              />
              <label style={labelStyle}>Body</label>
              <textarea
                style={{ ...inputStyle, minHeight: "100px" }}
                value={config.about.body}
                onChange={(e) => updateAbout("body", e.target.value)}
              />
              <label style={labelStyle}>CTA Text</label>
              <input
                style={inputStyle}
                value={config.about.cta}
                onChange={(e) => updateAbout("cta", e.target.value)}
              />
              <label style={labelStyle}>Image</label>
              {config.about.img && (
                <div>
                  <img src={config.about.img} alt="Preview" style={imagePreviewStyle} />
                  <button
                    onClick={() => updateAbout("img", "")}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      marginBottom: "0.8rem",
                      background: "#ffebee",
                      color: "#c62828",
                      border: `1px solid #ef5350`,
                      borderRadius: 4,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                style={fileInputStyle}
                onChange={(e) => {
                  handleImageUpload(e.target.files?.[0], (base64) => {
                    updateAbout("img", base64);
                    e.target.value = "";
                  });
                }}
              />
              <p style={{ fontSize: "0.75rem", color: T.muted, marginBottom: "0.8rem" }}>
                Or paste URL below:
              </p>
              <input
                style={inputStyle}
                placeholder="https://..."
                value={config.about.img && config.about.img.startsWith("http") ? config.about.img : ""}
                onChange={(e) => updateAbout("img", e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem", marginBottom: "1rem" }}>
              <h4 style={{ margin: 0 }}>Stats ({config.about.stats.length})</h4>
              <button
                onClick={addAboutStat}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: T.gold,
                  color: T.black,
                  border: "none",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = T.goldLight}
                onMouseOut={(e) => e.target.style.background = T.gold}
              >
                + Add Stat
              </button>
            </div>
            {config.about.stats.map((stat, idx) => (
              <div key={idx} style={{ ...sectionStyle, padding: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <label style={labelStyle}>Stat {idx + 1}</label>
                  {config.about.stats.length > 1 && (
                    <button
                      onClick={() => deleteAboutStat(idx)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <label style={labelStyle}>Label</label>
                <input
                  style={inputStyle}
                  value={stat.label}
                  onChange={(e) => updateAboutStat(idx, "label", e.target.value)}
                />
                <label style={labelStyle}>Value</label>
                <input
                  style={inputStyle}
                  value={stat.value}
                  onChange={(e) => updateAboutStat(idx, "value", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* SHOWCASE */}
        {activeTab === "showcase" && (
          <div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Showcase/Craftsmanship</h3>
            <div style={sectionStyle}>
              <label style={labelStyle}>Eyebrow</label>
              <input
                style={inputStyle}
                value={config.showcase.eyebrow}
                onChange={(e) => updateShowcase("eyebrow", e.target.value)}
              />
              <label style={labelStyle}>Title</label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px" }}
                value={config.showcase.title}
                onChange={(e) => updateShowcase("title", e.target.value)}
              />
              <label style={labelStyle}>Body</label>
              <textarea
                style={{ ...inputStyle, minHeight: "100px" }}
                value={config.showcase.body}
                onChange={(e) => updateShowcase("body", e.target.value)}
              />
              <label style={labelStyle}>Image</label>
              {config.showcase.img && (
                <div>
                  <img src={config.showcase.img} alt="Preview" style={imagePreviewStyle} />
                  <button
                    onClick={() => updateShowcase("img", "")}
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      marginBottom: "0.8rem",
                      background: "#ffebee",
                      color: "#c62828",
                      border: `1px solid #ef5350`,
                      borderRadius: 4,
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                style={fileInputStyle}
                onChange={(e) => {
                  handleImageUpload(e.target.files?.[0], (base64) => {
                    updateShowcase("img", base64);
                    e.target.value = "";
                  });
                }}
              />
              <p style={{ fontSize: "0.75rem", color: T.muted, marginBottom: "0.8rem" }}>
                Or paste URL below:
              </p>
              <input
                style={inputStyle}
                placeholder="https://..."
                value={config.showcase.img && config.showcase.img.startsWith("http") ? config.showcase.img : ""}
                onChange={(e) => updateShowcase("img", e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem", marginBottom: "1rem" }}>
              <h4 style={{ margin: 0 }}>Hotspots ({config.showcase.hotspots.length})</h4>
              <button
                onClick={addHotspot}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: T.gold,
                  color: T.black,
                  border: "none",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = T.goldLight}
                onMouseOut={(e) => e.target.style.background = T.gold}
              >
                + Add Hotspot
              </button>
            </div>
            {config.showcase.hotspots.map((spot, idx) => (
              <div key={idx} style={{ ...sectionStyle, padding: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <label style={labelStyle}>Hotspot {spot.id + 1}</label>
                  {config.showcase.hotspots.length > 1 && (
                    <button
                      onClick={() => deleteHotspot(idx)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <label style={labelStyle}>Title</label>
                <input
                  style={inputStyle}
                  value={spot.title}
                  onChange={(e) => updateHotspot(idx, "title", e.target.value)}
                />
                <label style={labelStyle}>Description</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "60px" }}
                  value={spot.description}
                  onChange={(e) => updateHotspot(idx, "description", e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        {activeTab === "footer" && (
          <div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Footer</h3>
            <div style={sectionStyle}>
              <label style={labelStyle}>Tagline</label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px" }}
                value={config.footer.tagline}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, tagline: e.target.value } })}
              />
              <label style={labelStyle}>Newsletter Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: "60px" }}
                value={config.footer.newsletter}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, newsletter: e.target.value } })}
              />
              <label style={labelStyle}>Copyright</label>
              <textarea
                style={{ ...inputStyle, minHeight: "60px" }}
                value={config.footer.copyright}
                onChange={(e) => setConfig({ ...config, footer: { ...config.footer, copyright: e.target.value } })}
              />
            </div>
          </div>
        )}

        {/* LOOKBOOK */}
        {activeTab === "lookbook" && (
          <div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Lookbook Section</h3>
            <div style={sectionStyle}>
              <label style={labelStyle}>Eyebrow</label>
              <input
                style={inputStyle}
                value={config.lookbook.eyebrow}
                onChange={(e) => setConfig({ ...config, lookbook: { ...config.lookbook, eyebrow: e.target.value } })}
              />
              <label style={labelStyle}>Title</label>
              <textarea
                style={{ ...inputStyle, minHeight: "60px" }}
                value={config.lookbook.title}
                onChange={(e) => setConfig({ ...config, lookbook: { ...config.lookbook, title: e.target.value } })}
              />
              <label style={labelStyle}>CTA</label>
              <input
                style={inputStyle}
                value={config.lookbook.cta}
                onChange={(e) => setConfig({ ...config, lookbook: { ...config.lookbook, cta: e.target.value } })}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem", marginBottom: "1rem" }}>
              <h4 style={{ margin: 0 }}>Items ({config.lookbook.items.length})</h4>
              <button
                onClick={addLookbookItem}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: T.gold,
                  color: T.black,
                  border: "none",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = T.goldLight}
                onMouseOut={(e) => e.target.style.background = T.gold}
              >
                + Add Item
              </button>
            </div>
            {config.lookbook.items.map((item, idx) => (
              <div key={idx} style={{ ...sectionStyle, padding: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <label style={labelStyle}>Item {idx + 1}</label>
                  {config.lookbook.items.length > 1 && (
                    <button
                      onClick={() => deleteLookbookItem(idx)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <label style={labelStyle}>Label</label>
                <input
                  style={inputStyle}
                  value={item.label}
                  onChange={(e) => {
                    const updated = config.lookbook.items.map((it, i) => i === idx ? { ...it, label: e.target.value } : it);
                    setConfig({ ...config, lookbook: { ...config.lookbook, items: updated } });
                  }}
                />
                <label style={labelStyle}>Image</label>
                {item.img && (
                  <div>
                    <img src={item.img} alt="Preview" style={imagePreviewStyle} />
                    <button
                      onClick={() => {
                        const updated = config.lookbook.items.map((it, i) => i === idx ? { ...it, img: "" } : it);
                        setConfig({ ...config, lookbook: { ...config.lookbook, items: updated } });
                      }}
                      style={{
                        width: "100%",
                        padding: "0.4rem",
                        marginBottom: "0.8rem",
                        background: "#ffebee",
                        color: "#c62828",
                        border: `1px solid #ef5350`,
                        borderRadius: 4,
                        fontSize: "0.8rem",
                        cursor: "pointer"
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={fileInputStyle}
                  onChange={(e) => {
                    handleImageUpload(e.target.files?.[0], (base64) => {
                      const updated = config.lookbook.items.map((it, i) => i === idx ? { ...it, img: base64 } : it);
                      setConfig({ ...config, lookbook: { ...config.lookbook, items: updated } });
                      e.target.value = "";
                    });
                  }}
                />
                <p style={{ fontSize: "0.75rem", color: T.muted, marginBottom: "0.8rem" }}>
                  Or paste URL below:
                </p>
                <input
                  style={inputStyle}
                  placeholder="https://..."
                  value={item.img && item.img.startsWith("http") ? item.img : ""}
                  onChange={(e) => {
                    const updated = config.lookbook.items.map((it, i) => i === idx ? { ...it, img: e.target.value } : it);
                    setConfig({ ...config, lookbook: { ...config.lookbook, items: updated } });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Save Button */}
        <div style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "1rem",
              background: T.gold,
              color: T.black,
              border: "none",
              borderRadius: 8,
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseOver={(e) => e.target.style.background = T.goldLight}
            onMouseOut={(e) => e.target.style.background = T.gold}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
