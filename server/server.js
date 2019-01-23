const mongoose = require('mongoose');
const app = require("./app");
const {PORT, DATABASE_URL} = require('./config/keys');

let server = null;
/*
@function: runSErver
@params: PORT:number, DATABASE_URL:string
@desc: Accept a Port number and DB_URL, return a promise that will connect to mongoose and set the `server` to the app connection: resolve(return) out of the promise
@access: Public - For integration testing
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
@params: PORT:number, DATABASE_URL:string
@desc: Return a promise that disconnects from the mongodb connection;
@access: Public ( For api integration testing)
*/
const closeServer = (PORT, DATABASE_URL) => {

    return mongoose
        .disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log(`Ending server...`);

                server.close(() => {
                    console.log(`Server has closed`);
                    resolve();
                })
            });
        })

}

module.exports = {
    runServer,
    closeServer
}; // for testing