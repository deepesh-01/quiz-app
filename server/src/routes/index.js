
const auth = require('./auth');
const user = require('./user');
const quiz = require('./quiz');
const question = require('./question');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate.User, user);
    app.use('/api/quiz', quiz);
    app.use('/api/question', question);
};