import './Footer.css'
import logoFooter from '../../assets/logo.png'
export default function Footer() {
    return (
        <>
            <section className="footer-section">
                <div className="contenedor">
                    <div className="informacion-relevante">   
                        <div className="contenedor-izq-cc"><figure><img src={logoFooter} alt="" /></figure></div>
                        <div className="contenedor-der-cc">
                            <ul className='footer'>
                                <li><strong>Compañia</strong></li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>

                            <ul className='footer'>
                                <li><strong>Recursos</strong></li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>

                            <ul className='footer'>
                                <li><strong>Acerca de</strong></li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                        </div></div>

                    <div className="copyrigth">
                        <p>Copyrigth© 2025 Campo Conecta</p>

                    </div>
                </div>
            </section>
        </>
    )
}
