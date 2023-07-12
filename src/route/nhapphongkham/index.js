const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const slugify = require('slugify');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Thêm phần mở rộng tệp
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('nhapphongkham', { successMessage: null, errorMessage: null });
});

router.post('/', upload.single('image'), async (req, res) => {
  const { name, address, description } = req.body;
  let slug = slugify(name, { lower: true, strict: true });
  const imagePath = '/uploads/' + req.file.filename;

  // Check if the slug already exists in the database
  let existingClinic = await db.Clinic.findOne({ where: { slug: slug } });
  if (existingClinic) {
    // If the slug already exists, append a number to it to make it unique
    let originalSlug = slug;
    let i = 1;
    do {
      slug = originalSlug + '-' + i;
      existingClinic = await db.Clinic.findOne({ where: { slug: slug } });
      i++;
    } while (existingClinic);
  }

  db.Clinic.create({
    name: name,
    address: address,
    description: description,
    slug: slug,
    image: imagePath,
  })
  .then(() => {
    res.redirect('/clinic/' + slug);
  })
  .catch((error) => {
    console.log(error);
    res.render('nhapphongkham.ejs', { successMessage: null, errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
  });
});


router.get('/suaphongkham', (req, res) => {
  // TODO: Render a form for the user to enter new clinic information
});
router.put('/suaphongkham', upload.single('image'), (req, res) => {
  // TODO: Call the putClinic function from the controller
});

module.exports = router;
