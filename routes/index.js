var express = require('express');
var router = express.Router();
const db = require('../connection');
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', async function (req, res, next) {
    let university = await db.get().collection('university').find().toArray();
    let course = await db.get().collection('course').find().toArray();
    let semester = await db.get().collection('semester').find().toArray();
    let subject = await db.get().collection('subject').find().toArray();
    let module = await db.get().collection('module').find().toArray();
    let category = await db.get().collection('category').find().toArray();
    let video = await db.get().collection('video').find().toArray();
    let doc = await db.get().collection('doc').find().toArray();
    console.log(video);
    res.render('index.hbs', { university, course, semester, category, subject, module, video, doc })
    // let user = null;
    // if (req.session) {
    //     user = req.session.user
    // }
    // if (user) {
    //     res.render('index',{user: user });
    // } else {
    //     res.redirect('auths/admin/');
    // }
});

router.get('/addvideo', async function (req, res, next) {
    let university = await db.get().collection('university').find().toArray();
    let course = await db.get().collection('course').find().toArray();
    let semester = await db.get().collection('semester').find().toArray();
    let subject = await db.get().collection('subject').find().toArray();
    let module = await db.get().collection('module').find().toArray();
    let category = await db.get().collection('category').find().toArray();
    let video = await db.get().collection('video').find().toArray();
    let doc = await db.get().collection('doc').find().toArray();
    res.render('addvideo.hbs', { university, course, semester, category, subject, module, video, doc })
});

router.get('/contribute', async function (req, res, next) {
    let university = await db.get().collection('university').find().toArray();
    let course = await db.get().collection('course').find().toArray();
    let semester = await db.get().collection('semester').find().toArray();
    let subject = await db.get().collection('subject').find().toArray();
    let module = await db.get().collection('module').find().toArray();
    let category = await db.get().collection('category').find().toArray();
    let video = await db.get().collection('video').find().toArray();
    let doc = await db.get().collection('doc').find().toArray();
    res.render('contribute.hbs', { university, course, semester, category, subject, module, video, doc })
});

router.post('/contribute/:id', async function (req, res) {
    let userid = req.params.id;
    let data = req.body;
    const docTitle = req.body.docname;
    const formattedDocTitle = docTitle.toLowerCase().replace(/\s/g, '-');
    req.body.fdocname = formattedDocTitle;
    req.body.userid = userid;
    req.body.verify = false;
    console.log(data);
    await db.get().collection('doc').insertOne(data).then((response) => {
        console.log(response);
    });
    res.redirect('/contribute');
});

router.get('/adddoc', async function (req, res, next) {
    let university = await db.get().collection('university').find().toArray();
    let course = await db.get().collection('course').find().toArray();
    let semester = await db.get().collection('semester').find().toArray();
    let subject = await db.get().collection('subject').find().toArray();
    let module = await db.get().collection('module').find().toArray();
    let category = await db.get().collection('category').find().toArray();
    let video = await db.get().collection('video').find().toArray();
    let doc = await db.get().collection('doc').find().toArray();
    res.render('adddoc.hbs', { university, course, semester, category, subject, module, video, doc })
});

router.get('/verify', async function (req, res, next) {
    // let doc = await db.get().collection('doc').find().toArray();
    let doc = await db.get().collection('doc').find({ verify: false }).toArray();
    res.render('verify.hbs', { doc })
});

router.get('/doc/verify/:id', async function (req, res, next) {
    let id = req.params.id
    let doc = await db.get().collection('doc');
    doc.updateOne(
        { _id: ObjectId(id) }, // Filter to find the document to update
        { $set: { verify: true } }, // Update operation to set the verify field to true
        function (err, result) {
            if (err) {
                console.error('Error updating document:', err);
            } else {
                console.log('Document updated successfully', result);
            }
        }
    );
    res.redirect('/verify')
});

router.post('/university', async function (req, res) {
    let data = req.body
    const universityName = req.body.uniname;
    const formattedUniversityName = universityName.toLowerCase().replace(/\s/g, '-');
    req.body.funiname = formattedUniversityName;
    // console.log(data);
    await db.get().collection('university').insertOne(data).then((response) => {
        // console.log(response);
    })
    res.redirect('/')
});

router.get('/university/delete/:id', async function (req, res) {
    let id = req.params.id
    await db.get().collection('university').deleteOne({ _id: ObjectId(id) })
    res.redirect('/')
});

