import { PureAdmin } from 'meteor/zodern:pure-admin';
import Collection from './Collection.svelte';
import EditDocument from './EditDocument.svelte';
import styles from './css';

PureAdmin.addCss(styles);
PureAdmin.addPage({
  name: 'collection',
  title: props => props.collection,
  render: utils => utils.renderSvelte(Collection)
});

PureAdmin.addPage({
  name: 'editDocument',
  title: props => `Edit ${props.collection}: ${props.documentId}`,
  render: utils => utils.renderSvelte(EditDocument)
})

Meteor.call('_pa.mongo.collectionNames', (e, list) => {
  list.forEach(name => {
    PureAdmin.addMenuItem({
      name,
      section: "Collections",
      page: "collection",
      pageProps: {
        collection: name
      }
    });
  })
})
