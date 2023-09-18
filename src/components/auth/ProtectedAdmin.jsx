import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../../redux/authSlice"
import { Navigate } from "react-router-dom"


const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectLoggedInUser)

    if(!user){
        return <Navigate to="/login" replace={true} />
    }

    if(user && user.role !== "admin"){
        return <Navigate to="/" replace={true} />
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedAdmin