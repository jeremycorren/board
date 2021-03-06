const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use((req, res, next) => {
   res.set('Content-Type', 'text/html');
   next();
});

router.get('/', loadCards);

router.post('/', loadCards);

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

router.post('/:card', loadCards);

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

function getModel() {
   return require('./../models/model');
}

function loadCards(req, res) {
   getModel().list(req.body.filter, (err, entities) => {
      if (err) {
         res.end(err);
         return;
      }

      let open = [], progress = [], complete = [];
      entities.forEach(entity => {
         if (entity.status === 'OPEN') {
            open.push(entity);
         } else if (entity.status === 'PROGRESS') {
            progress.push(entity);
         } else if (entity.status === 'COMPLETE') {
            complete.push(entity);
         }
      });

      res.render('list.pug', { 
         openCards: open,
         progressCards: progress,
         completeCards: complete
      });
   });
}

module.exports = router;