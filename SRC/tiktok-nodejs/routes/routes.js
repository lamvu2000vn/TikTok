const routes = app => {
    app.use((req, res, next) => {
        res.send('<h1>hello world</h1>')
    })
}

export default routes