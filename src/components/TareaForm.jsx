import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const TareaForm = () => {

    const [texto, setTexto] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="texto">Tarea</label>
                    <input
                        type="text"
                        name="texto"
                        id="texto"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder='Descripcion de la tarea' />
                </div>
                <div className="form-group">
                    <button
                        type='submit'
                        className='btn btn-block'>Agregar Tarea</button>
                </div>
            </form>
        </section>
    )
}

export default TareaForm