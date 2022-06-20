const isValid = (type, value) => {
    switch (type) {
        case 'phone': {
            if (value.trim().length < 10) {
                return false
            }

            return true
        }
        default:
            throw new Error('invalid input type')
    }
}

export default isValid