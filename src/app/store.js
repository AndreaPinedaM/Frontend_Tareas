import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tareaReducer from '../features/tareas/tareaSlice'

/* This code is creating a Redux store using the `configureStore` function from the `@reduxjs/toolkit`
library. The store has two reducers, `authReducer` and `tareaReducer`, which are combined using the
`reducer` property. The resulting store is then exported as a named export `store`, which can be
imported and used in other parts of the application to manage the state. */
export const store =configureStore({
    reducer: {
        auth: authReducer,
        tarea: tareaReducer
    },
})