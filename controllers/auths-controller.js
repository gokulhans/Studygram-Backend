const fun = require('../functions');


const getSignup = async function (req, res) {
    if (req.session.loggedIN == false) {
        res.render('forms/signup', { err: true })
    } else
        res.render('forms/signup')
}

const postSignup = async function (req, res) {
    console.log(req.body);
    fun.doSignup(req.body).then((response) => {
        console.log('post');
        if (response.signupstatus) {
            console.log(response);
            response.loggedIN = true
            req.session.user = response
            console.log(response);
            // res.status(201).json([{ "id": response.insertedId }]);
            // let userid = savedUser._id.toString();
            // //console.log(userid);
            // res.status(201).json([{ "id": userid }]);
            res.redirect('/community')
        } else {
            req.session.loggedIN = false;
            res.redirect('/community')
            // res.redirect('/auths/signup')
        }
    })
}

const getSignin = async function (req, res) {
    console.log(req.session);
    if (req.session.loggedIN) {
        res.redirect('/blogs/')
    } else if (req.session.loggedIN == false) {

        res.render('forms/signin', { err: true });
    } else {
        res.render('forms/signin');

    }


}

const postSignin = async function (req, res) {
    fun.doLogin(req.body).then((response) => {
        if (response.loginstatus) {
            response.loggedIN = true
            req.session.user = response
            res.redirect('/doctors/alldoctors/')
        } else {
            req.session.loggedIN = false;
            res.redirect('/auths/signin/')
        }
    })
}

const logOut = async function (req, res) {
    req.session.destroy();
    res.redirect('/')
}


exports.getSignup = getSignup;
exports.postSignup = postSignup;
exports.getSignin = getSignin;
exports.postSignin = postSignin;
exports.logOut = logOut;