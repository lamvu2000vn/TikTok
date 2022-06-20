const ActionButton = ({ children, onClick }) => {
    const style = {
        border: 'none',
        outline: 'none',
        color: 'var(--main)',
        fontWeight: 600,
        marginTop: '8px',
        padding: '0 8px',
        fontSize: '14px'
    }

    return (
        <button style={style} onClick={onClick}>{children}</button>
    )
}

export default ActionButton