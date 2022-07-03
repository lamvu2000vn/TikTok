// Library
import { memo } from 'react'

// Component
import { Modal } from '../../../UI'
import { CloseModalButton } from '../../../UI/Modal'

// Style
import styles from './EditProfileModal.module.css'

const EditProfileModal = ({ show , onClose }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.header}>
                    Sửa hồ sơ
                    <CloseModalButton onClose={onClose} />
                </div>
                <div className={styles.body}>

                </div>
                <div className={styles.footer}>
                    <button className={styles['action-button']}>Hủy</button>
                    <button className={styles['action-button']}>Lưu</button>
                </div>
            </div>
        </Modal>
    )
}

export default memo(EditProfileModal)