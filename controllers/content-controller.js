const { ObjectId } = require('mongodb');
const db = require('../connection');

const addContent = async function (req, res) {
    let data = await db.get().collection('content').insertOne({ name: "Hall Boi" })
    console.log(data);
    res.render('view-content', { data });
}

const viewContent = async function (req, res) {
    let data = await db.get().collection('content').find().toArray()
    console.log(data);
    res.render('view-content', { data: data[0] });
}
const viewContentjson = async function (req, res) {
    let data = await db.get().collection('content').find().toArray()
    console.log(data);
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/'); // replace with your client-side domain
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
    res.json({ data: data[0] });
}

const editContentForm = async function (req, res) {
    let data = await db.get().collection('content').findOne({ _id: ObjectId("643828592fe7f8fbf282901a") })
    // console.log(data);
    res.render('editcontent', { data });
}

const editContent = async function (req, res) {
    // console.log(req.body);
    let newdata = req.body
    let query = { _id: ObjectId("643828592fe7f8fbf282901a") }
    var newvalues = { $set: newdata };
    await db.get().collection('content').updateOne(query, newvalues)
    res.redirect('back')
}

exports.viewContentjson = viewContentjson;
exports.viewContent = viewContent;
exports.editContentForm = editContentForm;
exports.editContent = editContent;
exports.addContent = addContent;
