const MovieModel = require("../models/moviemodes");

const fs = require("fs");

const movieData = async (req, res) => {
  try {
    const record = await MovieModel.find({}).exec();
    return res.render("index", { record });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const add = (req, res) => {
  return res.render("addmovie");
};

const AddMovie = async (req, res) => {
  try {
    const { name, desc, oprice, fprice } = req.body;

    const movieData = await MovieModel.create({
      name,
      desc,
      fprice,
      oprice,
      poster: req.file.path,
      // img: req.file.path,
    });

    if (movieData) {
      console.log(`Movie Successfully Added`);
      return res.redirect("back");
    } else {
      console.log("something wrong");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteData = async (req, res) => {
  try {
    let deleterecord = await MovieModel.findById(req.query.id);

    if (deleterecord && deleterecord.image) {
      fs.unlinkSync(deleterecord.image);
      console.log("File deleted:", deleterecord.image);
    } else {
      console.log("File path is undefined or missing.");
    }

    let d = await MovieModel.findByIdAndDelete(req.query.id);
    console.log("Record deleted");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return false;
  }
};

const editData = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await MovieModel.findById(id);
    return res.render("edit", { single });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateRecord = async (req, res) => {
  try {
    if (req.file) {
      let old = await MovieModel.findById(req.body.id);

      // Check if old exists and has the image property
      if (old && old.image) {
        fs.unlinkSync(old.image);
        console.log("Old file deleted:", old.image);
      } else {
        console.log("Old file path is undefined or missing.");
      }

      let up = await MovieModel.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        desc: req.body.desc,
        fprice: req.body.fprice,
        oprice: req.body.oprice,
        poster: req.file.path,
      });

      if (up) {
        console.log("Record updated");
        return res.redirect("/");
      }
    } else {
      let up = await MovieModel.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        desc: req.body.desc,
        fprice: req.body.fprice,
        oprice: req.body.oprice,
      });

      if (up) {
        console.log("Record updated (without changing poster)");
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};


module.exports = {
  movieData,
  add,
  AddMovie,
  deleteData,
  editData,
  updateRecord,
};
