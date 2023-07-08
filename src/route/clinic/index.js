const express = require('express');
const router = express.Router();
const db = require('../../models/index');

// GET route for /clinic/:slug
router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  db.Clinic.findOne({ where: { slug: slug } })
    .then((clinic) => {
      if (clinic) {
        res.render('clinic-detail', { clinic: clinic });
      } else {
        res.status(404).send('Clinic not found.');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('DMM');
    });
});

// Other routes...

module.exports = router;
