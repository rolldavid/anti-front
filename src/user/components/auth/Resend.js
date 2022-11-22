
import './Resend.css'

const Resend = ({handleResend, type}) => {

    if (type === 'token') {
        return (
            <div className="resend-container">
                <div className="resend-body">
                    <button onClick={handleResend} className="resend-button">Resend</button>
                </div>

            </div>
        )
    }

    if (type === 'password') {
        return (
            <div className="resend-container">
                <div className="resend-body">
                    <button onClick={handleResend} className="resend-button">Email link</button>
                </div>

            </div>
        )
    }

}

export default Resend;