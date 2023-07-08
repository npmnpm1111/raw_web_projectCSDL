const express = require('express');
const router = express.Router();
const db = require('../../models/index');
const slugify = require('slugify');

router.get('/', (req, res) => {
  res.render('nhapphongkham', { successMessage: null, errorMessage: null });
});

router.post('/', (req, res) => {
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
