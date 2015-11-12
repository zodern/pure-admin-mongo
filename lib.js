// package wide vars
PAMongo = {
  PublicAPI: {}
};
PureAdmin.Mongo = PAMongo.PublicAPI;

// add files to Pure Admin
var packagePath = "/packages/zodern_pureadmin-mongo";
var clientPath = packagePath + "/client";
PureAdmin.addFiles([clientPath + '/menu_and_routing.js',
  clientPath + '/views/body.js']);
PureAdmin.addTemplate('mongoBodyLayout', clientPath + '/views/body_layout.html');
PureAdmin.addTemplate('mongoHeaderLayout', clientPath + '/views/body_header.html');

PureAdmin.addStyleSheet(packagePath + '/style.css');
