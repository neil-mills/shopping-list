import React, { Fragment } from 'react';

export const withNotifications = (Component) => {
  const WithNotifications = (props) => {

    const notifications = ({ called, loading, error, data, key }) => (
      <Fragment>
        {loading && <p>Loading</p>}
        {error && <p>{error.message}</p>}
        {called && !loading && data && data[key] && (
          <p>
            {data[key].map((error,i) => (
              <Fragment key={i}>
                <span>{error.message}</span>
                <br />
              </Fragment>
            ))}
          </p>
        )}
        {called && !loading && !error && !data[key] && <p>Updated</p>}
      </Fragment>
    );
    return (<Component {...props} notifications={notifications} />)
  };
  return WithNotifications;
};
