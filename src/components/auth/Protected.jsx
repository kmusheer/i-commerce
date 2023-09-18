import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../../redux/authSlice"
import { Navigate } from "react-router-dom"


const Protected = ({children}) => {
    const user = useSelector(selectLoggedInUser)

    if(!user){
        return <Navigate to="/login" replace={true} />
    }
  return (
    <div>{children}</div>
  )
}

export default Protected