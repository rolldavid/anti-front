import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth-hook';
import { useHTTP } from '../../../shared/hooks/http-hook';



import './Signup.css';
import ConfirmEmail from './ConfirmEmail';
import SignupForm from './SignupForm';


const Signup = (auth) => {
    
    return (
        <>  
            <div className="auth-header">
                Signup
            </div> 
            <div className="signup-container">
                <SignupForm />
            </div>
           
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(Signup);