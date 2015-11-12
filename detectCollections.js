PAMongo.collectionNames = [];

var blackList = [
  'meteor_accounts_loginServiceConfiguration',
  '_PureAdmin-Admins',
  'meteor_autoupdate_clientVersions',
  'users',
  'velocityTestFiles',
  'velocityFixtureFiles',
  'velocityTestReports',
  'velocityAggregateReports',
  'velocityLogs',
  'velocityMirrors',
  'velocityOptions',
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
  //console.log(Mongo.Collection.getAll());
  var names = Mongo.Collection.getAll();
  names.forEach((item) => {
      if(blackList.indexOf(item.name) === -1) {
        PAMongo.collectionNames.push(item.name);
      } else {
        console.log('collection not added: ', item);
      }
    });
});

Meteor.methods({
  '_pa.mongo.collectionNames': function () {
    if(PureAdmin.isAdmin(this.userId) === false) {
      throw new Meteor.Error('not-admin');
    }
    return PAMongo.collectionNames;
  }
});
