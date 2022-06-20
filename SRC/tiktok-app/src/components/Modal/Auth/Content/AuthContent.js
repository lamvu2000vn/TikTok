import { useContext } from 'react'
import AuthContext from '../Context/auth-context'
import LoginContent from './LoginContent'
import SignUpContent from './SignUpContent'
import DefaultMethod from './DefaultMethod'
import ResetPassword from './ResetPassword'

const AuthContent = () => {
    const authCtx = useContext(AuthContext)

    const navigate = authCtx.navigationList.at(-1)

    switch(navigate) {
        case 'login':
            return <LoginContent />
        case 'signup':
            return <SignUpContent />
        case 'default':
            return <DefaultMethod />
        case 'reset-password':
            return <ResetPassword />
        default:
            throw new Error('invalid navigate')
    }
}

export default AuthContent