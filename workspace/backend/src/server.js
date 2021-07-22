let {
    express,
    bodyParser,
    port,
    app,
    router
} = require('./index');

app.use(bodyParser.json());
app.use(router);
app.listen(port,() => {
    console.log(`Server started at http://localhost:${port}`);
})