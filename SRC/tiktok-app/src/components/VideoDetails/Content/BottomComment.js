// Library
import { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

// API
import { SUBMIT_COMMENT } from '../../../API'

// Component
import { AuthModal } from '../../Modal'

// Icon
import { GoMention } from 'react-icons/go'
import { MdTagFaces } from 'react-icons/md'

// Style
import styles from './BottomComment.module.css'

const MAX_LENGTH = 150

const BottomComment = ({ videoID, onPushCommentsList }) => {
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [hiddenValue, setHiddenValue] = useState('')
    const [commentValue, setCommentValue] = useState('')
    const [enableSubmit, setEnableSubmit] = useState(false)

    const {isLogin, user} = useSelector(state => state.auth)

    const handleToggleLoginModal = useCallback(() => {
        setShowAuthModal(state => !state)
    }, [])
    
    const handleSubmitComment = useCallback(() => {
        (async () => {
            if (enableSubmit) {
                setHiddenValue('')
                setCommentValue('')
    
                const jwt = localStorage.getItem('jwt')
    
                try {
                    const response = await axios({
                        url: SUBMIT_COMMENT,
                        method: 'POST',
                        headers: { jwt },
                        data: {
                            content: commentValue,
                            videoID,
                        },
                    })
        
                    const {status, data} = response.data
        
                    if (status === 200) {
                        const comment = {
                            user,
                            comment: {
                                ...data,
                                likes: 0,
                                replies: 0
                            }
                        }
    
                        onPushCommentsList(comment)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        })()
    }, [commentValue, enableSubmit, onPushCommentsList, user, videoID])

    const handleChangeCommentValue = e => {
        setHiddenValue(e.target.value)
    }

    // Auto expand textarea
    const handleKeyDown = e => {
        const el = e.target

        setTimeout(() => {
            el.style.cssText = 'height:auto; padding: 0'
            el.style.cssText = 'height:' + el.scrollHeight + 'px'
        }, 0)
    }

    // Set comment value
    useEffect(() => {
        let value = hiddenValue

        if (value.slice(-1) === '\n') {
            setHiddenValue(state => state.slice(0, state.length - 1))
            return handleSubmitComment()
        }

        if (hiddenValue === MAX_LENGTH) {
            value = hiddenValue.slice(0, hiddenValue.length - 1)
            setHiddenValue(value)
        }

        setCommentValue(value)
        setEnableSubmit(!!value)
    }, [handleSubmitComment, hiddenValue])

    return (
        <div className={styles.container}>
            {
                isLogin ? (
                    <div className="flex items-end">
                        <div className={styles['my-comment-container']}>
                            <div className={styles['input-container']}>
                                <textarea
                                    rows="1"
                                    maxLength={MAX_LENGTH}
                                    placeholder="Thêm bình luận..."
                                    value={commentValue}
                                    onChange={handleChangeCommentValue}
                                    onKeyDown={handleKeyDown}
                                />
                                {commentValue && <div className={styles.count}>{commentValue.length}/{MAX_LENGTH}</div>}
                            </div>
                            <div className={`${styles['icon-button']} ${styles['mention-icon']}`}><GoMention /></div>
                            <div className={`${styles['icon-button']} ${styles['emoji-icon']}`}><MdTagFaces /></div>
                        </div>
                        <div className={styles['submit-button-container']}>
                            <button
                                className={`${styles['submit-button']} ${enableSubmit ? styles['submit-button-active'] : styles['submit-button-disabled']}`}
                                onClick={handleSubmitComment}
                            >
                                Đăng
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles['login-button']} onClick={handleToggleLoginModal}>Please log in to comment</div>
                        <AuthModal show={showAuthModal} onClose={handleToggleLoginModal} />
                    </>
                )
            }
        </div>
    )
}

export default BottomComment