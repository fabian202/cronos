
import { useState, useEffect } from 'react'
import { useEntryContext } from './useEntryContext'
import api from '../api'

export const useDeleteEntry = () => {
    const { dispatch } = useEntryContext();
    const [ id, setId ] = useState()

    useEffect(() => {
        if(id) {
            console.log(id)
            const deleteEntry = async () => {
                try {
                    await api.delete(`entry/${id}`)
                    dispatch({
                        type: 'REMOVE_ENTRY',
                        id
                    })
                    setId(null)
                } catch (error) {
                    console.log(error)
                }
            }

            deleteEntry()
        }
    }, [id])

    return {
        handleDeleteEntry: (_id) => {
            setId(_id)
        }
    }
}