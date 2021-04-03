import React, { useState } from 'react';

export const IsLoading = (WrapperComponent, loadingMessage) => {
  function Loading(props) {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {
          isLoading &&  
          <div>
            <WrapperComponent {...props} setLoading={setLoadingState} />
          </div>
        }

      </>
    );


  }
};

export default IsLoading;