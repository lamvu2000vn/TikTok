// Library
import { useState, useEffect, memo } from 'react'
import axios from 'axios'

// API
import { VIDEO } from '../../../API'

// Component
import { Loading } from '../../../UI'
import CommentItem from './CommentItem'

// Style
import styles from './CommentsList.module.css'

const CommentsList = ({ videoId }) => {
    const [commentsList, setCommentsList] = useState([])

    // Fetch comments
    useEffect(() => {
        axios.post(VIDEO + '/' + videoId + '/comments', {
            limit: 30,
            offset: 0
        }).then(response => {
            if (response.data.status === 200) {
                setCommentsList(response.data.data)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [videoId])

    return (
        <div className={styles.container}>
            {
                commentsList.length ? (
                    commentsList.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                ) : (
                    <Loading />
                )
            }
        </div>
    )
}

export default memo(CommentsList)