import { PureAdmin } from 'meteor/zodern:pure-admin';

let collections = [];

export function getCollections () {
  return collections;
}

var blackList = [
  'meteor_accounts_loginServiceConfiguration',
  '_PureAdmin-Admins',
  'meteor_autoupdate_clientVersions',
  'MeteorToys.Impersonate',
  'MeteorToys.JetSetter',
  'MeteorToys.Mongol',
  'MeteorToys.AutoPub',
  'MeteorToys.Email',
  'MeteorToys.Result',
  'MeteorToys.Throttle',
  'MeteorToys.Credentials'
];

Meteor.startup(function () {
  collections = Mongo.Collection.getAll()
    .map(({ name }) => name)
    // Meteorx creates collections starting with __dummy_coll_
    .filter(name => name && !blackList.includes(name) && !name.startsWith('__dummy_coll_'))
});

Meteor.publish('_pa.Mongo.collection', function (collectionName) {
  check(collectionName, String);

  if(!PureAdmin.isAdmin(this.userId)) {
    return [];
  }

  // TODO: paginate and search
  return Mongo.Collection.get(collectionName).find();
});

Meteor.methods({
  '_pa.mongo.collectionNames': function () {
    if(!PureAdmin.isAdmin(this.userId)) {
      throw new Meteor.Error('not-admin');
    }

    return collections;
  },
  '_pa.Mongo.document': function (collection, id) {
    if (!PureAdmin.isAdmin(this.userId)) {
      throw new Meteor.Error('not-admin');
    }

    check(collection, String);
    check(id, String);

    return Mongo.Collection.get(collection).findOne({_id: id})
  },
  '_pa.Mongo.save': function (data) {
   if(!PureAdmin.isAdmin(this.userId)) {
     throw new Meteor.Error('not-admin');
   }

    check(data, {
      collection: String,
      documentId: String,
      json: Object
    });
  
    var collection = Mongo.Collection.get(data.collection);
    var document = collection.findOne({_id: data.documentId});
    console.log("replacing document");
    console.log(data);
    console.log(document);

    collection.update({_id: data.documentId}, data.json, {replace: true});
  }
});
