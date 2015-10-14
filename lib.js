// package wide vars
PAMongo = {
  PublicAPI: {}
};
PureAdmin.Mongo = PAMongo.PublicAPI;

// add files to Pure Admin
PureAdmin.addFiles(['/packages/zodern_pureadmin-mongo/client/menu_and_routing.js',
  '/packages/zodern_pureadmin-mongo/client/views/body_layout/body.js']);
PureAdmin.addTemplate('mongoBodyLayout', '/packages/zodern_pureadmin-mongo/client/views/body_layout/body_layout.html');
PureAdmin.addTemplate('mongoHeaderLayout', '/packages/zodern_pureadmin-mongo/client/views/body_layout/body_header.html');
