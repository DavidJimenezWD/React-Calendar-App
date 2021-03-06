import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/authActions';

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 p-2">
      <span className="navbar-brand">{name}</span>
      <button className="btn btn-danger" onClick={handleLogout}>
        Salir <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};
