import React, { useState } from "react";
import "./Hero.css";

const images = [
  "/images/2 (1).jpg",
  "/images/2 (2).jpg",
  "/images/2 (3).jpg",
  "/images/2 (4).jpg",
  "/images/2 (5).jpg",
  "/images/2 (6).jpg"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateHeadline = () =>
  getRandom([
    "Empower Ideas with Intelligence",
    "Launch Boldly into the Future",
    "Build Brilliance with AI",
    "Transform How the Web Thinks",
    "Innovate at the Speed of Thought"
  ]);

const generateSubheadline = () =>
  getRandom([
    "Tools that learn with you, not just for you.",
    "AI meets imagination — and then some.",
    "Think it. Click it. Launch it.",
    "A smarter way to prototype and ship.",
    "Where design, code, and AI meet."
  ]);

export default function Hero() {
  const [imageA, setImageA] = useState(getRandom(images));
  const [imageB, setImageB] = useState(null);
  const [showA, setShowA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [headline, setHeadline] = useState(generateHeadline());
  const [subheadline, setSubheadline] = useState(generateSubheadline());

  const regenerate = () => {
    const nextImage = getRandom(images);
    const newHeadline = generateHeadline();
    const newSubheadline = generateSubheadline();

    setLoading(true);

    const img = new Image();
    img.src = nextImage;
    img.onload = () => {
      if (showA) {
        setImageB(nextImage);
      } else {
        setImageA(nextImage);
      }

      setHeadline(newHeadline);
      setSubheadline(newSubheadline);
      setShowA(!showA);
      setLoading(false);
    };
  };

  return (
    <section className="hero">
      <div className="hero-image-wrapper">
        <img
          src={imageA}
          alt="Background A"
          className={`hero-image ${showA ? "fade-in" : "fade-out"}`}
        />
        {imageB && (
          <img
            src={imageB}
            alt="Background B"
            className={`hero-image ${!showA ? "fade-in" : "fade-out"}`}
          />
        )}
        <div className="overlay" />
      </div>
      <div className="hero-content">
        <h1
          className="editable"
          contentEditable
          suppressContentEditableWarning
        >
          {headline}
        </h1>
        <p
          className="editable sub"
          contentEditable
          suppressContentEditableWarning
        >
          {subheadline}
        </p>
        <div className="hero-buttons">
          <button className="regen-btn" onClick={regenerate} disabled={loading}>
            {loading ? "Generating..." : "Regenerate with AI"}
          </button>
        </div>
      </div>
    </section>
  );
}
