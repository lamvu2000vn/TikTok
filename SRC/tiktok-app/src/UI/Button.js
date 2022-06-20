import styles from './Button.module.css'

const Button = props => {
    const classes = [
        styles.button,
        props.className,
        props.outline && styles.outline
    ].join(' ')

    return (
        <button
            id={props.id}
            name={props.name}
            className={classes}
            onClick={props.onClick}
            disabled={props.disabled}
        >{props.children}</button>
    )
}

export default Button