"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth_1 = __importDefault(require("passport-google-oauth"));
const models_1 = require("../models");
// @ts-ignore
passport_1.default.use(new passport_google_oauth_1.default({
    consumerKey: process.env.GOOGLE_CONSUMER_KEY,
    consumerKeySecret: process.env.GOOGLE_CONSUMER_KEY_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (token, tokenSecret, profile, done) => {
    // @ts-ignore
    models_1.UserModel.findOrCreate({ google_id: profile.id }, (err, user) => {
        return done(err, user);
    });
}));
//# sourceMappingURL=passport_google.js.map