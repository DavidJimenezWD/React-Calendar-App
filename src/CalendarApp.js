import { store } from './store/store';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
