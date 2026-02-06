const passport = require('passport');
const users = require('../model/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const GoogleProvider = () => {
    try {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3030/api/v2/user/auth/google/callback"
        },

            async function (accessToken, refreshToken, profile, cb) {
                console.log(profile);
                
                const user = await users.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    googleID : profile.id
                })

                //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //         return cb(err, user);
                //     });
            }
        ));
    } catch (error) {

    }
}

module.exports = GoogleProvider;