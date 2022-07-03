// Library
import { useEffect, memo, useRef, useState, useCallback } from 'react'

// API
import { DELETE_COMMENT } from '../../../API'

// Component
import { Loading, Toast } from '../../../UI'
import CommentItem from './CommentItem'
import { DeleteCommentModal } from '../../Modal'

// Style
import styles from './CommentsList.module.css'
import axios from 'axios'

const CommentsList = ({ isFetch, commentsList, onRemoveComment }) => {
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
    const [deleteCommentID, setDeleteCommentID] = useState()
    const [toastState, setToastState] = useState({
        show: false,
        content: ''
    })

    const containerRef = useRef()

    const handleToggleDeleteCommentModal = useCallback((commentID = null) => {
        setDeleteCommentID(commentID)
        setShowDeleteCommentModal(state => !state)
    }, [])

    const handleToggleToast = useCallback(() => {
        setToastState(state => ({
            ...state,
            show: !state.show
        }))
    }, [])

    const handleShowToast = content => {
        setToastState({
            show: true,
            content
        })
    }

    const handleDeleteComment = useCallback(() => {
        axios(DELETE_COMMENT + '/' + deleteCommentID)
            .then(response => {
                const {status} = response.data
                if (status === 200) {
                    handleToggleDeleteCommentModal()
                    onRemoveComment(deleteCommentID)
                    handleShowToast('Đã xóa')
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [deleteCommentID, handleToggleDeleteCommentModal, onRemoveComment])
    
    useEffect(() => {
        containerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })    
    }, [commentsList])

    return (
        <>
            <div ref={containerRef} className={styles.container}>
                {
                    isFetch ? (
                        commentsList.length ? (
                            commentsList.map((comment, key) => (
                                <CommentItem key={key} item={comment} onShowDeleteCommentModal={handleToggleDeleteCommentModal} />
                            ))
                        ) : (
                            <div>No comments</div>
                        )
                    ) : (
                        <Loading />
                    )
                }
            </div>
            <DeleteCommentModal show={showDeleteCommentModal} onClose={handleToggleDeleteCommentModal} onDeleteComment={handleDeleteComment} />
            <Toast show={toastState.show} content={toastState.content} onClose={handleToggleToast} />
        </>
    )
}

export default memo(CommentsList)