router.post('/course', async function (req, res) {
    let data = req.body;
    const courseName = req.body.coursename;
    const formattedCourseName = courseName.toLowerCase().replace(/\s/g, '-');
    req.body.fcoursename = formattedCourseName;

    // console.log(data);
    await db.get().collection('course').insertOne(data).then((response) => {

        // console.log(response);
    });
    res.redirect('/');
});

router.get('/course/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('course').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});

router.post('/semester', async function (req, res) {
    let data = req.body;
    const semesterName = req.body.semestername;
    const formattedSemesterName = semesterName.toLowerCase().replace(/\s/g, '-');
    req.body.fsemestername = formattedSemesterName;

    // console.log(data);
    await db.get().collection('semester').insertOne(data).then((response) => {

        // console.log(response);
    });
    res.redirect('/');
});

router.get('/semester/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('semester').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});

router.post('/subject', async function (req, res) {
    let data = req.body;
    const subjectName = req.body.subjectname;
    const formattedSubjectName = subjectName.toLowerCase().replace(/\s/g, '-');
    req.body.fsubjectname = formattedSubjectName;

    // console.log(data);
    await db.get().collection('subject').insertOne(data).then((response) => {

        // console.log(response);
    });
    res.redirect('/');
});

router.get('/subject/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('subject').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});


router.post('/module', async function (req, res) {
    let data = req.body;
    const moduleName = req.body.modulename;
    const formattedModuleName = moduleName.toLowerCase().replace(/\s/g, '-');
    req.body.fmodulename = formattedModuleName;

    // console.log(data);
    await db.get().collection('module').insertOne(data).then((response) => {

        // console.log(response);
    });
    res.redirect('/');
});

router.get('/module/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('module').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});


router.post('/category', async function (req, res) {
    let data = req.body;
    const categoryName = req.body.categoryname;
    const formattedCategoryName = categoryName.toLowerCase().replace(/\s/g, '-');
    req.body.fcategoryname = formattedCategoryName;

    // console.log(data);
    await db.get().collection('category').insertOne(data).then((response) => {

        // console.log(response);
    });
    res.redirect('/');
});

router.get('/category/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('category').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});


router.post('/video', async function (req, res) {
    let data = req.body;
    const videoName = req.body.videoname;
    const formattedVideoName = videoName.toLowerCase().replace(/\s/g, '-');
    req.body.fvideoname = formattedVideoName;

    // console.log(data);
    await db.get().collection('video').insertOne(data).then((response) => {

        // console.log(response);
    });
    res.redirect('/addvideo');
});

router.get('/video/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('video').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});


router.post('/doc', async function (req, res) {
    let data = req.body;
    const docTitle = req.body.docname;
    const formattedDocTitle = docTitle.toLowerCase().replace(/\s/g, '-');
    req.body.fdocname = formattedDocTitle;
    // console.log(data);
    await db.get().collection('doc').insertOne(data).then((response) => {
        // console.log(response);
    });
    res.redirect('/adddoc');
});

router.get('/doc/delete/:id', async function (req, res) {
    let id = req.params.id;
    await db.get().collection('doc').deleteOne({ _id: ObjectId(id) });
    res.redirect('/');
});

router.get('/subjectlist', async (req, res) => {
    try {
        const selectedUniversity = req.query.university;
        const selectedCourse = req.query.course;
        const selectedSemester = req.query.semester;


        // console.log(selectedUniversity, selectedCourse, selectedSemester);

        // Query the database to retrieve the modules based on the selected university and semester
        const subjects = await db.get().collection('subject').find({
            universityname: selectedUniversity,
            coursename: selectedCourse,
            semestername: selectedSemester,
        }).toArray();

        // console.log(subjects);
        res.json(subjects);
    } catch (error) {

        // console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/modulelist', async (req, res) => {
    try {
        const selectedUniversity = req.query.university;
        const selectedCourse = req.query.course;
        const selectedSemester = req.query.semester;
        const selectedSubject = req.query.subject;


        // console.log(selectedUniversity, selectedCourse, selectedSemester, selectedSubject);


        const modules = await db.get().collection('module').find({
            universityname: selectedUniversity,
            coursename: selectedCourse,
            semestername: selectedSemester,
            subjectname: selectedSubject,
        }).toArray();

        // console.log("modules");

        // console.log(modules);
        res.json(modules);
    } catch (error) {

        // console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// const getAllProducts = async function(req, res) {
//     let data = await db.get().collection('products').find().toArray()
//     
// console.log(data);
//     res.render('pages/allproducts', { data, user: req.session.user });
// }
// const addProduct = async function(req, res) {
//     let data = req.body
//     
// console.log(data);
//     await db.get().collection('products').insertOne(data)
//     res.render('pages/product', { data })
// }
// const editProduct = async function(req, res) {
//     
// console.log(req.body);
//     let newdata = req.body
//     let query = { _id: ObjectId(req.body.id) }
//     var newvalues = { $set: newdata };
//     await db.get().collection('products').updateOne(query, newvalues)
//     res.redirect(`/products/${req.body.id}`)
// }
// const deleteProduct = async function(req, res) {
//     let id = req.params.id
//     await db.get().collection('products').deleteOne({ _id: ObjectId(id) })
//     res.redirect('/auths/admin/dashboard')
// }

// router.get('/clean', async function (req, res) {
//     // await db.get().collection('orders').remove()
//     db.get().collection('module').drop()
//         .then(() =>
//         // console.log('Module collection deleted.'))
//         .catch((error) =>
//             // console.error('Error deleting Module collection:', error));

//             db.get().collection('subject').drop()
//                 .then(() =>
//         // console.log('Subject collection deleted.'))
//         .catch((error) =>
//                     // console.error('Error deleting Subject collection:', error));

//                     db.get().collection('doc').drop()
//                         .then(() =>
//         // console.log('Doc collection deleted.'))
//         .catch((error) =>
//                             // console.error('Error deleting Doc collection:', error));

//                             db.get().collection('video').drop()
//                                 .then(() =>
//         // console.log('Video collection deleted.'))
//         .catch((error) =>
//                                     // console.error('Error deleting Video collection:', error));
//                                     res.redirect('back');
// });


// University Endpoint
router.get('/api/university', async (req, res) => {
    let universities = await db.get().collection('university').find().toArray();
    res.json(universities);
});

// Course Endpoint
router.get('/api/course', async (req, res) => {
    let courses = await db.get().collection('course').find().toArray();
    res.json(courses);
});

// Semester Endpoint
router.get('/api/semester', async (req, res) => {
    let semesters = await db.get().collection('semester').find().toArray();
    res.json(semesters);
});

// Subject Endpoint
router.get('/api/subject/:university/:course/:semester', async (req, res) => {
    const selectedUniversity = req.params.university;
    const selectedCourse = req.params.course;
    const selectedSemester = req.params.semester;
    const subjects = await db.get().collection('subject').find({
        universityname: selectedUniversity,
        coursename: selectedCourse,
        semestername: selectedSemester,
    }).toArray();
    // let subjects = await db.get().collection('subject').find().toArray();
    res.json(subjects);
});

// Module Endpoint
router.get('/api/module/:university/:course/:semester/:subject', async (req, res) => {
    const selectedUniversity = req.params.university;
    const selectedCourse = req.params.course;
    const selectedSemester = req.params.semester;
    const selectedSubject = req.params.subject;
    const modules = await db.get().collection('module').find({
        universityname: selectedUniversity,
        coursename: selectedCourse,
        semestername: selectedSemester,
        subjectname: selectedSubject,
    }).toArray();
    res.json(modules);
});

// Category Endpoint
router.get('/api/category', async (req, res) => {
    let categories = await db.get().collection('category').find().toArray();
    res.json(categories);
});

// Video Endpoint
router.get('/api/video/:university/:course/:semester/:subject/:module', async (req, res) => {
    const selectedUniversity = req.params.university;
    const selectedCourse = req.params.course;
    const selectedSemester = req.params.semester;
    const selectedSubject = req.params.subject;
    const selectedModule = req.params.module;
    const videos = await db.get().collection('video').find({
        universityname: selectedUniversity,
        coursename: selectedCourse,
        semestername: selectedSemester,
        subjectname: selectedSubject,
        modulename: selectedModule,
    }).toArray();
    res.json(videos);
});

// Doc Endpoint
router.get('/api/doc/:university/:course/:semester/:subject/:module/:category', async (req, res) => {
    const selectedUniversity = req.params.university;
    const selectedCourse = req.params.course;
    const selectedSemester = req.params.semester;
    const selectedSubject = req.params.subject;
    const selectedModule = req.params.module;
    const selectedCategory = req.params.category;
    const docs = await db.get().collection('doc').find({
        universityname: selectedUniversity,
        coursename: selectedCourse,
        semestername: selectedSemester,
        subjectname: selectedSubject,
        modulename: selectedModule,
        categoryname: selectedCategory
    }).toArray();
    console.log(docs);
    res.json(docs);
});


module.exports = router;