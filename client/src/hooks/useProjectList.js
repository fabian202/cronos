import { useState, useEffect } from 'react'
import api from '../api'
export const useProjectList = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('project');
                setProjects(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchProjects()
    }, [])

    return {
        projects,
        setProjects
    }
}