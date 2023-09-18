// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const OpenRoute = ({ children }) => {
  
  // const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" /> // navigate("/dashboard/my-profile")
  }
}

export default OpenRoute