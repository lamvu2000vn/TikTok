import { useContext } from 'react'
import AuthContext from './Context/auth-context'
import { Modal } from '../../../UI'
import { CloseModalButton } from '../../../UI/Modal'
import { IoIosArrowBack } from 'react-icons/io'
import AuthContent from './Content/AuthContent'

import styles from './AuthModal.module.css'

const AuthModal = ({ show }) => {
    const authCtx = useContext(AuthContext)

    return (
        <Modal show={show} onClose={authCtx.handleCloseModal}>
            <div className={styles.wrapper}>
                {authCtx.navigationList.length > 1 && <button className={styles['btn-back']} onClick={() => authCtx.navigateToHandle()}><IoIosArrowBack /></button>}
                <CloseModalButton onClose={authCtx.handleCloseModal} />
                <AuthContent />
            </div>
        </Modal>
    )
}

export default AuthModal