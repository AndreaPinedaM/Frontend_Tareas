import axios from 'axios'

const API_URL ='https://indigo-chameleon-wig.cyclic.app/api/users/'
// const API_URL ='http://localhost:500/api/users/'

//REGISTRAR USUARIO
const register = async(userData) =>{
    const response = await axios.post(API_URL, userData)
    return response.data
}

//LOGIN
const login = async(userData) =>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        sessionStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
} 

//LOGOUT
const logout = () =>{
    sessionStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService