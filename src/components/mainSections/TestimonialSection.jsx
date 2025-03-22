import React from "react";
import "./TestimonialSection.css";

const TestimonialSection = () => {
  const testimonios = [
    {
      nombre: "Ana Torres",
      texto: "Campo Conecta transformó mi negocio rural.",
    },
    {
      nombre: "Luis Herrera",
      texto: "Ahora tengo acceso a más clientes y herramientas.",
    },
  ];

  return (
    <section className="testimonios">
      <h2>Testimonios</h2>
      {testimonios.map((t, i) => (
        <div key={i}>
          <blockquote>“{t.texto}”</blockquote>
          <p>- {t.nombre}</p>
        </div>
      ))}
    </section>
  );
};

export default TestimonialSection;
