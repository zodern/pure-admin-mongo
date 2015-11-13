Meteor.publish('_pa.Mongo.collection', function (collectionName) {
  console.log('name', collectionName);
  if(PureAdmin.isAdmin(this.userId) === false) {
    return [];
  }
  //console.log(Mongo.Collection.get(collectionName).find().fetch());
  return Mongo.Collection.get(collectionName).find();
});

Meteor.publish('_pa.Mongo.document', function (info) {
  console.log(info);
  if(PureAdmin.isAdmin(this.userId) === false) {
    return [];
  }
  return Mongo.Collection.get(info.collection).find({_id: info.id});
});
