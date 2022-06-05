import './login.css'
import {Alert} from 'react-bootstrap'

import {useState, useContext, useEffect} from 'react'

import {AuthContext} from '../../store/user'
import { useNavigate } from "react-router-dom";
function LoginUsr(){

    const navigate = useNavigate()

    const redirectTo = () => {
        navigate(`/recuperar`)        
    }



    const {signIn, isAdmin, isAuthenticated} = useContext(AuthContext)

    const [userForm, setUserForm] = useState({})
    const [errores, setErrores] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false);

    useEffect(()=> {
        if (isAuthenticated){
            if (isAdmin){
                if (isAdmin === true) navigate('/Home-admin')
                if (isAdmin === false) navigate('/')
            }
        }
    },[isAuthenticated, isAdmin])

    const handleOnChange = (evt) => {}

    const handleSubmit = async(evt) => {
        evt.preventDefault()
        
            const user = {
                'email': evt.target.email.value,
                'password': evt.target.password.value
            }
            

            if(signIn(user)){
                console.log("entra")
                setIsLoading(true)
            }else{
                setErrores({
                    errores,
                    error: "correo o contraseña incorrecto",
                })
                setShow(true)
            }
    }

    return(
        <div className="container cont_form">
            <form onSubmit={handleSubmit}>
                <div className={`formulario ${isLoading && 'contanier-loading'}`}
                id='login_form_cont'>
                    <h1 style={{textAlign:"center"}}>Inicio de Sesi&oacute;n</h1>
                    
                    {show && <Alert variant="danger"  onClose={() => setShow(false)} dismissible>
                        <p>
                             {errores['error']}
                        </p>
                    </Alert>
                    }
                    
                    <p>Ingrese su correo</p>
                    <p> electronico registrado</p>
                    <div className="grupo">
                        <input className="input_form" 
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange={handleOnChange}  
                        required /><span className="barra"></span>
                        <label className="label_form" htmlFor="">Email</label>
                    </div>
                    <div className="grupo">
                        <input className="input_form" 
                            onChange={handleOnChange}
                            type="password" name="password" id="passwprd" required 
                        /><span className="barra"></span>
                        <label className="label_form" htmlFor="">Contraseña</label>
                    </div>
                    <div  className="boton_form" id='btn_login'>
                        <button type="submit" >Iniciar Sesi&oacute;n</button>
                    </div>
                    <br />
                    <a className='rec_cont' onClick={redirectTo}>¿Se te olvido la contraseña?</a>
                </div>
            </form>
        </div>    
)}

export default LoginUsr