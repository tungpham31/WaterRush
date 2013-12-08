var friends = {
    1239 : "Gen",
    2349 : "Hridya",
    3348 : "Nick",
    8290 : "Henry",
    2399 : "Alex",
    3493 : "Russia",
    3342 : "Jacob",
    3190 : "Chris",
    1211 : "Yael",
    2333 : "Timm",
    4448 : "Aaron",
    3910 : "Tung",
    2346 : "Jake",
};

exports.endpoints = {
    /**
     * Returns a list of friends.
     * req: the levelId of a level
     */
    'getFriends': function (req, user, done) {
        done(friends);
    },
    /**
     * Returns a boolean true if the user and the “friend” are friends. Returns false 
     * if they are not.
     * req : friendId
     */
    'isFriend' : function (req, user, done) {
        done( !!friends[req] );
    },
};