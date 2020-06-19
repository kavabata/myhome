import React, { Fragment } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import DevicesQuery from './devices/devices.graphql';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/apollo';

const HomeLayout = ({
  data: { devices }
}) => {
  return (<div className="devices">
    {devices.map(({ name }) => <b>{name}</b> )}
  </div>)
};

const Home = () => {
  const { loading, error, data } = useQuery(DevicesQuery);
console.log({ loading, error, data });
  if (error) {
    return <h1>Error</h1>
  }

  return (
    <div className="container">
      <Head>
        <title>Welcome Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loading && (
          <Fragment>
            <h1 className="title">
              Welcome Home
            </h1>

            <Link href="/Contact">Contact</Link>
          </Fragment>
        )}
        {!loading && data && (<HomeLayout data={data} />)}
      </main>
    </div>
  )
}

export default withApollo({ ssr: true })(Home);