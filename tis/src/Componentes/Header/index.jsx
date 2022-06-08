import { Link } from 'react-router-dom';
import { useState } from 'react';
import MiPerfil from '../Mi_Perfil';
import Example from '../Notificaciones';

const links = [
  {
    url: 'catalogo',
    name: 'Catálogo',
  },
];

function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <header className='header'>
      <nav className='nav'>
        <img className='logo' src='assets/imagenes/logo_facultad.png' alt='' />
        <p className='titulo'>Sistema de Reserva de Ambientes</p>
        <button className='nav-toggle' onClick={() => setToggle(!toggle)}>
          <i className='fa-solid fa-bars'></i>
        </button>

        <ul className={`menu-nav ${toggle ? 'nav-menu_visible' : ''}`}>
          <li className='item-nav-menu'>
            <MiPerfil />
          </li>

          {links.map(({ url, name }, idx) => (
            <li className='item-nav-menu' key={idx}>
              <Link to={url} className='nav-menu-link'>
                {name}
              </Link>
            </li>
          ))}
          <li className='item-nav-menu'>
            <Example />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

