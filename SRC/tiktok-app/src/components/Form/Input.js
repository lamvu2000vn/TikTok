// Library
import { useState } from 'react'

// Component
import { FormGroup, Input, Label, Button } from '../../UI'

// Icon
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'

// Style
import styles from './Input.module.css'

export const InvalidText = props => {
    const classes = [
        styles['invalid-text'],
        props.className
    ].join(' ')

    return (
        <span className={classes}>{props.children}</span>
    )
}

export const PhoneInput = ({state, onChange}) => {
    const {value, isValid} = state
    const identify = 'phone'
    const RenderInvalidText = isValid === false && <InvalidText>Số điện thoại không hợp lệ</InvalidText>

    return (
        <FormGroup>
            <Label htmlFor={identify}>Số điện thoại</Label>
            <Input
                type="text"
                id={identify}
                name={identify}
                placeholder="Nhập số điện thoại"
                maxLength="10"
                value={value}
                onChange={onChange}
            />
            {RenderInvalidText}
        </FormGroup>
    )
}

export const VerifyCodeInput = ({ disabled }) => {
    const identify = 'verify-code'

    return (
        <FormGroup>
            <div className={styles['verify-code-wrapper']}>
                <Input
                    type="text"
                    id={identify}
                    name={identify}
                    placeholder="Nhập mã gồn 6 chữ số"
                    maxLength="6"
                    className={styles['verify-code-input']}
                />
                <Button className={styles['send-verify-code-btn']} disabled={disabled}>Gửi mã</Button>
            </div>
        </FormGroup>
    )
}

export const PasswordInput = ({ label = true, placeholder = 'Nhập mật khẩu', value, onChange, onFocus, onBlur }) => {
    const [show, setShow] = useState(false)

    const toggleShowPasswordHandle = () => { setShow(prevState => !prevState) }

    const identify = 'password'

    return (
        <FormGroup>
            {label && <Label htmlFor={identify}>Mật khẩu</Label>}
            <div className={styles['password-wrapper']}>
                <Input
                    type={show ? 'text' : 'password'}
                    id={identify}
                    name={identify}
                    placeholder={placeholder}
                    maxLength="32"
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <div className={styles.icon}>
                    <button onClick={toggleShowPasswordHandle}>{show ? <RiEyeLine/> : <RiEyeCloseLine />}</button>
                </div>
            </div>
        </FormGroup>
    )
}