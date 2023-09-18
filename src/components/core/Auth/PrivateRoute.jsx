import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

  // const navigate = useNavigate();

  const {token} = useSelector((state) => state.auth);
  
  // return token !== null ? children : navigate("/login");

  if (token !== null ) {
    return children
  } else {
    return <Navigate to={"/login"}/>
  }
}

export default PrivateRoute;