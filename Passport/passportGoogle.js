var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

require('dotenv').config()

passport.use(new GoogleStrategy({
    // Google Strategy params
    callbackURL: process.env.REDIRECT_URI || 'http://localhost:4192/api/v1/google/auth/google/callback',
    clientID: process.env.CLIENT_ID || '656328938237-856s35hqet305hm6ftuavsu140ace59m.apps.googleusercontent.com',
    clientSecret: process.env.CLIENT_SECRET || '2VTTY7nKE2ms5dJmB6qDQv2C'
},(access_token, refresh_token, profile, done) => {
    //passport callback function
    const user = {
        name: profile.displayName,
        email: profile.emails[0].value
    }
    console.log(user)
    return done(null, user)
}))