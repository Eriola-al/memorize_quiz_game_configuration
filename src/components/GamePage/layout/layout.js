import React , {useState} from 'react';
import VideoTemplate from '../../../assests/border_template.mp4';
import VideoTemplate2 from '../../../assests/digital_template.mp4';
import '../styles/layout.css';


const Layout = (props) => {
    const [state, setState] = useState(VideoTemplate);

  const handleChange = () => {
    if (state === VideoTemplate) {
      setState(VideoTemplate2);
    } else {
      setState(VideoTemplate);
    }
  };
  return (
          <div className="layout">
        <video autoPlay loop muted key={state}>
          <source src={state} type="video/mp4" />
        </video>
        <label className="switch">
          <input onChange={handleChange} type="checkbox" />
          <span className="slider round" />
        </label>
        {props.children}
 </div>
  )
}

export default Layout