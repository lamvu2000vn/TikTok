import { useContext } from 'react'
import AuthContext from '../Context/auth-context'
import AuthMethods from "../AuthMethods"
import { Header, Body, Footer } from '../AuthComponents'

const LoginContent = () => {
    const authCtx = useContext(AuthContext)

    return (
        <>
            <Header>Đăng nhập vào TikTok</Header>
            <Body>
                <AuthMethods />
            </Body>
            <Footer>
                Bạn không có tài khoản?
                <span className="link" onClick={() => authCtx.navigateToHandle('signup')}>Đăng ký</span>
            </Footer>
        </>
    )
}

export default LoginContent