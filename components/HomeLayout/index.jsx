import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import LoadingWapper from '../LoadingWrapper';
import Room from '../Room';
import RoomsQuery from '../Room/rooms.graphql';
import './HomeLayout.scss';

const HomeLayout = ({ isLoading, rooms }) => {
  // bg ration 2747 x 2135
  const paddingTop = `${100 * 2135 / 2747}%`;
  const layoutRef = React.createRef();

  return (
    <LoadingWapper isLoading={isLoading}>
      <div className="HomeLayout" style={{ paddingTop }} ref={layoutRef}>
        {rooms.map((room) => (<Room room={room} key={room.name} layoutRef={layoutRef} />))}
      </div>
    </LoadingWapper>
  );
};

export default graphql(RoomsQuery, {
  props: ({ data }) => ({
    isLoading: data.loading || false,
    rooms: data.rooms || []
  })
})(HomeLayout);
