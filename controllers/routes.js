const express = require('express');
const bodyParser = require('body-parser');

function getModel() {
	return require('./../models/model');
}

function filterList(req, res) {
   getModel().list(
      req.body.filter ? req.body.filter : null,
      null,
      (err, entities) => {
         if (err) {
            res.end(err);
            return;
         }
         res.render('list.pug', { cards: entities });
      }
   );
}

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use((req, res, next) => {
   res.set('Content-Type', 'text/html');
   next();
});

router.get('/', (req, res) => {
   getModel().list(null, 'OPEN', (err, openEntities) => {
      if (err) {
         res.end(err);
         return;
      }

      getModel().list(null, 'PROGRESS', (err, progressEntities) => {
         if (err) {
            res.end(err);
            return;
         }

         res.render('list.pug', { 
            openCards: openEntities,
            progressCards: progressEntities 
         });
      });
   });
});

router.post('/', filterList);

router.post('/push', (req, res) => {
   const array = (req.body.idStatus).split(',');
   const id = array[0];
   const status = array[1];
   getModel().updateStatus(id, status, (err) => {
      if (err) {
         next(err);
         return;
      }
      res.redirect('/');
   });
});

router.get('/add', (req, res) => {
   res.render('form.pug', { card: {} });
});

router.post('/add', (req, res, next) => {
   const data = req.body;
   getModel().create(data, (err, savedData) => {
      if (err) {
         res.end(err);
         return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
   });
});

router.get('/:card', (req, res, next) => {
   getModel().read(req.params.card, (err, entity) => {
      if (err) {
         next(err);
         return;
      }
      res.render('view.pug', { card: entity });
   });
});

router.post('/:card', filterList);

router.get('/:card/edit', (req, res, next) => {
   getModel().read(req.params.card, (err, entity) => {
      if (err) {
         next(err);
         return;
      }
      res.render('form.pug', { card: entity });
   });
});

router.post('/:card/edit', (req, res, next) => {
   const data = req.body;
   getModel().update(req.params.card, data, (err, savedData) => {
      if (err) {
         next(err);
         return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
   });
});

router.get('/:card/delete', (req, res, next) => {
   getModel().delete(req.params.card, (err) => {
      if (err) {
         next(err);
         return;
      }
      res.redirect(req.baseUrl);
   });
});

module.exports = router;