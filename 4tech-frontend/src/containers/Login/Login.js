import React, {useState,useEffect} from 'react';

const Login = ({name})=>{
    const [login,setLogin] = useState('');

    useEffect(() => {
        console.log('Alterei o login');

        return (() => {
            console.log('terminei mae !');
        })
    },[login])

    const onLoginChange = (event) =>{
        console.log(event.target.value);
        setLogin(event.target.value);
    }
    return (
        
        <div> 
            <input type="test" value={login} onChange={onLoginChange}/>
            Login Works {name} 
            
        </div>
    );
};

export default Login;