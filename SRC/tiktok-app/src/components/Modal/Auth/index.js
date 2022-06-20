import AuthProvider from "./Context/AuthProvider"
import AuthModal from './AuthModal'

const Wrapper = ({ show, onClose }) => {
    return (
        <AuthProvider onClose={onClose}>
            <AuthModal show={show} />
        </AuthProvider>
    )
}

export default Wrapper