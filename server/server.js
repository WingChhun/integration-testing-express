const app = require("./app");
const {PORT, DATABASE_URL} = require('./config/keys');

let server = null;
/*
@function: runSErver
@params: TestDB
*/
const runServer = (PORT = 5000, DATABASE_URL) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(DATABASE_URL, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        //$ Success set the server to be exported
            .then(() => {
            server = app.listen(PORT, () => {
                console.log(`Server has started on port ${PORT}`);

                //$ Return from the promise
                resolve(server);
            }).on('error', (err) => {
                mongoose.disconnect();
                reject(err);
            });

        }).catch(err => {
            //! Fail to connect break
            if (err) {
                console.error(err);
                return reject(err);
            }
        })

    });

}

/*
@function: closeServer
@params:
@desc:
*/
const closeServer = (PORT, DATABASE_URL) => {

    return mongoose
        .disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log(`Ending server...`);

                server.close(err => {
                    if (err) {
                        return reject(err);
                    }

                    //$ Exit: server and mongoose connectrion has ended
                    resolve();
                })
            });
        })

}

module.exports = {
    runServer,
    closeServer
}; // for testing