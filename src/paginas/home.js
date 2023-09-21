import React from 'react'
import Navbar from '../componentes/Navbar';
import SidebarContainer from '../componentes/SidebarContainer';
import ContentHeader from '../componentes/ContentHeader';
import Footer from '../componentes/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainer></SidebarContainer>
        <div className="content-wrapper">

            <ContentHeader
              titulo={"DashBoard"}
              breadCrumb1={"Inicio"}
              breadCrumb2={"DashBoard"}
              ruta1={"/Home"}
            />

            <section className="content">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-lg-4 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                            <h3>Solicitudes</h3>
                            <p>&nbsp;</p>
                            </div>
                            <div className="icon">
                              <i className="fa fa-eye" />
                            </div>
                            <Link to={"/Tickets"} className="small-box-footer">Ver Reclamos.<i className="fas fa-check" /></Link>
                          </div>
                        </div>
                      
                    </div>
                </div>
            </section>  
        </div>
        <Footer></Footer>
      </div>
      );
}
 
export default Home;
