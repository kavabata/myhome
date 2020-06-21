import React, { Fragment } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

const LoadingWapper = ({ 
  children = null,
  className,
  isLoading
}) => (
  <div className={classnames(className, 'LoadingWrapper')}>
    {isLoading ? (
      <div className="LoadingHome">
        <h1 className="title">
          Welcome Home
        </h1>
        <Link href="/Contact"><a>Contact</a></Link>
      </div>
    ) : (
      children
    )}
  </div>
);

export default LoadingWapper;