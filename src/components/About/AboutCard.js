import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hola a todos! Soy <span className="purple">Daniel Isaac Elgueta</span>{" "}
            de <span className="purple">Santiago, Chile</span>.
            <br />
            Actualmente soy estudiante de <span className="purple">Ingeniería en Informática</span> en <span className="purple">Duoc UC</span>.
            <br />
            Mi enfoque está en el análisis de datos, la inteligencia de negocios y el machine learning, utilizando herramientas como Python y Power BI.
            <br />
            <br />
            Aparte de programar, algunas otras actividades que me encantan son:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Análisis de Datos 📊
            </li>
            <li className="about-activity">
              <ImPointRight /> Explorar nuevas tecnologías de IA 🤖
            </li>
            <li className="about-activity">
              <ImPointRight /> Aprender sobre Big Data ☁️
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Daniel Isaac Elgueta</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
