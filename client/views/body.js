console.log('body.js');
var collection = new Meteor.Collection();
Template.mongoBodyLayout.onCreated(function () {
  var self = this;
  Tracker.autorun(function () {
    self.subscribe('_pa.Mongo.collection', FlowRouter.getParam('collectionName'));
    collection = new Mongo.Collection(FlowRouter.getParam('collectionName'));
  });
});

Template.mongoBodyLayout.helpers({
  data: function () {
    //console.log(collection);
    console.log(collection.find().fetch());
    return collection.find();
  },
  stringify: function () {
    return JSON.stringify(this);
  }
});

Template.mongoHeaderLayout.helpers({
  collectionName: function () {
    console.log(FlowRouter.current().params.collectionName);
    return FlowRouter.getParam('collectionName');
  }
});

Template.mongoHeaderLayout.events({
  'click .collapse': function () {

  }
});
