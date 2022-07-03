// Library
import { memo, useState, useCallback } from 'react'

// Component
import { EditProfileModal } from '../../components/Modal'

// Icon
import { FiEdit } from 'react-icons/fi'

// Style
import styles from './EditProfileButton.module.css'

const EditProfileButton = () => {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)

    const handleToggleEditModal = useCallback(() => {
        setShowEditProfileModal(state => !state)
    }, [])

    return (
        <>
            <button className={styles.button} onClick={handleToggleEditModal}><FiEdit />Sửa hồ sơ</button>
            <EditProfileModal show={showEditProfileModal} onClose={handleToggleEditModal} />
        </>
    )
}

export default memo(EditProfileButton)