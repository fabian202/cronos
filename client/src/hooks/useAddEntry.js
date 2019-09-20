import {useState, useEffect} from 'react'
import  api from '../api'
import { navigate } from 'hookrouter';

export const useAddEntry = () => {
    const initialValue = {
        hours: '',
        comment: '',
        billable: false,
        project: ''
    }
    const [values, setValues] = useState(initialValue)

    const [newValue, setNewValue] = useState()

    useEffect(() => {
        const addEntry = async () => {
            if(newValue) {
                try {
                    const res = await api.post('entry', newValue)
                    console.log(res)
                    setTimeout(() => {
                        navigate('/home', true)
                    }, 200);
                } catch (error) {
                    console.log(error)
                }
                
                setNewValue(null)
            }
        }
        addEntry();
    }, [newValue])

    return {
        values,
        setValues,
        handleChange: name => event => {
            setValues({ ...values, [name]: event.target.value });
        },
        handleCheck: name => event => {
            setValues({ ...values, [name]: event.target.checked });
        },
        handleSubmit: event => {
            event.preventDefault();
            setNewValue(values);
        }
    }
}