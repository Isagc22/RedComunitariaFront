import NavBarUsuario from "../components/navBarUsuario/NavBarUsuario";
import VistaUsuariosAdmin from "../components/vistaUsuarios/VistaUsuarios";
import VistaComentariosYCalificaciones from "../components/vistaComentariosYCalificaciones/vistaComentariosYCalificaciones";
import VistaNegociosAdmin from "../components/vistaNegociosEmprendimientos/VistaNegociosEmprendimientos";


import React from 'react'

export default function VistaAdmin() {
  return (
    <>
      <VistaUsuariosAdmin />
      <VistaNegociosAdmin />
      
      <VistaComentariosYCalificaciones/>
      </>
  )
}
