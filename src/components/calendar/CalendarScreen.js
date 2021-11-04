import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../ui/Navbar';
import moment from 'moment';
import 'moment/locale/es';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles.css';
import { messages } from '../../helpers/messages';

import { CalendarEvent } from './CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/uiActions';
import { eventSetActive, eventStartLoading } from '../../actions/eventsActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es'); //Añadir idioma español despues de importarlo

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendarReducer);
  const { uid } = useSelector((state) => state.auth);

  const [lastWiev, setlastWiev] = useState(
    localStorage.getItem('lastWiev') || 'month'
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch, events]);

  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? '#367cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
      height: '50px',
    };

    return {
      style,
    };
  };

  const selecting = (e) => {};

  const onWievChange = (e) => {
    setlastWiev(e);
    localStorage.setItem('lastWiev', e);
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter} // Va a aplicar estilo al evento
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelecting={selecting}
        onView={onWievChange}
        view={lastWiev}
        titleAccessor={'PUTO TITULO'}
      />

      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};
