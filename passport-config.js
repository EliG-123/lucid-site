const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize (passport, getUserByUsername, getUserById) {
    const authenticatUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, {message: 'Incorrect Username or Password'})
        }
        try {
           if ( await bcrypt.compare(password, user.password) ) {
            return done(null, user)
           } else {
            return done(null, false, {message: 'Incorrect Username or Password'})
           }
        } catch (e) {
            return done(e)
        }

    }

    passport.use(new localStrategy({
        usernameField:'username'
    }, authenticatUser) )

    passport.serializeUser((user, done) => {done(null, user.id)})
    
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}


module.exports = initialize