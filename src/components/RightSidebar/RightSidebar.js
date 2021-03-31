import React from 'react';

const RightSidebar = (props) => {



  return (
    
      <div className="col-sm-3">
        {/* <div className="top-pane">a</div>
        <div className="middle-pane">b</div>
        <div className="bottom-pane"></div> */}


        {props.main}
      </div>
  )

}

export default RightSidebar;