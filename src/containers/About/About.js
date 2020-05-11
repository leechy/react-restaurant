import React from 'react';

import Layout from '../../hoc/Layout/Layout';

const About = (props) => {
  return (
    <Layout currentPathname={props.location.pathname}>
      <div className="content">
        <div className="wrapper">
         <h1>About</h1>
        </div>
      </div>
    </Layout>
  )
};

export default About;