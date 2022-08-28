// Library
import { useEffect, memo, useRef, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

// Action
import { uiSliceActions } from '../../../store/slices/uiSlice'

// API
import { COMMENT } from '../../../API'

// Component
import { Loading } from '../../../UI'
import CommentItem from './CommentItem'
import { DeleteCommentModal } from '../../Modal'

// Style
import styles from './CommentsList.module.css'
import axios from 'axios'

const CommentsList = ({ isFetch, commentsList, onRemoveComment }) => {
    const dispatch = useDispatch()

    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
    const [deleteCommentID, setDeleteCommentID] = useState()

    const containerRef = useRef()

    const handleToggleDeleteCommentModal = useCallback((commentID = null) => {
        setDeleteCommentID(commentID)
        setShowDeleteCommentModal(state => !state)
    }, [])

    const handleDeleteComment = useCallback(() => {
        (async () => {
            try {
                const jwt = localStorage.getItem('jwt')
                const response = await axios({
                    url: COMMENT + '/' + deleteCommentID,
                    method: 'DELETE',
                    headers: { jwt }
                })
    
                const {status} = response.data
    
                if (status === 200) {
                    handleToggleDeleteCommentModal()
                    onRemoveComment(deleteCommentID)
                    dispatch(uiSliceActions.showToast('Đã xóa'))
                }
            } catch (error) {
                console.error(error)
            }
        })()
    }, [deleteCommentID, dispatch, handleToggleDeleteCommentModal, onRemoveComment])
    
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
        </>
    )
}

export default memo(CommentsList)