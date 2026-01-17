const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user based on Google ID
      let [user] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          email: profile.emails[0].value,
          user_type: 'freelancer' // Default type for OAuth
        }
      });
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));