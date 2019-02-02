Package.describe({
  name: 'zodern:pureadmin-mongo',
  version: '0.0.3',
  summary: 'View and Edit Data from MongoDB in Pure Admin',
  git: 'https://github.com/zodern/puareadmin-mongo.git',
  documentation: 'README.md'
});

Npm.depends({
  'jsondiffpatch': '0.3.11'
});

Package.onUse(function (api) {
  api.versionsFrom('1.8.0.2');
  api.use('zodern:pure-admin@0.5.0');
  api.use(['ecmascript', 'check', 'dynamic-import']);
  api.use('dburles:mongo-collection-instances@0.3.4');
  api.use('svelte:compiler@2.15.3_1');

  api.mainModule('./main.js', 'client');
  api.mainModule('./server.js', 'server');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('zodern:pureadmin-mongo');
  api.addFiles('pureadmin-mongo-tests.js');
});
