import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              PERMÍTEME <span className="purple"> PRESENTARME </span>
            </h1>
            <p className="home-about-body">
              Soy un estudiante de Ingeniería en Informática con gran interés en el
              análisis de datos, inteligencia de negocios y machine learning.
              <br />
              <br />
              Me especializo en herramientas como
              <i>
                <b className="purple">
                  {" "}
                  Python, SQL y Power BI.{" "}
                </b>
              </i>
              <br />
              <br />
              Mi pasión es transformar datos en información valiosa para la toma 
              de decisiones, explorando áreas como
              <i>
                <b className="purple">
                  {" "}
                  Data Analytics, Business Intelligence y Big Data.{" "}
                </b>
              </i>
              <br />
              <br />
              Actualmente estoy cursando mi carrera en
              <b className="purple"> Duoc UC </b> y desarrollando proyectos de 
              visualización de datos interactivos.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
