console.log('body.js');
var collection;
Template.mongoBodyLayout.onCreated(function () {
  this.subscribe('_pa.Mongo.collection', FlowRouter.getParam('collectionName'));
  collection = new Mongo.Collection(FlowRouter.getParam('collectionName'));
});

Template.mongoBodyLayout.helpers({
  data: function () {
    console.log(collection);
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
