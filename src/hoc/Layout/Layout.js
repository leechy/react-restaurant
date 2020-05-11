import React from 'react';

import Header from '../../components/Header/Header';

import './Layout.scss';

const Layout = (props) => {
  return (
    <React.Fragment>
      {
        props.currentPathname 
        ? <Header className={ props.currentPathname !== '/' ? '-colorBlack' : '' } />
        : <Header />
      }
      
      {props.children}
    </React.Fragment>
  )
}


export default Layout;