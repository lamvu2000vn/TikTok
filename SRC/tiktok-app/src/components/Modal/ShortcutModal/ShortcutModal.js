import { Modal } from "../../../UI"
import { CloseModalButton } from '../../../UI/Modal'

import styles from './ShortcutModal.module.css'

const ArrowUpIconCustom = () => {

    return (
        <span className={styles['arrow-up-icon']} />
    )
}
const ArrowDownIconCustom = () => {
    return (
        <span className={styles['arrow-down-icon']} />
    )
}
const LikeIconCustom = () => {
    return (
        <span className={styles['like-icon']} />
    )
}
const MuteIconCustom = () => {
    return (
        <span className={styles['mute-icon']} />
    )
}

const ShortcutModal = ({ show, onClose }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className={styles.wrapper}>
                <CloseModalButton onClose={onClose} size="sm" />
                <div className={styles.title}>Phím tắt trên bàn phím</div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <span>Quay về video trước</span>
                        <span className={styles.icon}><ArrowUpIconCustom /></span>
                    </div>
                    <div className={styles.item}>
                        <span>Đi đến video tiếp theo</span>
                        <span className={styles.icon}><ArrowDownIconCustom /></span>
                    </div>
                    <div className={styles.item}>
                        <span>Thích video</span>
                        <span className={styles.icon}><LikeIconCustom /></span>
                    </div>
                    <div className={styles.item}>
                        <span>Tắt tiếng / bật tiếng video</span>
                        <span className={styles.icon}><MuteIconCustom /></span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ShortcutModal