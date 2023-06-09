import { selectTaskList } from 'redux/tasks/tasks.selectors';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format, isSameMonth, isWeekend, isToday  } from 'date-fns';
import styles from './CalendarTable.module.css';
import { useDate } from 'hooks/useDate';

export const CalendarTable = ({ totalDays }) => {
  const navigate = useNavigate();
  const taskList = useSelector(selectTaskList);
  const urlDate = useDate();

  const handleClick = date => {
    date = new Date(date);
    const formattedDate = format(date, 'ddMMMMyyyy');
    navigate(`/calendar/day/${formattedDate}`);
  };

  return (
    <div className={styles.calendar}>
      {totalDays.map((date, index) => {
        const tasks = taskList.filter(task => {
          const taskDay = new Date(task.date).getDate();
          const taskMonth = new Date(task.date).getMonth();
          const currentDay = date.getDate();
          const currentMonth = date.getMonth();
          return currentDay === taskDay && currentMonth === taskMonth;
        });

        return (
          <div
            className={styles.cell}
            key={index}
            onClick={() => handleClick(date)}
          >
            <div>
              <p
                className={`  ${
                  isWeekend(date, urlDate)
                    ? `${styles.day_number} ${styles.day_weekend}`
                    : `${styles.day_number}`
                }  ${
                  isSameMonth(date, urlDate)
                    ? `${styles.day_number}`
                    : `${styles.day_number} ${styles.day_number_special}`
                }
                ${
                  isToday(date, urlDate)
                    ? `${styles.day_today}`
                    : `${styles.day_number}`
                }`}
              >
                {format(date, 'd')}
              </p>
            </div>
            <ul className={styles.task_wrapper}>
              {tasks.length <= 2 && (
                <li>
                  {tasks.map(({ _id, title, priority }) => (
                    <p
                      key={_id}
                      className={`${styles.task_title} ${
                        priority === 'low'
                          ? styles.task_low
                          : priority === 'medium'
                          ? styles.task_medium
                          : priority === 'high'
                          ? styles.task_high
                          : ''
                      }`}
                    >
                      {title.slice(0, 9)}
                      {title.length > 9 && '...'}
                    </p>
                  ))}
                </li>
              )}
              {tasks.length > 2 && (
                <li>
                  {tasks.map(({ _id, priority }) => (
                    <div
                      key={_id}
                      className={`${styles.task_point} ${
                        priority === 'low'
                          ? styles.task_low
                          : priority === 'medium'
                          ? styles.task_medium
                          : priority === 'high'
                          ? styles.task_high
                          : ''
                      }`}
                    />
                  ))}
                </li>
              )}
            </ul> 
          </div>
        );
      })}
    </div>
  );
};