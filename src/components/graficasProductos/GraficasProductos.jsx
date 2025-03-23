import './GraficasProductos.css'
import GraficaImg from '../../assets/grafica.jpg'

export default function graficasProductos() {
    return (
        <>
            <section className="section-graficas-cc">
                <div className="contenedor contenedor-grafica">
                    <div className="contenedor-izq-gra">
                        <h3>Nuestras Gráficas</h3>
                        <p>Descubre las gráficas que muestran el rendimiento de nuestros productos más vendidos.</p>

                    </div>
                    <div className="contenedor-der-gra">
                        <figure>
                            <img className='imagen-grafica' src={GraficaImg} alt="" />
                        </figure>
                    </div>
                </div>
            </section>

        </>
    )
}
