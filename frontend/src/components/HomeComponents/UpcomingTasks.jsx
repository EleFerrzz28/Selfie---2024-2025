import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { useGetActQuery } from '../../redux/calendar/actApiSlice';
import "../NotesComponents/NotesList.css";
import './UpcomingTasks.css';


const UpcomingTasks = () => {
  const result = useGetActQuery(undefined, { refetchOnMountOrArgChange: true });
  const activities = result.data !== undefined ? result.data : [];
  const isLoading = result.isLoading;
  const error = result.error;

  const sortedActivities = [...activities].sort((a, b) =>
    DateTime.fromISO(a.deadline) - DateTime.fromISO(b.deadline)
  );

  const maxLength = 12;
  const upcomingTwo = sortedActivities.slice(0, 2);

  const truncateTitle = (title) =>
    title.length > maxLength ? 
    title.substr(0, maxLength) + "..."
      : title || "No title available";


  /*DA MODIFICARE PER LA TIME MACHINE */

  const getStatus = (deadline) => {
    const now = DateTime.now();
    const dl = DateTime.fromISO(deadline).endOf('day');

  /*--------------------------------------------- */

    if (dl < now) return 'expired';
    if (dl <= now.plus({ weeks: 1 })) return 'red';          
    if (dl <= now.plus({ weeks: 4 })) return 'orange';       
    return 'green';                                          
  };


  const statusLabel = {
    expired: 'expired',
    red: 'due soon',
    orange: 'coming',
    green: 'ongoing',
  };

  const statusColor = {
    expired: 'text-muted',
    red: 'text-danger',      
    orange: 'text-warning',
    green: 'text-success',
  };


  const statusBg = {
    expired: 'rgb(216, 216, 216)',  
    red: '#D63031',      
    orange: '#FABE58',  
    green: 'rgba(149, 215, 108, 1)',   
  };



  return (
    <div className="UpcomingTasks mt-3 ms-3">
      <header className="tasks-header">Activities</header>
      <div className="tasks-wrapper">
        {upcomingTwo.length > 0 ? (
          upcomingTwo.map((act) => {
            const status = getStatus(act.deadline);
            return (
              <div 
              key={act._id} 
              className="task"
              style={{ '--status-color': statusBg[status] }}
              >
                <div className="task-icon">
                <i class='bx-sm bx-calendar-event'></i> 
                </div>
                <div className="container d-flex justify-content-around align-items-center">
                  <div className="task-info">{truncateTitle(act.title)}</div>
                  <div className="task-info">
                    {DateTime.fromISO(act.deadline).toFormat('yyyy-MM-dd')}
                  </div>
                  <div className='status__wrapper'> 
                    <div className={`task-info ${statusColor[status]}`}>
                    {statusLabel[status]}
                  </div>
                  </div>
                  
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-4 ms-3">No upcoming activities.</p>
        )}
      </div>
    </div>
  );
};


export default UpcomingTasks;


