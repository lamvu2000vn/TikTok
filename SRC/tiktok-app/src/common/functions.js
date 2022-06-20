// Library
import axios from 'axios'

// API
import { LIKE_VIDEO } from '../API'

export const shortenTheNumber = number => {
    // Billions
    if (number >= 1000000000) {
        return `${(number / 1000000000).toFixed(1)}B`
    }
    // Millions
    else if (number >= 1000000) {
        return `${(number / 1000000).toFixed(1)}M`
    }
    // Thousands
    else if (number >= 10000) {
        return `${(number / 1000).toFixed(1)}K`
    } else {
        return number
    }
}

export const displayVideoTime = time => {
    let minutes = 0
    let seconds = 0

    if (time < 60) {
        seconds = Math.floor(time)

        const secondText = seconds < 10 ? '0' + seconds : seconds

        return `00:${secondText}`
    } else {
        minutes = Math.floor(time / 60)
        seconds = time % 60

        const minuteText = minutes < 10 ? '0' + minutes : minutes
        const secondText = seconds < 10 ? '0' + seconds : seconds

        return `${minuteText}:${secondText}`
    }
}

export const likeVideo = video_id => axios(LIKE_VIDEO + '/' + video_id)

export const storeUserInSession = user => {
    sessionStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromSession = () => JSON.parse(sessionStorage.getItem('user'))