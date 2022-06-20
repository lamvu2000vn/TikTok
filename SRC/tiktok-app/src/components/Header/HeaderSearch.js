import styles from './HeaderSearch.module.css'
import { FiSearch } from 'react-icons/fi'

const HeaderSearch = () => {
    return (
        <div className={styles['search']}>
            <input type="text" placeholder="Tìm kiếm tài khoản và video" />
            <span />
            <button><FiSearch /></button>
        </div>
    )
}

export default HeaderSearch