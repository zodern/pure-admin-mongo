Meteor.publish('_pa.Mongo.collection', function (collectionName) {
  console.log('name', collectionName);
  if(PureAdmin.isAdmin(this.userId) === false) {
    return [];
  }
  //console.log(Mongo.Collection.get(collectionName).find().fetch());
  return Mongo.Collection.get(collectionName).find();
});
