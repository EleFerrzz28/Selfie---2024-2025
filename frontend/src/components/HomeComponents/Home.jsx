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
      className="container-fluid p-1 m-lg-0"
      data-theme={mode ? "dark" : "light"}
      style={{
        backgroundImage:'linear-gradient(60deg, var(--sunrise), var(--darkPurple)',
        transition: 'background-color 0.25s ease-in-out',
        overflow: 'hidden'
      }} >
        
        <div className='row m-0 mt-lg-3' id='main'>
          <div className='col-12 col-lg-7 col-md-12 order-2 order-lg-1' >
            <div className='row' id='left-section-container'>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 '> <WeatherApp/></div>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0'> <Review/> </div>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 mt-4'> <NoteCard/> </div>
              <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 mt-4'> <PomoCard/> </div>
              <div className='col-12'> <UpcomingTasks/> </div>
            </div>
           
              </div>
          <div className='col col-lg-5 col-md-12 d-flex flex-column align-items-center order-1 order-lg-2 m-0' > <Schedule/> </div>
        </div>


    </div>

  );
}



export default Home;

/*
<div className='welcome d-flex align-items-center'>
                  <img src={cat} style={{height: '80%', width: '20vh'}}/>
                  <div className='d-flex flex-column'>
                  <h3> Welcome  </h3> 
                  <h4> user! </h4>

                  </div>
                  
                </div>
*/




/*

  return (
    <div
      className="container-fluid p-1 m-lg-0"
      data-theme={mode ? "dark" : "light"}
      style={{
        background: 'var(--color-background)',
        transition: 'background-color 0.25s ease-in-out',
      }} >
        <div className='row' id='main'>
          <div className='col col-lg-7 col-sm-12 order-lg-1' style={{height: '99vh'}}>  
          <div className='row mt-3'>
            <div className='col col-lg-6 col-sm-12 d-flex flex-column align-items-center'> <WeatherApp/> <Chart/> </div>
            <div className='col col-lg-6 col-sm-12'> <NoteCard/> <PomoCard/> </div>   
          </div>
          </div>
          <div className='col col-lg-5 col-sm-12 order-lg-2 mt-md-5' style={{ height: '99vh', borderRadius: '1rem'}}> <Schedule/> </div>
        </div>


    </div>

  );
}


*/
