import { useState } from "react"
import AuthContext from "./auth-context"

export const initialState = {
    navigationList: ['login'],
    method: ''
}

const AuthProvider = ({ children, onClose }) => {
    const [state, setState] = useState(initialState)

    const navigateToHandle = (to = null) => {
        setState(prevState => {
            switch(to) {
                case null:
                    let newNavigationList = [...prevState.navigationList]
                    newNavigationList.pop()

                    return {
                        ...prevState,
                        navigationList: newNavigationList
                    }
                case 'login':
                case 'signup':
                    return {
                        navigationList: [to],
                        method: ''
                    }
                default:
                    return {
                        ...prevState,
                        navigationList: [...prevState.navigationList, to]
                    }
            }
        })
    }

    const changeMethodHandle = (method = '') => {
        setState(prevState => ({
            ...prevState,
            method
        }))
    }
    
    const handleCloseModal = () => {
        document.body.removeAttribute('style')
        setState(initialState)
        onClose()
    }

    const value = {
        ...state,
        navigateToHandle,
        changeMethodHandle,
        handleCloseModal
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider