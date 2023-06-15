import bcrypt from "bcrypt";
import User from "../models/User.js";
import Store from "../models/Store.js";

/* REGISTER USER */
export const register = async (req, res) => {
  // //console.log('called');
  try {
    const {
      // firstName,
      // lastName,
      name,
      email,
      pswd,
      // picturePath,
      // friends,
      phone,
      location,
      pincode,
      deviceid,

    } = req.body;

    // //console.log(req.body);
    // //console.log(name,email,pswd);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pswd, salt);

    const newUser = new User({
      // firstName,
      // lastName,
      name,
      email,
      pswd: passwordHash,
      // picturePath,
      // friends,
      phone,
      location,
      pincode,
      deviceid,
      cpswd: pswd
      // viewedProfile: Math.floor(Math.random() * 10000),
      // impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();

    let userid = savedUser._id.toString();
    // //console.log(userid);
    res.status(201).json([{ "id": userid }]);

    // res.status(201).json(savedUser);
  } catch (err) {
    // //console.log("err",err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  //console.log('called');
  try {
    const { email, pswd } = req.body;
    //console.log(email, pswd);
    const user = await User.findOne({ email: email });
    //console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. " });
      //console.log(' uaser not found');
    }

    const isMatch = await bcrypt.compare(pswd, user.pswd);
    //console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
      //console.log(' invalid');
    }

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    // res.status(201).json({ token, user });

    let userid = user._id.toString();
    let userlocation = user._id;
    // //console.log(userid);
    res.status(201).json([{ "id": userid }]);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const userlocation = async (req, res) => {

  //console.log('called');
  try {
    let id = req.params.userid;
    //console.log(id);
    const user = await User.findOne({ _id: id });
    //console.log(user);
    if (!user) {
      //console.log(' user not found');
      return res.status(400).json({ msg: "User does not exist. " });
    }

    let userlocation = user.location;
    //console.log(userlocation);
    res.status(201).json([{ "location": userlocation }]);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ error: true });
  }
};

/* LOGGING IN */
export const update = async (req, res) => {
  //console.log('called');
  try {
    const { location, longitude, latitude, pincode } = req.body;
    // //console.log(location, longitude, latitude, pincode,req.params.userid);
    User.findByIdAndUpdate(req.params.userid,
      { $set: req.body },
      function (err, data) {
        if (err) {
          res.status(501).json({ status: false, err: err });
        }
        else {
          res.status(201).json({ status: true, data: data });
        }
      });
    // res.status(201).json([{ "id": userid }]);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: true });
  }
};


export const getUserSavedStores = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.find({ _id: userid });
    let svdstores = [];
    let userstores = user[0].savedstores;
    for (let i = 0; i < userstores.length; i++) {
      let store = await Store.findOne({ _id: userstores[i] });
      store.type = store._id;
      svdstores.push(store);
    }

    svdstores.forEach((shop) => {
      shop.distance = calculateDistance(
        userLat,
        userLon,
        shop.latitude,
        shop.longitude,
      );
      //console.log(shop.distance);
    });

    // Sort the shops based on their distance
    svdstores.sort((a, b) => a.distance - b.distance);

    // Filter the shops based on the maximum distance
    svdstores = svdstores.filter((shop) => shop.distance <= 1000000000);


    // let stores = await getSavedShops(user.latitude, user.longitude, 100000000);
    svdstores.forEach(element => {
      // // // //console.log(element);
      element.type = element._id;
    });

    res.status(201).json(svdstores);

  } catch (err) {
    //console.log(err);
    res.status(404).json({ message: err.message });
  }
};
