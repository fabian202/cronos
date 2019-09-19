import { useState } from "react";
import api from '../api'
import { setCookie } from '../cookies'
import { navigate } from 'hookrouter';

export const useAuthentication = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isLogged, setIslogged ] = useState(false);
    const [ message, setMessage ] = useState('')

    const postLogin = async () => {
        //user/authenticate
        try {
            const response = await api.request({ method: 'POST', url: 'user/authenticate', data: { email, password } });
            console.log(response)
            setCookie('token',response.data)
            setIslogged(true)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setIslogged(false)
            setMessage('Invalid credentials')
        }

    }

    return {
        email,
        password,
        isLogged,
        message,
        onEmailChange: (e) => {
            setMessage('')
            setEmail(e.currentTarget.value);
        },
        onPasswordChange: (e) => {
            setMessage('')
            setPassword(e.currentTarget.value);
        },
        onAuthenticate: (e) => {
            e.preventDefault();
            postLogin();
        }
    }
}