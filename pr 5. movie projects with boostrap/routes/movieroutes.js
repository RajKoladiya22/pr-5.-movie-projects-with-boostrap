const express = require('express');
const routs = express.Router();
const moviecontroller = require('../controller/moviecontroller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileUpload = multer({storage : storage}).single('poster');

routs.use(express.urlencoded({ extended: true }));

routs.get('/', moviecontroller.movieData);
routs.get('/add', moviecontroller.add);
routs.post('/AddMovie', fileUpload, moviecontroller.AddMovie);
routs.get('/deleteData',moviecontroller.deleteData);
routs.get('/editData',moviecontroller.editData);
routs.post('/updateRecord',fileUpload,moviecontroller.updateRecord);

module.exports = routs;
