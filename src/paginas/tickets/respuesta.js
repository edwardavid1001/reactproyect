import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useParams, useNavigate } from "react-router-dom"; // Importa useParams y useNavigate desde React Router
import bbdd from '../../bbdd.json';

const Respuesta = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const navigate = useNavigate(); // Obtén la función de navegación

  // Declarar un estado para almacenar la respuesta del usuario
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    // Extraer los datos de "Tickets" del archivo JSON
    const ticketsData = bbdd.Tickets || [];

    // Encuentra el ticket correspondiente al ID en la URL
    const ticket = ticketsData.find((ticket) => ticket.id === parseInt(id));

    if (ticket) {
      // Si se encuentra el ticket, actualiza la respuesta en el estado
      setRespuesta(ticket.mensaje_empleado || "");
      // Puedes usar el mensaje existente como valor inicial
    }
  }, [id]);

  // Función para manejar el cambio en el campo de respuesta
  const handleRespuestaChange = (e) => {
    setRespuesta(e.target.value);
  };

  // Función para manejar el envío de la respuesta
  const handleSubmitRespuesta = (e) => {
    e.preventDefault();

    // Actualiza el ticket correspondiente en el bbdd.json con la nueva respuesta
    bbdd.Tickets = bbdd.Tickets.map((ticket) => {
      if (ticket.id === parseInt(id)) {
        return {
          ...ticket,
          mensaje_empleado: respuesta,
        };
      }
      return ticket;
    });

    // Redirige al usuario a la página "Tickets"
    navigate("/Tickets");
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Responder Solicitud"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Responder Solicitud"}
          ruta1={"/Home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Respuesta</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitRespuesta}>
                <div className="form-group">
                  <label htmlFor="respuesta">Respuesta:</label>
                  <textarea
                    id="respuesta"
                    name="respuesta"
                    value={respuesta}
                    onChange={handleRespuestaChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-default">
                  Enviar Respuesta
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Respuesta;