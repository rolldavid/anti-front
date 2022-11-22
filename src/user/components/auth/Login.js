
import './Login.css'
import LoginForm from './LoginForm';

const Login = () => {

    return (
        <>
        <div className="auth-header">
                Login
        </div> 
        <div className="login-container">  
            <LoginForm />
        </div>
        </>
    )
}

export default Login;