// import react libraries
import React from 'react';

// import modules
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function Notifications() {
  const notifications = useSelector((state) => state.notifications.data);
  console.log('we have notifications: ', notifications);
  return (
    <section>
      <div className='card z-depth-0'>
        <div className='card-content'>
          <span className='card-title'>Notifications</span>
          <ul className='notifications'>
            {notifications &&
              notifications.map((item) => (
                <li key={item.id}>
                  <span className='pink-text'>{item.user} </span>
                  <span>{item.content}</span>
                  <div className='grey-text note-date'>{moment(new Date(item.time)).fromNow()}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
