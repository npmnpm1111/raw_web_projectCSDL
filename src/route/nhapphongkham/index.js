const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const slugify = require('slugify');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Thay đổi đường dẫn tùy theo nơi bạn muốn lưu trữ tập tin
router.get('/', (req, res) => {
  res.render('nhapphongkham', { successMessage: null, errorMessage: null });
});

router.post('/', upload.single('image'),(req, res) => {
  const { name, address, description } = req.body;
  const slug = slugify(name, { lower: true, strict: true });

  db.Clinic.create({
    name: name,
    address: address,
    description: description,
    slug: slug,
  })
  .then(() => {
    res.redirect('/clinic/' + slug);
  })
  .catch((error) => {
    console.log(error);
    res.render('nhapphongkham.ejs', { successMessage: null, errorMessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
  });
});

module.exports = router;
