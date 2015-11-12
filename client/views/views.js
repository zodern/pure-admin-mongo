console.log('body.js');
var collection = new Meteor.Collection();
Template.mongoBodyLayout.onCreated(function () {
  var self = this;
  Tracker.autorun(function () {
    try {
      self.subscribe('_pa.Mongo.collection', FlowRouter.getParam('collectionName'));
      collection = new Mongo.Collection(FlowRouter.getParam('collectionName'));
    } catch (e) {

    }
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

Template.mongoDocument.onCreated(function () {
  this.collapsed = new ReactiveVar;
  this.collapsed.set(false);
});

Template.mongoDocument.helpers({
  'collapsed': function () {
    return Template.instance().collapsed.get();
  },
  summary: function () {
    var json = JSON.stringify(this);
    // removes "" around keys
    json = json.replace(/"(\w+)"\s*:/g, '$1:');
    // add space after commas
    json = json.replace(/,/g, ', ');
    // remove brackets at start and end
    json = json.substring(1, json.length - 2);
    return json;
  }
});

Template.mongoDocument.events({
  'click .collapse-document': function () {
    console.log('will collapse');
    Template.instance().collapsed.set(!Template.instance().collapsed.get());
  },
  'click .edit-document': function () {

  }
});
