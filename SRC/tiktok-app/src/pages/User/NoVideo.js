// Library
import { memo } from 'react'
import { useSelector } from 'react-redux'

// Icon
import { RiUserLine } from 'react-icons/ri'

// Style
import styles from './NoVideo.module.css'

const NoVideo = ({ user }) => {
    const auth = useSelector(state => state.auth)

    const isLoginUser = auth.user ? auth.user.nickname === user.nickname : false

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.icon}><RiUserLine /></div>
                {isLoginUser && <div className="font-bold text-2xl">Tải video đầu tiên của bạn lên</div>}
                <div className={styles.text}>
                    Video của {isLoginUser ? 'bạn' : user.nickname} sẽ xuất hiện tại đây
                </div>
            </div>
        </div>
    )
}

export default memo(NoVideo)