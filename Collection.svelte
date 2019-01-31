<script>
  import Document from "./Document.svelte";

  export default {
    data() {
      return {
        documents: []
      };
    },
    components: {
      Document
    },
    oncreate() {
      const { props } = this.get();

      this.sub = Meteor.subscribe("_pa.Mongo.collection", props.collection);
      this.autorun = Tracker.autorun(() => {
        this.set({
          documents: Mongo.Collection.get(props.collection)
            .find()
            .fetch()
        });
      });
    },
    ondestroy() {
      this.sub.stop();
      this.autorun.stop();
    }
  };
</script>

{#each documents as document}
  <div class="mongo-document">
    <Document on:goTo {document} collection={props.collection} />
  </div>
{/each}
