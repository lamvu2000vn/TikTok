// Style
import styles from './Discover.module.css'

// Icon
import { BsHash } from 'react-icons/bs'
import { IoIosMusicalNotes } from 'react-icons/io'

const Discover = () => {
    return (
        <div className={styles['discovery-list']}>
            <button className={styles['discovery-item']}>
                <BsHash />
                <span>tiktoksoiphim</span>
            </button>
            <button className={styles['discovery-item']}>
                <BsHash />
                <span>vinawonder</span>
            </button>
            <button className={styles['discovery-item']}>
                <BsHash />
                <span>6ngay6dem</span>
            </button>
            <button className={styles['discovery-item']}>
                <IoIosMusicalNotes />
                <span>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n</span>
            </button>
            <button className={styles['discovery-item']}>
                <IoIosMusicalNotes />
                <span>Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng</span>
            </button>
            <button className={styles['discovery-item']}>
                <IoIosMusicalNotes />
                <span>Thiên Thần Tình Yêu - RICKY STAR</span>
            </button>
            <button className={styles['discovery-item']}>
                <BsHash />
                <span>streetdancevietnam</span>
            </button>
            <button className={styles['discovery-item']}>
                <BsHash />
                <span>thuthachtronthoat</span>
            </button>
            <button className={styles['discovery-item']}>
                <IoIosMusicalNotes />
                <span>Tình Đã Đầy Một Tim - Huyền Tâm Môn</span>
            </button>
            <button className={styles['discovery-item']}>
                <IoIosMusicalNotes />
                <span>Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dung Hoàng Phạm</span>
            </button>
        </div>
    )
}

export default Discover