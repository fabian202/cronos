
import { useState, useEffect } from 'react'
import api from '../api'

export const useDeleteEntry = () => {
    const [ id, setId ] = useState()

    useEffect(() => {
        if(id) {
            console.log(id)
            setId(null)
        }
    }, [id])

    return {
        onDeleteEntry: (_id) => {
            setId(_id)
        }
    }
}