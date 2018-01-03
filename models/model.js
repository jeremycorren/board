const Datastore = require('@google-cloud/datastore');
const ds = Datastore({
	projectId: 'kanban-190604' //HARD-CODED, FIX LATER
});

const kind = 'Card';

function fromDatastore (obj) {
   obj.id = obj[Datastore.KEY].id;
   return obj;
}

function toDatastore (obj, nonIndexed) {
   nonIndexed = nonIndexed || [];
   const results = [];

   Object.keys(obj).forEach((k) => {
      if (obj[k] === undefined) {
         return;
      }

      results.push({
         name: k,
         value: obj[k],
         excludeFromIndexes: nonIndexed.indexOf(k) !== -1
      });
   });
   return results;
}

function update(id, data, callback) {
   let cardKey;
   if (id) {
      cardKey = ds.key([kind, parseInt(id, 10)]);
   } else {
      cardKey = ds.key(kind);
      data.created = new Date();
   }

   const entity = {
      key: cardKey,
      data: toDatastore(data, ['description'])
   }

   ds.save(entity, (err) => {
      data.id = entity.key.id;
      callback(err, err ? null : data);
   });
}

function create(data, callback) {
   update(null, data, callback);
}

function read(id, callback) {
   const cardKey = ds.key([kind, parseInt(id, 10)]);
   ds.get(cardKey, (err, entity) => {
      if (!err && !entity) {
         err = { code: 404, message: 'Not found'};
      }

      if (err) {
         callback(err);
         return;
      }

      callback(null, fromDatastore(entity));
   });
}

function _delete(id, callback) {
   const cardKey = ds.key([kind, parseInt(id, 10)]);
   ds.delete(cardKey, callback);
}

function list(filter, sort, callback) {
   let query;
   if (filter) { 
      query = ds.createQuery([kind])
         .filter('category', '=', filter)
         .order('created', { descending: true });
   } else {
      query = ds.createQuery([kind])
         .order('created', { descending: true });
   }

   ds.runQuery(query, (err, entities, nextQuery) => {
      if (err) {
         callback(err);
         return;
      }
      callback(null, entities.map(fromDatastore));
   });
}

module.exports = {
   create,
   update,
   read,
   delete: _delete,
   list
};