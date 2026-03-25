import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Mis Trabajos <strong className="purple">Recientes </strong>
        </h1>
        <p style={{ color: "white" }}>
          Aquí hay algunos proyectos en los que he trabajado recientemente.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Dashboard de Ventas – Power BI"
              description="Análisis de dataset de ventas para identificar tendencias comerciales mediante la creación de dashboards interactivos para visualización de KPIs usando herramientas de Business Intelligence."
              ghLink="https://github.com/danielisaacdev"
              // demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Análisis de Datos con Python"
              description="Limpieza y preparación de datos utilizando Python (Pandas, Numpy) con análisis exploratorio para identificar patrones y métricas relevantes de negocio."
              ghLink="https://github.com/danielisaacdev"
              // demoLink=""
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
