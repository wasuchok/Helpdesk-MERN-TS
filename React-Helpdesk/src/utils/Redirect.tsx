import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface LoadingType {
  To : string,
}

const Redirect : React.FC<LoadingType> = ({ To }) => {
    const navigate = useNavigate()

    useEffect(() => {


       navigate(`${To}`)

    },[])

  return (
    <div></div>
  )
}

export default Redirect