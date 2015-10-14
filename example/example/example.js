if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  var Test = new Mongo.Collection('test');
  Test.insert({name: 'testing', number: Math.random()});
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
