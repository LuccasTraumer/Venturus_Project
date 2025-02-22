// Lib Principal
import React, { useState, Fragment } from 'react';

// Lib de Layout
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { user } from '../../services/user'
import { login } from '../../services/auth'

// Css 
import './Login.css'

const Login = ()=>{
    const [isLogin,setIsLogin] = useState(true);
    const [fullName,setFullName] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

    const onLoginChange = (event) =>{
        setUserLogin(event.target.value);
    }

    const onRegister = async (event) =>{
        event.preventDefault();
        const response = await user.register(userLogin,fullName,password);
        console.log(response)

    }
    const renderRegister = () => {
        return(
            <Fragment>
                <TextField
                    id="fullName"
                    label="Full Name: "
                    value={fullName}
                    onChange={(event) => {setFullName(event.target.value)}}
                    required
                    />
                    <TextField
                        id="userLogin"
                        label="User Login: "
                        value={userLogin}
                        onChange={onLoginChange}
                        required
                    />
                    <TextField
                        type="password"
                        id="password"
                        label="Password: "
                        value={password}
                        onChange={(event) => { setPassword(event.target.value)}}
                        required
                    />
                        <Button type ="submit" color="primary"> Sign In</Button>
                        <Button  color="secondary" onClick={() => setIsLogin(true)}> Back</Button>
            </Fragment>
        );
    }
    const onLogin = async (event) =>{
        event.preventDefault();
        const response = await login(userLogin,password);
        console.log(response);
        if(response.status >= 200 && response.status < 300){
            history.push('/timeline');
        }
    }

    const renderLogin = () => {
        return(
            <Fragment>
                <TextField
                        id="userLogin"
                        label="User Login: "
                        value={userLogin}
                        onChange={onLoginChange}
                        required
                    />
                    <TextField
                        type="password"
                        id="password"
                        label="Password: "
                        value={password}
                        onChange={(event) => { setPassword(event.target.value)}}
                        required
                    />
                <Button type ="submit" color="primary"> Login</Button>
                <Button color="primary" onClick={() => setIsLogin(!isLogin)}> Sign Up</Button>
            </Fragment>
        );
    }
    return (
        
        <div className="login"> 
            <Grid item xs={2} className="grid">
                <Paper className="paper">
                <form onSubmit={isLogin ? onLogin : onRegister}>
                    <Typography variant="h6">
                        4Tech Insta
                    </Typography>
                    {isLogin ? renderLogin() : renderRegister()}
                </form>
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;