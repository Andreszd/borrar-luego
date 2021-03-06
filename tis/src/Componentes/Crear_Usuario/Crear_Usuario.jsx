import {useEffect, useState} from 'react'
import {create} from '../../services/user'
import {Modal} from 'react-bootstrap'
import {Alert} from 'react-bootstrap'
import {getToAssign, assignAll} from '../../services/group'
import './formUsr.css'
import Materia_grupo from '../Materias_Grupos'

function Crear_Usuario(){

    const [body, setBody] = useState({})
    const [errores, setErrores] = useState({})
    const [assign, setAssign] = useState({})
    const [grupos, setGrupos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalSuccess, setShowModalSuccess] = useState(false)
    const [show, setShow] = useState(false);

    const formData = new FormData();

    /* useEffect(()=> {
        getToAssign().then(setGrupos)
    }, []) */

    const openModal = () => {
        getToAssign().then(data => {
            if (data.length){
                setGrupos(data)
            }else{
                setGrupos(["vacio"])
            }
        })
        setShowModal(true)
    }
    const closeModal = () => setShowModal(false)

    const openModalSuccess = () => setShowModalSuccess(true)
    const closeModalSuccess = () => setShowModalSuccess(false)

    const handleChange = (evt) => {

            if (evt.target.name === 'imagen'){
                setBody({
                    ...body,
                    imagen: evt.target.files[0]
                })
            }else{ 
                setBody({
                    ...body,
                    [evt.target.name]: evt.target.value,
                    esAdmin: "no",
                })
            }
    }

    const grupoChange = (evt) => {

        if (document.getElementById(evt.target.id).checked){
            setAssign({
                ...assign,
                [evt.target.name]: evt.target.value,
                correo: body['email'],
            })
        }
        if (!document.getElementById(evt.target.id).checked){
            var algo = evt.target.name
            delete assign[algo]
        }
    }
    
    const handleSubmit = (evt) => {
       
        evt.preventDefault()
        /* formData.append('codigo', body.codigo);
        formData.append('capacidad', body.capacidad);
        formData.append('ubicacion', body.ubicacion);
        formData.append('caracteristicas', body.caracteristicas);
        formData.append('tipo', body.tipo);
        formData.append('imagen', body.imagen); */

        if(body['password'] == body['password_confirmation']){
            setIsLoading(true)
            create(body).then(data => {
                console.log(data)
                if (data.status === 1){
        
                    assignAll(assign).then(res => {
                        /*  if (res.Respuesta == 'Aceptados con exito'){  */
                            closeModal();
                            document.getElementById("formUser").reset();
                            setIsLoading(false)
                            openModalSuccess();      
                    /*  } */
                    }).catch(err => console.log(err))  
                }

                if(data.status === 0){
                    closeModal()
                    setIsLoading(false)
                    setErrores({
                        errores,
                        error: "El correo ingresado ya existe",
                    })
                    setShow(true)
                }
            }).catch(err => console.log(err))  
        }else{
            closeModal()
            setErrores({
                errores,
                error: "Las contrase??as no son iguales",
            })
            setShow(true)
        }
    }

    return(
        <>
        <form className='form_usr' id='formUser'>
            <h2 >Crear Usuario</h2>


            {show && <Alert variant="danger"  onClose={() => setShow(false)} dismissible>
                <p>
                  {errores['error']} 
                </p>
            </Alert>
            }


            <div className = "inp_form_usr" style={{marginTop:30+"px"}}>
                <label>Nombre:</label><br />
                <input className="form_input_usr" 
                    type="text"
                    onChange={handleChange}  
                    name="name" 
                    id="nombreuser_mod" 
                    placeholder="Nombre"
                    autoComplete='off' 
                    required pattern='[A-Za-z ]{3,20}' 
                    title='Nombre inv??lido, m??nimo 3 caracteres m??ximo 20'
                 ></input>    
            </div>
            <div className = "inp_form_usr">
                <label>Apellido:</label><br />
                <input className="form_input_usr"  
                    type="text" 
                    onChange={handleChange} 
                    name="apellido" 
                    id="apellidouser_mod" 
                    placeholder="Apellido"
                    autoComplete='off' 
                    required pattern='[A-Za-z ]{3,20}' 
                    title='Apellido inv??lido, m??nimo 3 caracteres m??ximo 20'
                ></input>  
            </div>
            <div className = "inp_form_usr">
                <label>Email:</label><br />
                <input className="form_input_usr" 
                type="email"
                onChange={handleChange}  
                name="email" 
                id="emailuser_mod" 
                placeholder="Email"
                autoComplete='off'
                required 
                ></input>  
            </div>
            <div className = "inp_form_usr">
                <label>Contrase??a:</label><br />
                <input className="form_input_usr" 
                type="password"
                onChange={handleChange}  
                name="password" 
                id="contrase??auser_mod"
                placeholder="Contrase??a"
                autoComplete='off'
                required pattern='[A-Za-z0-9]{8,20}' 
                title='Contrase??a inv??lido, m??nimo 8 caracteres m??ximos 20'
                ></input>  
            </div>
            <div className = "inp_form_usr">
                <label>Repetir Contrase??a:</label><br />
                <input className="form_input_usr" 
                type="password"
                onChange={handleChange}  
                name="password_confirmation" 
                id="contrase??auser_mod_dos"
                placeholder="Contrase??a"
                autoComplete='off'
                required pattern='[A-Za-z0-9]{8,20}' 
                title='Contrase??a inv??lido, m??nimo 8 caracteres m??ximos 20'
                ></input>  
            </div>

            {showModal && <Modal show={showModal}>  
              {/*  <div className={`formulario ${isLoading && 'contanier-loading'}`}>  */}
                    <div className={`container modal_horario ${isLoading && 'contanier-loading'}`} style={{padding:"20px"}}>
                        <h2 style={{textAlign:"center"}}>Materias y grupos</h2>

                        {grupos.map(matGrupo => (
                            <Materia_grupo matGrupo={matGrupo}
                                    grupoChange={grupoChange}
                                />
                            ))}

                        <div className="boton_form">
                            <button onClick={handleSubmit}>Crear Usuario</button>
                            <button onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
       {/*         </div>  */} 
            </Modal>
            }

                <div className='btn_form_user'>
                    <a className='selec_mat_btn' onClick={openModal}>Seleccionar Materias</a>
                    <button type="button" >Cancelar</button>
                </div>  
        </form>



        {showModalSuccess && <Modal show={showModalSuccess} centered> 
        <div>
            <div className='delete_title'>
                <h2>??Usuario {body.name} creado con ??xito!</h2>
            </div>
            <div className="modal-footer" style={{justifyContent:"center"}} >
                <button type="button" onClick={closeModalSuccess} >Aceptar</button>
            </div>
        </div>
        </Modal>}
    </>
)}

export default Crear_Usuario