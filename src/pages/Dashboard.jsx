import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TareaForm from "../components/TareaForm"


const Dashboard = () => {

  const navigate = useNavigate()

  const user = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

  }, [user, navigate])

  return (
    <>
      <section className="heading">
        <h4>Bienvenid@ {user && user.name}</h4>
        <p>Dashboard de tareas</p>
      </section>

      <TareaForm></TareaForm>
    </>
  )
}

export default Dashboard