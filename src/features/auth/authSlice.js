/* Importing two functions, `createSlice` and `createAsyncThunk`, from the `@reduxjs/toolkit` library.
These functions are used for creating Redux slices and asynchronous thunks respectively, which are
commonly used in Redux applications. */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Obtener el usuario del localstorage en caso de que exista
const user = JSON.parse(localStorage.getItem('user'))

const initialState ={
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//REGISTRAR USUARIO
//createAsyncThunk - Manejar una funcion asincrona/ ciclo de vida del estado
//1er parametro "ruta", 2do payload
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) =>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        /* `return thunkAPI.rejectedWithValue(message)` is returning a rejected action with a payload
        of `message`. This is used in the `createAsyncThunk` function to handle errors that may
        occur during the asynchronous operation. If an error occurs, the function will return a
        rejected action with the error message as the payload, which can then be handled in the
        Redux store. */
        return thunkAPI.rejectWithValue(message)
    }
})

//LOGIN
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        /* `return thunkAPI.rejectedWithValue(message)` is returning a rejected action with a payload
        of `message`. This is used in the `createAsyncThunk` function to handle errors that may
        occur during the asynchronous operation. If an error occurs, the function will return a
        rejected action with the error message as the payload, which can then be handled in the
        Redux store. */
        return thunkAPI.rejectWithValue(message)
    }
})

//LOGOUT
export const logout = createAsyncThunk('auth/logout', async() =>{
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
/* Toma y resetea un estado. */
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false 
            state.isSuccess = false
            state.message = ''
        }
    },
    /**/
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload //payload response.data
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload //thunkAPI.rejectedWithValue(message) desde el estado
            state.user = null
        })
        .addCase(login.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(login.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) =>{
            state.user = null
        })
    }
})

/* `export const {reset} = authSlice.actions` is exporting the `reset` reducer function from the
`authSlice` slice. This allows other parts of the application to import and use the `reset` function
to reset the state of the `auth` slice. LOS REDUCERS SE EXPORTAN como una ACCION*/
export const {reset} = authSlice.actions
export default authSlice.reducer
