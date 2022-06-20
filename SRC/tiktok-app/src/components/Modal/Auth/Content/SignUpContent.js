import { useContext } from 'react'
import AuthContext from '../Context/auth-context'
import AuthMethods from '../AuthMethods'
import { Header, Body, Footer } from '../AuthComponents'

const SignUpContent = () => {
    const authCtx = useContext(AuthContext)

    return (
        <>
            <Header>Đăng ký TikTok</Header>
            <Body>
                <AuthMethods />
            </Body>
            <Footer>
                Bạn đã có tài khoản?
                <span className="link" onClick={() => authCtx.navigateToHandle('login')}>Đăng nhập</span>
            </Footer>
        </>
    )
}

export default SignUpContent