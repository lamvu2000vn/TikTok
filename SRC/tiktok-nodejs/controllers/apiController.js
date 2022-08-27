export const getCSRFToken = (req, res, next) => {
    try {
        res.status(200).json({
            status:200,
            token: req.csrfToken()
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}