import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from '../../utils/APIInvoke';
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";
import bbdd from '../../bbdd.json';

const TicketsSolicitudes = () => {
  const [tickets, setTickets] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const ticketsData = bbdd.Tickets || [];
    const transformedTickets = ticketsData.map((ticket) => {
      return {
        ...ticket,
        mensaje_empleado: ticket.mensaje_empleado || null,
        fecha: ticket.fecha || '', // Agrega el campo fecha al ticket
      };
    });

    setTickets(transformedTickets);
  }, []);

  const handleResponderClick = () => {
    setMostrarFormulario(true);
  };

  const handleSubmitRespuesta = (e) => {
    e.preventDefault();
    setMostrarFormulario(false);
  };

  // Función para eliminar un ticket por su ID
  const eliminarTicket = async (id) => {
    try {
      // Realiza la eliminación del ticket mediante una solicitud DELETE
      const response = await APIInvoke.invokeDELETE(`/tickets/${id}`);
  
      if (response.status === 200) {
        // Si la eliminación es exitosa en el servidor, actualiza el estado local para reflejar la eliminación
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
        console.log("Ticket eliminado con éxito.");
      } else {
        console.error("Error al eliminar el ticket:", response.error);
      }
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
    }
  };
  

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Reclamos Clientes"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Solicitudes"}
          ruta1={"/Home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tickets</h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: 10 }}>#</th>
                    <th>Empresa</th>
                    <th>Solicitud Cliente</th>
                    <th>Fecha</th> {/* Agrega el encabezado para la fecha */}
                    <th>Mensaje Empleado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={index}>
                      <td>{ticket.id}</td>
                      <td>{ticket.empresa}</td>
                      <td>{ticket.solicitud_cliente}</td>
                      <td>{ticket.fecha}</td> {/* Muestra la fecha en la tabla */}
                      <td>{ticket.mensaje_empleado}</td>
                      <td>
                        {ticket.mensaje_empleado === null ? (
                          <>
                            <Link
                              to={`/Respuesta/${ticket.id}`}
                              className="btn btn-sm btn-primary"
                              onClick={handleResponderClick}
                            >
                              Responder
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => eliminarTicket(ticket.id)} // Llama a la función eliminarTicket
                            >
                              Eliminar
                            </button>
                          </>
                        ) : (
                          "Solucionado"
                        )}
                        {mostrarFormulario && (
                          <form onSubmit={handleSubmitRespuesta}>
                            <textarea
                              placeholder="Ingrese la respuesta..."
                            ></textarea>
                            <button type="submit" className="btn btn-sm btn-success">
                              Enviar Respuesta
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default TicketsSolicitudes;
