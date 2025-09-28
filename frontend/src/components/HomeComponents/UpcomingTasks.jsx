import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
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


  const TM_date = useSelector((state) => state.time.value);

  const getStatus = (deadline, completed) => {
    const now = DateTime.fromISO(TM_date); 
    const dl = DateTime.fromISO(deadline).endOf('day');


    if (completed) return 'completed';
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
    completed: 'completed'
  };

  const statusColor = {
    expired: 'text-muted',
    red: 'text-danger',
    orange: 'text-dark',
    green: 'text-success',
    completed: 'text-primary'
  };


  const statusBg = {
    expired: 'rgb(216, 216, 216)',
    red: '#ed8282ff',
    orange: '#ffdb9cff',
    green: 'rgba(186, 244, 149, 1)',
    completed: 'rgba(180, 233, 235, 1)',
  };



  return (
    <div className="UpcomingTasks mt-4 ms-3">
      <header className="tasks-header">Activities</header>
      <div className="tasks-wrapper">
        {upcomingTwo.length > 0 ? (
          upcomingTwo.map((act) => {
            const status = getStatus(act.deadline, act.completedAct);
            return (
              <div
                key={act._id}
                className="task"
                style={{ '--status-color': statusBg[status] }}
              >
                <div className="task-icon">
                  <i className='bx-sm bx-calendar-event'></i>
                </div>
                <div className="container d-flex justify-content-around align-items-center">
                  <div className="task-info">{truncateTitle(act.title)}</div>
                  <div className="task-info">
                    {DateTime.fromISO(act.deadline).toFormat('dd/MM/yy')}
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
          <p className="mt-4 ms-3" style ={{color: "white", fontWeight:"600"}}>No upcoming activities.</p>
        )}
      </div>
    </div>
  );
};


export default UpcomingTasks;


