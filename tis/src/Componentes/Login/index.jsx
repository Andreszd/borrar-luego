import './login.css';

import { useState, useContext } from 'react';

import { AuthContext } from '../../store/user';
function LoginUsr() {
  const { signIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const body = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    };

    setIsLoading(true);
    try {
      await signIn(body);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div className='container cont_form'>
      <form onSubmit={handleSubmit}>
        <div
          className={`formulario ${isLoading && 'contanier-loading'}`}
          id='login_form_cont'>
          <h1 style={{ textAlign: 'center' }}>Inicio de Sesi&oacute;n</h1>
          <p>Ingrese su correo</p>
          <p> electronico registrado</p>
          <div className='grupo'>
            <input
              className='input_form'
              type='email'
              name='email'
              id='email'
              required
            />
            <span className='barra'></span>
            <label className='label_form' htmlFor=''>
              Email
            </label>
          </div>
          <div className='grupo'>
            <input
              className='input_form'
              type='password'
              name='password'
              id='passwprd'
              required
            />
            <span className='barra'></span>
            <label className='label_form' htmlFor=''>
              Contraseña
            </label>
          </div>
          <div className='boton_form' id='btn_login'>
            <button type='submit'>Iniciar Sesi&oacute;n</button>
          </div>
          <br />
          <a href=''>¿Se te olvido la contraseña?</a>
        </div>
      </form>
    </div>
  );
}

export default LoginUsr;
