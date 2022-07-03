// Library
import { memo } from 'react'

// Component
import { Modal } from '../../../UI'

// Style
import styles from './DeleteCommentModal.module.css'

const DeleteCommentModal = ({ show, onClose, onDeleteComment }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.header}>Bạn có chắc chắn muốn xóa bình luận này?</div>
                <div className={styles.body}>
                    <button className={styles['delete-button']} onClick={onDeleteComment}>Xóa</button>
                    <button className={styles['cancel-button']} onClick={onClose}>Hủy</button>
                </div>
            </div>
        </Modal>
    )
}

export default memo(DeleteCommentModal)