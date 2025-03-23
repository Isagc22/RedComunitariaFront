import React from "react";
import "./ContentSection.css";

const ContentSection = ({ title, text, showButton }) => {
  return (
    <section className="content">
      <h2>{title}</h2>
      <p>{text}</p>
      {showButton && <button>START FOR FREE</button>}
    </section>
  );
};

export default ContentSection;
