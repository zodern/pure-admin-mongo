// package wide vars
PAMongo = {
  PublicAPI: {}
};
PureAdmin.Mongo = PAMongo.PublicAPI;

// add files to Pure Admin
var packagePath = "/packages/zodern_pureadmin-mongo";
var clientPath = packagePath + "/client";
PureAdmin.addFiles([clientPath + '/menu_and_routing.js',
  clientPath + '/views/views.js']);
PureAdmin.addFiles('https://cdnjs.cloudflare.com/ajax/libs/jsondiffpatch/0.1.37/jsondiffpatch-full.min.js');
PureAdmin.addFiles('https://cdnjs.cloudflare.com/ajax/libs/jsondiffpatch/0.1.37/jsondiffpatch-formatters.js');
PureAdmin.addTemplate('mongoBodyLayout', clientPath + '/views/body_layout.html');
PureAdmin.addTemplate('mongoHeaderLayout', clientPath + '/views/body_header.html');
PureAdmin.addTemplate('mongoDocument', clientPath + '/views/document.html');
PureAdmin.addTemplate('mongoEditor', clientPath + '/views/editor.html');

PureAdmin.addStyleSheet(packagePath + '/style.css');
