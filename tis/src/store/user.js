import {createContext, useState, useEffect} from 'react'
import {auth} from '../services/auth'
import {get} from '../services/user'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(null)
    
    useEffect(()=>{
        const token = window.localStorage.getItem('token')
        const userId = window.localStorage.getItem('userId')
        if (!token && !userId) {
            setIsAuthenticated(false)
        }else{
           //iniciar sesion -> pedir el detalle del usuario al back 
           //reload -> si hay token -> solicito detalle del usuario al back
           get(userId).then(authenticate).catch(err => console.error(err))
        }
    },[])


    const authenticate = (user) => {
        const {id, fullName, email, esAdmin}  = user
        setUser({id, fullName, email, esAdmin})
        setIsAuthenticated(true)
        setIsAdmin(esAdmin === 'yes')
        window.localStorage.setItem('userId', id)
        window.localStorage.setItem('token', user.access_token)
    }
   
    const signIn = (user) => {
        var res = ""
        auth(user).then(res => {
            if(res.status == 1){
                authenticate(res)
                res =  true;
            }else{
                res =  false;
            }
        
        }).catch(err => {
           console.log(err)
        })

        return res
        
    }

    const signUp = () => {
        setIsAuthenticated(false)
    }

    const logout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        setIsAuthenticated(false)
    }

    const vars = {isAuthenticated, isAdmin, signIn, signUp, logout, user}
    return (
        <AuthContext.Provider value={vars}>
            {children}
        </AuthContext.Provider>
    )
}