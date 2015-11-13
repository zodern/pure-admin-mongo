Meteor.methods({
  '_pa.Mongo.save': function (data) {
   if(PureAdmin.isAdmin(this.userId) === false) {
     throw new Meteor.Error('not-admin');
   }
    check(data, {
      collection: String,
      document: String,
      json: Object
    });
    var collection = Mongo.Collection.get(data.collection);
    //console.log(collection.find({_id: data.document}).fetch());
    var document = collection.findOne({_id: data.document});
    console.log(data);
    console.log(document);
    collection.update({_id: data.document}, data.json, {replace: true});
  }
});
