import { fetchConToken } from '../helpers/fecth';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    // Thunk posee tam bien la store
    const { uid, name } = getState().auth;

    try {
      const data = await fetchConToken('events', event, 'POST');
      const resp = await data.json();

      if (resp.ok) {
        event.id = resp.evento._id;
        event.user = {
          _id: uid,
          name: name,
        };

        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => {
  return {
    type: types.eventSetActive,
    payload: event,
  };
};

export const eventClearActiveEvent = () => ({
  type: types.clearActiveEvent,
});

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      const data = await fetchConToken(`events/${event._id}`, event, 'PUT');

      const resp = await data.json();

      if (resp.ok) {
        dispatch(eventUpdated(event));
      } else {
        alert('Error' + resp.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { _id } = getState().calendarReducer.activeEvent;

    try {
      const data = await fetchConToken(`events/${_id}`, {}, 'DELETE');

      const resp = await data.json();

      if (resp.ok) {
        dispatch(eventDelete());
      } else {
        alert('Error' + resp.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDelete = () => ({
  type: types.eventDelete,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const data = await fetchConToken('events');
      const resp = await data.json();

      const events = prepareEvents(resp.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
