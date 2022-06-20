import styles from './AuthModal.module.css'

export const Header = ({ children }) => {
    return (
        <div className={styles.header}>
            <div className={styles.title}>{children}</div>
        </div>
    )
}

export const Body = ({ children }) => {
    return (
        <div className={styles.body}>{children}</div>
    )
}

export const Footer = ({ children }) => {
    return (
        <div className={styles.footer}>
            <div className="flex items-center justify-center gap-1">{children}</div>
        </div>
    )
}