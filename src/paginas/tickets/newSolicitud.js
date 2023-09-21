import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // Importa sweetalert
import APIInvoke from '../../utils/APIInvoke';
import Navbar from '../../componentes/Navbar';

const NewSolicitud = () => {
  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState({
    empresa: '',
    solicitud_cliente: '',
    fecha: '', // Agrega el campo fecha
  });

  const { empresa, solicitud_cliente, fecha } = solicitud;

  const onChange = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value,
    });
  };

  const enviarSolicitud = async () => {
    const data = {
      empresa: solicitud.empresa,
      solicitud_cliente: solicitud.solicitud_cliente,
      fecha: solicitud.fecha, // Incluye la fecha en los datos enviados
    };

    try {
      const response = await APIInvoke.invokePOST('/Tickets', data);

      if (response) {
        if (response.status === 201) {
          console.log('Solicitud de ticket enviada:', response.data);

          // Muestra una alerta de éxito
          swal({
            title: 'Éxito',
            text: 'El ticket se ha creado con éxito.',
            icon: 'success',
          }).then(() => {
            // Redirige a la página de inicio (ruta "/")
            navigate('/');
          });
        } else {
          console.error('Error al enviar la solicitud de ticket:', response.data);
        }
      } else {
        console.error('Error al enviar la solicitud de ticket: respuesta indefinida');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de ticket:', error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    enviarSolicitud();
  };

  return (
    <div className="wrapper">
      <Navbar />
      <div className="content-wrapper">
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Nueva Solicitud de Ticket</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="empresa">Empresa:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="empresa"
                    name="empresa"
                    value={empresa}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="solicitud_cliente">Solicitud del Cliente:</label>
                  <textarea
                    className="form-control"
                    id="solicitud_cliente"
                    name="solicitud_cliente"
                    value={solicitud_cliente}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar Solicitud de Ticket
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewSolicitud;
