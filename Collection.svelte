<script>
  import Document from "./Document.svelte";
  import { onDestroy } from 'svelte';

  export let collection;

  let documents;
  let sub = Meteor.subscribe("_pa.Mongo.collection", collection)

  let autorun = Tracker.autorun(() => {
    documents = Mongo.Collection.get(collection)
      .find()
      .fetch();
  });

  onDestroy(() => {
    autorun.stop();
    sub.stop();
  });
</script>

{#each documents as doc, index}
  <div class="mongo-document">
    <Document on:goTo document={doc} collection={collection} />
  </div>
{/each}
