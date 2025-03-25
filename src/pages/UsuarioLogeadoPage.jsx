import NavBar from "../components/navBar/Navbar";
import NavBarUsuario from "../components/navBarUsuario/NavBarUsuario";
import Banner from "../components/banner/Banner";
import Graficas from "../components/graficasProductos/GraficasProductos"
import CardsInfo from "../pages/MarketplacePage"
import Footer from "../components/footer/Footer"


export default function UsuarioLogeadoPage({ isLoggedIn }) {
  return (
    <>
      {/* Mostramos la barra correspondiente */}
      {isLoggedIn ? <NavBarUsuario /> : <NavBar />}
      <Banner />
      <Graficas/>
      <CardsInfo/>
      <Footer/>
      
    </>
  )
}
