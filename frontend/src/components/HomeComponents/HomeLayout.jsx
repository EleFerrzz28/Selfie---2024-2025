import { useGetLastUpdatedNoteQuery } from '../../redux/notes/notesApiSlice';
import { useGetLastSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice';
import { useGetAllNotesQuery } from "../../redux/notes/notesApiSlice";
import { useGetEventsQuery } from "../../redux/calendar/eventsApiSlice";
import { useGetActQuery } from "../../redux/calendar/actApiSlice";
import { useGetCatQuery } from "../../redux/calendar/catApiSlice";
import { useState, useEffect } from "react";

import Schedule from './Schedule';
import NoteCard from './NoteCard';
import PomoCard from './PomoCard';
import WeatherApp from './WeatherApp';
import Review from './Review';
import UpcomingTasks from './UpcomingTasks';
import LoadingScreen from './utils/LoadingScreen';


import '../NotesComponents/NotesList.css';
import './HomeLayout.css';


const Home = () => {
  /* Queries redux + stato del meteo */

  const { isLoading: loadingNote } = useGetLastUpdatedNoteQuery(undefined, { refetchOnMountOrArgChange: true });
  const { isLoading: loadingPomo } = useGetLastSessionQuery(undefined, { refetchOnMountOrArgChange: true });
  const { isLoading: loadingNotes } = useGetAllNotesQuery(undefined, { refetchOnMountOrArgChange: true });
  const { isLoading: loadingEvents } = useGetEventsQuery(undefined, { refetchOnMountOrArgChange: true });
  const { isLoading: loadingActs } = useGetActQuery(undefined, { refetchOnMountOrArgChange: true });
  const { isLoading: loadingCats } = useGetCatQuery(undefined, { refetchOnMountOrArgChange: true });

  const [loadingWeather, setLoadingWeather] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoadingWeather(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  /*-------------------------------------*/

  // controllo per caricamento in corso
  const isLoading =
    loadingNote ||
    loadingPomo ||
    loadingNotes ||
    loadingEvents ||
    loadingActs ||
    loadingCats ||
    loadingWeather;


  if (isLoading) {
    return <div
      style={{ minHeight: '100vh' }}>
      <LoadingScreen />
    </div>;
  }

  return (
    <div
      className="home container-fluid p-1 m-lg-0">
      <div className='row m-0 mt-lg-3' id='main'>
        <div className='col-12 col-lg-8 col-md-12 order-2 order-lg-1' >
          <div className='row' id='left-section-container'>
            <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0 '> <WeatherApp /></div>
            <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center m-0'> <Review /> </div>
            <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center mt-4'> <NoteCard /> </div>
            <div className='col-12 col-lg-6 col-md-12 d-flex align-items-center justify-content-center mt-4'> <PomoCard /> </div>
            <div className='col-12'> <UpcomingTasks /> </div>
          </div>
        </div>
        <div className='col col-lg-4 col-md-12 d-flex flex-column align-items-center order-1 order-lg-2 m-0' > <Schedule /> </div>
      </div>
    </div>
  );
}

export default Home;
