import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './paginas/auth/login';
import './App.css';
import CrearCuenta from './paginas/auth/crearCuenta';
import Home from './paginas/home';
import TicketsSolicitudes from './paginas/tickets/TicketsSolicitud';
import Respuesta from './paginas/tickets/respuesta';
import NewSolicitud from './paginas/tickets/newSolicitud';
import User from './paginas/user';



function App() {
  return (
    <Fragment>
      <Router>
        <Routes>

          <Route path="/" exact element = {<Login/>}/>
          <Route path="/crearCuenta" exact element = {<CrearCuenta/>}/>
          <Route path='/Home' exact element ={<Home/>}/>
          <Route path='/User' exact element ={<User/>}/>
          <Route path="/NewSolicitud" element={<NewSolicitud />}/>
          <Route path='/Tickets' exact element ={<TicketsSolicitudes/>}/>
          <Route path="/Respuesta/:id" element={<Respuesta />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
