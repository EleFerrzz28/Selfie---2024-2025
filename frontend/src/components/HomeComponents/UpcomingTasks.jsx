import './UpcomingTasks.css';
import { DateTime } from 'luxon';
import { useGetActQuery } from '../../redux/calendar/actApiSlice';

const UpcomingTasks = () => {
  const { data: activitiesData = [], isLoading } = useGetActQuery();

  if (isLoading) {
    return <p className="text-light ms-3">Loading activities...</p>;
  }

  // Ordino per scadenza (deadline)
  const sortedActivities = [...activitiesData].sort((a, b) =>
    DateTime.fromISO(a.deadline) - DateTime.fromISO(b.deadline)
  );

  // Prendo solo le prime 2
  const upcomingTwo = sortedActivities.slice(0, 2);

  // Funzione per lo stato
  const getStatus = (deadline) => {
    const deadlineDate = DateTime.fromISO(deadline).endOf('day');
    const now = DateTime.now();
    return deadlineDate < now ? "expired" : "ongoing";
  };

  return (
    <div className="UpcomingTasks mt-4 ms-3">
      <header className="tasks-header">Activities</header>
      <div className="tasks-wrapper">
        {upcomingTwo.length > 0 ? (
          upcomingTwo.map((act) => (
            <div key={act._id} className="task d-flex align-items-center">
              <div className="task-icon d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fillRule="currentColor"
                  className="bi bi-calendar-event"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              </div>
              <div className="container d-flex ms-3 justify-content-around align-items-center">
                <div className="task-info">{act.title}</div>
                <div className="task-info">
                  {DateTime.fromISO(act.deadline).toFormat("yyyy-MM-dd")}
                </div>
                <div
                  className={`task-info ${
                    getStatus(act.deadline) === "expired"
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {getStatus(act.deadline)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-light ms-3">No upcoming activities.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;


