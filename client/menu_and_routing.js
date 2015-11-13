var collectionNames = [];

Meteor.call('_pa.mongo.collectionNames', function(e, list) {
  collectionNames = list;
  //console.log(e, list);
  collectionNames.forEach((name)=> {
    PureAdmin.addPage('{adminRoute}/collections/' + name, 'Collections', name);
  });
});

PureAdmin.adminRoutes.route('/collections/:collectionName', {
  action: function (params) {
  // console.log('collectionname: ', params.collectionName);
    BlazeLayout.render('main', {header: 'mongoHeaderLayout',body: 'mongoBodyLayout'});
  }
});

PureAdmin.adminRoutes.route('/collections/:collectionName/edit/:documentId', {
  action: function(params) {
   BlazeLayout.render('main', {header: 'mongoHeaderLayout', body: 'mongoEditor'});
  },
  name: 'editCollection'
});

