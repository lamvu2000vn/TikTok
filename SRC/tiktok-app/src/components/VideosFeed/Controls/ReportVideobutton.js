// Icon
import { FiFlag } from 'react-icons/fi'

// Style
import styles from './ReportVideoButton.module.css'

const ReportVideoButton = ({background}) => {
    const classes = [
        styles['report-btn'],
        background === true && styles.background
    ].join(' ')

    return (
        <button className={classes}><FiFlag/>Báo cáo</button>
    )
}

export default ReportVideoButton