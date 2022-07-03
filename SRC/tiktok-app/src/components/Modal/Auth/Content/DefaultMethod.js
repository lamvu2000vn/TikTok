// Library
import { useContext, useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Context
import AuthContext from '../Context/auth-context'

// Action
import { authSliceActions } from '../../../../store/slices/authSlice'
import { uiSliceActions } from '../../../../store/slices/uiSlice'

// API
import { LOGIN, CSRF_TOKEN } from '../../../../API'

// Component
import { PhoneInput, PasswordInput, VerifyCodeInput, InvalidText } from '../../../Form/Input'
import { Button } from '../../../../UI'
import { Header, Body, Footer } from '../AuthComponents'

// Icon
import { Spinner } from '../../../Icons'

// Function
import isValid from '../../../Form/isValid'

// Style
import styles from '../AuthModal.module.css'

const DefaultLogin = () => {
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)

    const [isCheckingLogin, setIsCheckingLogin] = useState(false)
    const [invalidText, setInvalidText] = useState('')
    const [disableLoginButton, setDisableLoginButton] = useState(true)
    const [phoneState, setPhoneState] = useState({
        value: '',
        isValid: true
    })
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleChangePhone = useCallback(e => {
        const value = e.target.value

        if (isNaN(value) === false) {
            setPhoneState({
                value,
                isValid: true
            })
        }
    }, [])

    const handleChangePassword = useCallback(e => {
        setPassword(e.target.value)
    }, [])

    const handleLogin = () => {
        const checkPhoneValid = isValid('phone', phoneState.value)

        // Invalid
        if (checkPhoneValid === false) {
            setPhoneState(state => ({
                ...state,
                isValid: false
            }))
        } else {
            setIsCheckingLogin(true)
            setInvalidText('')

            axios(CSRF_TOKEN)
                .then(() => {
                    axios.post(LOGIN, {
                        phone: phoneState.value,
                        password
                    }).then(response => {
                        setIsCheckingLogin(false)
        
                        if (response.data.status === 200) {
                            const data = response.data.data
                            
                            authCtx.handleCloseModal()
                            setTimeout(() => {
                                dispatch(authSliceActions.login(data))
                                dispatch(uiSliceActions.showToast('Đăng nhập thành công'))
                                navigate("/", { replace: true })
                            }, 300)
                        } else if (response.data.status === 401) {
                            setInvalidText('Số điện thoại hoặc mật khẩu không chính xác')
                        }
                    })
                })
                .catch(error => {
                    setInvalidText('Đã có lỗi xảy ra. Vui lòng thử lại')
                    console.error(error)
                })
        }
    }

    useEffect(() => {
        if (phoneState.value && password) {
            setDisableLoginButton(false)
        } else {
            setDisableLoginButton(true)
        }
    }, [password, phoneState.value])

    return (
        <>
            <Header>Đăng nhập</Header>
            <Body>
                <div className="mb-3">
                    <PhoneInput state={phoneState} onChange={handleChangePhone} />
                </div>
                <div className="mb-3">
                    <PasswordInput vaue={password} onChange={handleChangePassword} />
                </div>
                <div className="mb-3">
                    <span className={styles['forget-password']} onClick={() => authCtx.navigateToHandle('reset-password')}>Quên mật khẩu?</span>
                </div>
                {invalidText && <InvalidText className="flex justify-center text-sm py-1">{invalidText}</InvalidText>}
                <Button disabled={disableLoginButton} onClick={handleLogin}>
                    Đăng nhập
                    {isCheckingLogin && <div className="absolute right-2 top-0 bottom-0 flex items-center"><Spinner size="md" /></div>}
                </Button>
            </Body>
            <Footer>
                Bạn không có tài khoản?
                <span className="link" onClick={() => authCtx.navigateToHandle('signup')}>Đăng ký</span>
            </Footer>
        </>
    )
}

const DefaultSignUp = () => {
    const authCtx = useContext(AuthContext)

    return (
        <>
            <Header>Đăng ký</Header>
            <Body>
                <div className="mb-3">
                    <PhoneInput />
                </div>
                <div className="mb-3">
                    <VerifyCodeInput />
                </div>
                <Button disabled>Tiếp</Button>
            </Body>
            <Footer>
                Bạn đã có tài khoản?
                <span className="link" onClick={() => authCtx.navigateToHandle('login')}>Đăng nhập</span>
            </Footer>
        </>
    )
}

const DefaultMethod = () => {
    const authCtx = useContext(AuthContext)
    const action = authCtx.navigationList[0]

    return action === 'login' ? <DefaultLogin /> : <DefaultSignUp />
}

export default DefaultMethod