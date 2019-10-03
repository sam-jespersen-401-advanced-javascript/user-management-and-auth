/* eslint-disable new-cap */

const router = require('express').Router();
const Language = require('../models/language');

router

  .get('/', (req, res, next) => {
    Language.find()
      .then(langs => {
        res.json(langs);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Language.findById(req.params.id)
      .then(cat => {
        res.json(cat);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Language.create(req.body)
      .then(cat => {
        res.json(cat);
      })
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Language.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(cat => {
        res.json(cat);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Language.findByIdAndRemove(req.params.id)
      .then(removed => {
        res.json(removed);
      })
      .catch(next);
  });

module.exports = router;