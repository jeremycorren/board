const express = require('express');
const bodyParser = require('body-parser');

function getModel() {
	return require('./../models/model');
}

function queryCards(req, res) {
   getModel().list(req.body.filter, 'OPEN', (err, openEntities) => {
      if (err) {
         res.end(err);
         return;
      }

      getModel().list(req.body.filter, 'PROGRESS', (err, progressEntities) => {
         if (err) {
            res.end(err);
            return;
         }

         getModel().list(req.body.filter, 'COMPLETE', (err, completeEntities) => {
            if (err) {
               res.end(err);
               return;
            }
            res.render('list.pug', { 
               openCards: openEntities,
               progressCards: progressEntities,
               completeCards: completeEntities
            });
         });
      });
   });
}

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use((req, res, next) => {
   res.set('Content-Type', 'text/html');
   next();
});

router.get('/', queryCards);

router.post('/', queryCards);

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

router.post('/:card', queryCards);

router.get('/:card/edit', (req, res, next) => {
   getModel().read(req.params.card, (err, entity) => {
      if (err) {
         next(err);
         return;
      } console.log(entity)
      res.render('form.pug', { card: entity, selected: entity.category });
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