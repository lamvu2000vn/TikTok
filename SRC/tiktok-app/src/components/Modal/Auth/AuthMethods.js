import { useContext } from 'react'
import AuthContext from './Context/auth-context'
import { CgTikcode } from 'react-icons/cg'
import { RiUserLine } from 'react-icons/ri'
import { FacebookIcon, GoogleIcon, InstagramIcon, KakaoTalkIcon, TwitterIcon, LINEIcon } from '../../Icons'
import { GrApple } from 'react-icons/gr'

import styles from './AuthModal.module.css'

const AuthMethods = () => {
    const authCtx = useContext(AuthContext)
    const navigate = authCtx.navigationList.at(-1)

    return (
        <div className={styles.container}>
            <div className={styles['auth-methods']}>
                {
                    navigate === 'login' && (
                        <div className={styles.method}>
                            <div className={styles.icon}><CgTikcode /></div>
                            <div className={styles['method-text']}>Sử dụng mã QR</div>
                        </div>
                    )
                }
                <div className={styles.method} onClick={() => authCtx.navigateToHandle('default')}>
                    <div className={styles.icon}><RiUserLine /></div>
                    <div className={styles['method-text']}>Sử dụng số điện thoại</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}>
                        <FacebookIcon />
                    </div>
                    <div className={styles['method-text']}>Tiếp tục với Facebok</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}><GoogleIcon /></div>
                    <div className={styles['method-text']}>Tiếp tục với Google</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}><TwitterIcon /></div>
                    <div className={styles['method-text']}>Tiếp tục với Twitter</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}><LINEIcon /></div>
                    <div className={styles['method-text']}>Tiếp tục với LINE</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}><KakaoTalkIcon /></div>
                    <div className={styles['method-text']}>Tiếp tục với KaKaoTalk</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}><GrApple /></div>
                    <div className={styles['method-text']}>Tiếp tục với Apple</div>
                </div>
                <div className={styles.method}>
                    <div className={styles.icon}><InstagramIcon /></div>
                    <div className={styles['method-text']}>Tiếp tục với Instagram</div>
                </div>
            </div>
        </div>
    )
}

export default AuthMethods