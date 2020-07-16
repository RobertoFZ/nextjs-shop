import React, { useState } from 'react';
import Link from 'next/link';
import { withCookie, Cookie } from 'next-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface window {
  }
}

const Navbar = ({
  elementId,
  theme = 'dark',
  cookie,
  goToProfile = () => true,
}: {
  elementId: string,
  theme?: 'light' | 'dark',
  cookie?: Cookie,
  goToProfile?: Function
}) => {
  const [isOpen, setOpen] = useState(false);
  const [isExtended, setExtended] = useState(true);
  const menuAsset = theme == 'dark' ? 'menu' : 'menu-dark';

  if (process.browser) {
    window.onscroll = onScroll;
  }

  function onScroll() {
    const element = document.getElementById(elementId);
    if (!element) return;

    const position = element.getBoundingClientRect();

    // checking whether fully visible
    if (position.top >= 0 && position.bottom >= window.innerHeight) {
      setExtended(true);
    } else {
      setExtended(false);
    }
  }

  return (<div className={`navbar navbar-${theme} navbar${isExtended ? '-extended' : '-normal'}`}>
    {/*srcSet="/logo@2x.png 2x, /logo@3x.png 3x"  */}
    <Link href='/'><a><img src="/logo.png" className={`navbar-${theme}__logo`} /></a></Link>
    <img src={`/assets/${menuAsset}.png`} className='navbar__menu' onClick={() => setOpen(!isOpen)} />
    <ul className={`navbar-${theme}__items navbar${isOpen ? '-show' : '-hide'}`}>
      <li>
        <Link href='/'><a>Inicio</a></Link>
      </li>
      <li>
        <Link href='/shop'><a>Tienda</a></Link>
      </li>
      <li>
        <Link href='/about'><a>Nosotros</a></Link>
      </li>
      <li>
        <Link href='/contact'><a>Contacto</a></Link>
      </li>
      <li>
        <a href={`tel:${process.env.supportPhone}`}><FontAwesomeIcon icon={faPhone} color='#ffffff' />{process.env.supportPhone}</a>
      </li>
      <li>
        <Link href='/cart'><img className='navbar__cart' src='/icons/shopping-bag.png' /></Link>
      </li>
    </ul>
  </div>)
};
export default withCookie(Navbar);