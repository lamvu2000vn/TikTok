// Library
import { useState, useEffect } from 'react'

// Component
import CommentItem from './CommentItem'

// Style
import styles from './CommentsList.module.css'

import avatar from '../../../assets/images/avatar.png'

const comments = [
    {
        id: 1,
        nickname: 1,
        video_id: 1,
        content: 'comment 1',
        post_date: '2022-05-27 08:00:00',
        user: {
            nickname: 'vhl970',
            name: 'Vu Hoang Lam',
            description: 'abc',
            avatar,
            verified: true,
        }
    },
    {
        id: 2,
        nickname: 2,
        video_id: 2,
        content: 'comment 2',
        post_date: '2022-05-27 08:00:00',
        user: {
            nickname: 'vhl970',
            name: 'Vu Hoang Lam',
            description: 'abc',
            avatar,
            verified: true,
        }
    },
    {
        id: 3,
        nickname: 3,
        video_id: 3,
        content: 'comment 3',
        post_date: '2022-05-27 08:00:00',
        user: {
            nickname: 'vhl970',
            name: 'Vu Hoang Lam',
            description: 'abc',
            avatar,
            verified: true,
        }
    },
    {
        id: 4,
        nickname: 4,
        video_id: 4,
        content: 'comment 4',
        post_date: '2022-05-27 08:00:00',
        user: {
            nickname: 'vhl970',
            name: 'Vu Hoang Lam',
            description: 'abc',
            avatar,
            verified: true,
        }
    },
    {
        id: 5,
        nickname: 5,
        video_id: 5,
        content: 'comment 5',
        post_date: '2022-05-27 08:00:00',
        user: {
            nickname: 'vhl970',
            name: 'Vu Hoang Lam',
            description: 'abc',
            avatar,
            verified: true,
        }
    },
    {
        id: 6,
        nickname: 6,
        video_id: 6,
        content: 'comment 6',
        post_date: '2022-05-27 08:00:00',
        user: {
            nickname: 'vhl970',
            name: 'Vu Hoang Lam',
            description: 'abc',
            avatar,
            verified: true,
        }
    }
]

const CommentsList = () => {
    const [commentsList, setCommentsList] = useState([])

    // Fetch comments
    useEffect(() => {
        setCommentsList(comments)
    }, [])

    const commentItems = commentsList.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
    ))

    return (
        <div className={styles.container}>
            {commentItems}
        </div>
    )
}

export default CommentsList