const express = require('express');
const router = express.Router();
const db = require('../../models/index');

// GET route for /giaodienphongkham/:slug
router.get('/giaodienphongkham/:slug', async (req, res) => {
  const slug = req.params.slug;
  const clinic = await db.Clinic.findOne({ where: { slug: slug } });
  if (clinic) {
    // Render a new view for editing the clinic
    res.render('clinic-edit', { clinic: clinic });
  } else {
    res.status(404).send('Clinic not found.');
  }
});
// POST route for /giaodienphongkham/:slug
router.post('/giaodienphongkham/:slug', async (req, res) => {
  const slug = req.params.slug;
  const { name, address, description } = req.body;
  const clinic = await db.Clinic.findOne({ where: { slug: slug } });
  if (clinic) {
    // Update the clinic
    clinic.name = name;
    clinic.address = address;
    clinic.description = description;
    await clinic.save();
    res.redirect('/clinic/' + slug);
  } else {
    res.status(404).send('Clinic not found.');
  }
});

// GET route for /clinic
router.get('/', (req, res) => {
  db.Clinic.findAll()
    .then((clinics) => {
      res.render('clinic', { clinics: clinics });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('An error occurred.');
    });
});

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
      res.status(500).send('An error occurred.');
    });
});


module.exports = router;
