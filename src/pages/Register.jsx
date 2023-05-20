import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { register, reset } from '../features/auth/authSlice'

const Register = () => { 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  }) 

  /* Using destructuring assignment to extract the properties `name`, `email`, `password`, and
  `password2` from the `formData` object and assign them to separate constants with the same names.
  This allows for easier access to these values in the component. */
  const {name, email, password, password2} =formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      navigate('/login')
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

    //Validar que las constraseñas coincidan
    if(password !== password2){
      toast.error('Las contraseñas no coinciden')
    }else{
      const userData = {name, email, password}
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner></Spinner>
  }

  return (
    <div>
        <section className="heading">
          <h4>
            <FaUser /> Registrar
          </h4>
          <p>Crea una cuenta</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}> 
            <div className="form-group">
              <input className="form-control" 
                type="text" 
                name='name' 
                id='name' 
                value={name} 
                placeholder="Teclea tu nombre"
                onChange={onChange}/>

              <input className="form-control" 
                type="text" 
                name='email' 
                id='email' 
                value={email} 
                placeholder="Teclea tu email"
                onChange={onChange}/>

              <input className="form-control" 
                type="password" 
                name='password' 
                id='password' 
                value={password} 
                placeholder="Introduce una contraseña"
                onChange={onChange}/>

              <input className="form-control" 
                type="password" 
                name='password2' 
                id='password2' 
                value={password2} 
                placeholder="Confirma tu contraseña"
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

export default Register