import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Video = () => {
  return(
    <div>
        <iframe id = 'video' width="560" height="315" src="https://www.youtube.com/embed/FKxsuy1UxJY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default connect()(Video);
