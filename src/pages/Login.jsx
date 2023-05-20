import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }) 

  const {email, password} =formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() =>{
    if (isError){
      toast.error(message)
    }
    if (isSuccess){
      navigate('/') //Dashboard
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (event) => {
    setFormData((prevState)=>({
      /* `...prevState` is spreading the previous state of the `formData` object, which means it is
      creating a new object with all the properties and values of the previous state. This is done
      to ensure that any existing data in the state is not lost when updating a single property. 
      Copia lo que había antes y concatena cada que tecleamos*/
      ...prevState,
      [event.target.name]: event.target.value //nombre del input = valor del input
    }))
  }

  const onSubmit = (event) =>{
    event.preventDefault()

    if(!password || !email){
      toast.error('LLena los campos requeridos')
    }else{
      const userData = { email, password }
      dispatch(login(userData))
    }
  }

  if (isLoading){
    return <Spinner></Spinner>
  }

  return (
    <div>
        <section className="heading">
          <h4>
            <FaSignInAlt /> Login
          </h4>
          <p>Teclea tus credenciales</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input className="form-control" 
                type="text" 
                name='email' 
                id='email' 
                value={email} 
                placeholder="Teclea tu email"
                autoComplete="email"
                onChange={onChange}/>

              <input className="form-control" 
                type="password" 
                name='password' 
                id='password' 
                value={password} 
                placeholder="Introduce una contraseña"
                autoComplete="password"
                onChange={onChange}/>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-block">Submit
              </button>
            </div>
          </form>
        </section>
    </div>
  )
}

export default Login