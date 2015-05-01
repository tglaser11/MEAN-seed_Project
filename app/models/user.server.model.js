/**
 * Created by tom on 3/8/15.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// define schemas
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
    created: {
        type: Date,
        default: Date.now
    },
    website: {
        type: String,
        set: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    }
});

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    var splitName= fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.set('toJSON', {getters: true, virtuals: true });

// create models from defined schemas
mongoose.model('User', UserSchema);