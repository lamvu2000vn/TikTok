import { useContext, useState } from 'react'
import AuthContext from '../Context/auth-context'
import { Header, Body, Footer } from '../AuthComponents'
import { PhoneInput, VerifyCodeInput, PasswordInput } from '../../../Form/Input'
import { Button } from '../../../../UI'

import styles from '../AuthModal.module.css'

const ResetPassword = () => {
    const authCtx = useContext(AuthContext)
    const [showRegulation, setRegulation] = useState(false)

    const passwordFocusHandle = () => { setRegulation(true) }

    const passwordBlurHandle = () => {
        
    }

    return (
        <>
            <Header>Đặt lại mật khẩu</Header>
            <Body>
                <div className="mb-3">
                    <PhoneInput />
                </div>
                <div className="mb-3">
                    <VerifyCodeInput />
                </div>
                <PasswordInput label={false} placeholder="Nhập mật khẩu mới" onFocus={passwordFocusHandle} onBlur={passwordBlurHandle} />
                {
                    showRegulation && (
                        <div className="mb-4">
                            <div className={styles['password-regulation-wrapper']}>
                                <span>Mật khẩu của bản phải gồm:</span>
                                <ul>
                                    <li>8 đến 20 ký tự</li>
                                    <li>Các chữ cái, số và ký tự đặc biệt</li>
                                </ul>
                            </div>
                        </div>
                    )
                }
                <div className="mt-4">
                    <Button disabled>Đăng nhập</Button>
                </div>
            </Body>
            <Footer>
                Bạn không có tài khoản?
                <span className="link" onClick={() => authCtx.navigateToHandle('signup')}>Đăng ký</span>
            </Footer>
        </>
    )
}

export default ResetPassword