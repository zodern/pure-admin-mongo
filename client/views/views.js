console.log('body.js');
var collection = new Meteor.Collection(null);
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
  document: function() {
    return JSON.parse(JSON.stringify(this));
  },
  'collapsed': function () {
    return Template.instance().collapsed.get();
  },
  summary: function () {
    var json = JSON.stringify(this);
    // removes "" around keys
    json = json.replace(/"(\w+)"\s*:/g, '$1: ');
    // add space after commas
    json = json.replace(/,/g, ', ');
    // remove brackets at start and end
    json = json.substring(1, json.length - 2);
    return json;
  }
});

Template.mongoDocument.events({
  'click .collapse-document': function () {
    Template.instance().collapsed.set(!Template.instance().collapsed.get());
  },
  'click .edit-document': function (e, t) {
    var collection = FlowRouter.getParam('collectionName');
    var id = t.data._id;
    FlowRouter.go('editCollection', {
      collectionName: collection,
      documentId: id
    });
  }
});

// editor
Template.mongoEditor.onCreated(function () {
  this.subscribe('_pa.Mongo.document', {
    collection: FlowRouter.getParam('collectionName'),
    id: FlowRouter.getParam('documentId')
  });
  try {
    collection = new Meteor.Collection(FlowRouter.getParam('collectionName'));
  } catch (e) {
    console.log(e);
  }
});

Template.mongoEditor.helpers({
  json: function () {
    return JSON.stringify(collection.findOne({_id: FlowRouter.getParam('documentId')}), null, 2);
  }
});

Template.mongoEditor.events({
  'click .diff': function (e, t) {
    //TODO: do this whenever the textarea changes
    var existing = collection.findOne({_id: FlowRouter.getParam('documentId')});
    existing = JSON.parse(JSON.stringify(existing));
    try {
      var edited = JSON.parse(t.$('textarea').val());
    } catch (e) {
      //TODO: try to find where in the JSON the format is wrong
      // to give a better error message
      alert('Error parsing JSON');
      return;
    }
    var delta = jsondiffpatch.diff(existing, edited);
    console.log(delta);
    if(typeof delta === "undefined") {
      t.$('.view').html('<pre>' + JSON.stringify(edited, null, 2) + '</pre><p>No change to document.</p>');
    } else {
      //console.log(jsondiffpatch.formatters.html.format(delta, existing));
      t.$('.view').html(jsondiffpatch.formatters.html.format(delta, existing));
      jsondiffpatch.formatters.html.showUnchanged();
    }

  },
  'click .format': function (e, t) {
    alert('will format');
  },
  'click #save': function (e, t) {
    var json = t.$('textarea').val();
    try{
      json = JSON.parse(json);
    } catch (e) {
      alert('Error parsing JSON');
    }
    Meteor.call('_pa.Mongo.save', {
      collection: FlowRouter.getParam('collectionName'),
      document: FlowRouter.getParam('documentId'),
      json: json
    }, function (e, d){
      console.log(e, d);
      if (e) {
        alert('Error saving. Check the javscript console for details.');
      } else {
        alert('Changes saved');
      }
    });
  }
});


