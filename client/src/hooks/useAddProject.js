import { useState, useEffect} from 'react'
import api from '../api'

export const useAddProject = () => {
    const [ name, setName ] = useState('');
    const [ newName, setNewName ] = useState();
    const [ newProject, setNewProject ] = useState()

    useEffect(() => {
        const addProject = async () => {
            if(newName) {
                try {
                    const res = await api.post('project', { name })
                    console.log(res)
                    setNewProject(res.data);
                } catch (error) {
                    console.log(error)
                }

                setNewName(null);
            }
        }

        addProject();
    }, [newName])

    return {
        name,
        newProject,
        setNewProject,
        handleNameChange: event => {
            setName(event.currentTarget.value);
        },
        handleNewProject: event => {
            event.preventDefault();
            setNewName(name)
        }
    }
}