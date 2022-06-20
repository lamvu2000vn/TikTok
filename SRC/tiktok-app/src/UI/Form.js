// Library
import { forwardRef } from 'react'

// Style
import styles from './Form.module.css'

export const FormGroup = props => {
    const classes = [
        styles['form-group'],
        props.className
    ].join(' ')

    return (
        <div {...props} className={classes}>{props.children}</div>
    )
}

export const Label = props => {
    const classes = [
        styles.label,
        props.className
    ].join(' ')

    return (
        <label {...props} className={classes}>{props.children}</label>
    )
}

export const Input = forwardRef((props, ref) => {
    const classes = [
        styles.input,
        props.className
    ].join(' ')

    return (
        <input ref={ref} {...props} className={classes} onChange={props.onChange} onBlur={props.onBlur} onFocus={props.onFocus}  />
    )
})