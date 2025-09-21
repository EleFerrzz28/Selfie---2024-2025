import Schedule from './Schedule';
import NoteCard from './NoteCard';
import PomoCard from './PomoCard';
import WeatherApp from './WeatherApp';
import Review from './Review';
import UpcomingTasks from './UpcomingTasks';
import { useSelector } from 'react-redux';

import './Home.css';




const Home = () => {
  const { mode } = useSelector((state) => state.theme);

  return (
    <div
      className="home container-fluid p-1 m-lg-0"
      data-theme={mode ? "dark" : "light"}
     >
        
        <div className='row m-0 mt-lg-3' id='main'>
          <div className='col-12 col-lg-8 col-md-12 order-2 order-lg-1' >
            <div className='row' id='left-section-container'>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 '> <WeatherApp/></div>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0'> <Review/> </div>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 mt-4'> <NoteCard/> </div>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 mt-4'> <PomoCard/> </div>
              <div className='col-12'> <UpcomingTasks/> </div>
            </div>
           
              </div>
          <div className='col col-lg-4 col-md-12 d-flex flex-column align-items-center order-1 order-lg-2 m-0' > <Schedule/> </div>
        </div>


    </div>

  );
}



export default Home;



