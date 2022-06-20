// Style
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <button className={styles.link}>Giới thiệu</button>
                <button className={styles.link}>Bảng tin</button>
                <button className={styles.link}>Liên hệ</button>
                <button className={styles.link}>Sự nghiệp</button>
                <button className={styles.link}>ByteDance</button>
            </div>
            <div className={styles.wrapper}>
                <button className={styles.link}>TikTok for Good</button>
                <button className={styles.link}>Quảng cáo</button>
                <button className={styles.link}>Developers</button>
                <button className={styles.link}>Transqarency</button>
                <button className={styles.link}>TikTok Rewards</button>
            </div>
            <div className={styles.wrapper}>
                <button className={styles.link}>Trợ giúp</button>
                <button className={styles.link}>An toàn</button>
                <button className={styles.link}>Điều khoản</button>
                <button className={styles.link}>Quyền riêng tư</button>
                <button className={styles.link}>Creator Portal</button>
                <button className={styles.link}>Hướng dẫn</button>
                <button className={styles.link}>Cộng đồng</button>
            </div>
            <div className={styles.wrapper}>
                <button className={styles.link}>Thêm</button>
            </div>
            <div className={styles.wrapper}>
                <span className={styles.copyright}>&copy; 2022 TikTok</span>
            </div>
        </div>
    )
}

export default Footer