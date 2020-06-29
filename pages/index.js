import React, { Fragment } from 'react';
import Head from 'next/head'
import DevicesQuery from './devices/devices.graphql';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/apollo';
import LoadingWapper from '../components/LoadingWrapper';
import HomeLayout from '../components/HomeLayout';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  // const { loading, error, data } = useQuery(DevicesQuery);
  // console.log({ loading, error, data });
  const loading = false;
  const error = false;
  const data = {};

  return (
    <Fragment>
      <Head>
        <title>Welcome Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Menu">
              <NavDropdown.Item>
                Devices
              </NavDropdown.Item>
              <NavDropdown.Item>
                Controller
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <main>
        <HomeLayout />
      </main>
    </Fragment>
  )
}

export default withApollo({ ssr: true })(Home);