import HeaderAdm from '../Componentes/Header_Adm/headerAdm';
import { Outlet } from 'react-router-dom';
import Pie_de_pagina from '../Componentes/Pie_de_pagina/pieDePagina';

<<<<<<< HEAD
export default function AdminHome(){
    
    let navigate = useNavigate();
    let location = useLocation();
    console.log(location)
    /*
    useEffect(()=>{
        const token = window.localStorage.getItem('token')
        if (!token) {
            //navigate('/login', {from: location.pathname}) 
            return <Navigate to="/login" state={{ from: location }} replace />;  
        }
    },[])
    */
    return (
        <>
           <HeaderAdm />
                <Outlet />
            <Pie_de_pagina />
       </>
    )    
}
=======
export default function AdminHome() {
  return (
    <>
      <HeaderAdm />
      <Outlet />
      <Pie_de_pagina />
    </>
  );
}

>>>>>>> refactor/routes-protection
