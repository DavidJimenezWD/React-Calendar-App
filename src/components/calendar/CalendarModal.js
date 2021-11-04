import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/uiActions';
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdated,
} from '../../actions/eventsActions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const now1 = moment().minutes(0).seconds(0).add(2, 'hours');

const initEvent = {
  title: 'Evento',
  notes: '',
  start: now.toDate(),
  end: now1.toDate(),
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.uiReducer);
  const { activeEvent } = useSelector((state) => state.calendarReducer);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateFinish, setDateFinish] = useState(now1.toDate());

  const [formValues, setFormValues] = useState(initEvent);

  const [titleIsValid, setTitleIsValid] = useState(true);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
  }, [activeEvent]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleFinishDateChange = (e) => {
    setDateFinish(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return alert('La fecha de fin debe ser mayor');
    }

    if (title.trim().length < 2) {
      return setTitleIsValid(false);
    }

    if (activeEvent) {
      dispatch(eventStartUpdated(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setTitleIsValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start ? start : dateStart}
            className="form-control react-datetime-picker"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleFinishDateChange}
            value={end ? end : dateFinish}
            minDate={dateStart}
            className="form-control react-datetime-picker"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleIsValid && 'is-invalid'}`} //Clase de bootstrap
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          style={{ width: '100%' }}
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
