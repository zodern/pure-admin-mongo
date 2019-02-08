<script>
  import { EJSON } from 'meteor/ejson';
  import jsondiffpatch from 'jsondiffpatch';
  const processor = jsondiffpatch.create({
    cloneDiffValues: true
  });

  export default {
    oncreate() {
      const { props } = this.get();

      this.sub = Meteor.subscribe('_pa.Mongo.document', {
        collection: props.collection,
        id: props.documentId
      });
      this.autorun = Tracker.autorun(() => {
        const document = Mongo.Collection.get(props.collection).findOne({
          _id: props.documentId
        });
        this.set({
          originalDocument: document,
          document: EJSON.stringify(document, {indent: true})
        });
      });
    },
    ondestroy ( ) {
      this.sub.stop();
      this.autorun.stop();
    },
    methods: {
      diff() {
        const { originalDocument, document } = this.get();
        const editing = EJSON.parse(document);
        
        const delta = processor.diff(originalDocument, editing);
        console.log('delta', delta);
        if (delta) {
          this.refs.diff.innerHTML = jsondiffpatch.formatters.html.format(
            delta,
            originalDocument
          );
          jsondiffpatch.formatters.html.showUnchanged();
        } else {
          this.refs.diff.innerHTML = 'Document was not modified';
        }
      },
      save() {
        const { props, document } = this.get();
        let json;
        try {
          json = EJSON.parse(document);
        } catch (e) {
          alert('Unable to parse document. Make sure it is valid json.');
        }

        const shouldContinue = confirm(
          'Are you sure you want to save your edits?'
        );
        if (!shouldContinue) {
          return;
        }

        Meteor.call(
          '_pa.Mongo.save',
          {
            collection: props.collection,
            documentId: props.documentId,
            json
          },
          (e, d) => {
            console.log(e, d);
            if (e) {
              alert('Error saving. Check the javscript console for details.');
            } else {
              alert('Changes saved');
            }
          }
        );
      }
    }
  };
</script>
<div id="mongoEditor">
  {#if document}
    <div class="mongo-editor-content">
      <textarea wrap="soft" spellcheck="false" bind:value="document" />
      <div class="view" ref:diff></div>
    </div>
    <div>
      <button on:click="diff()">Diff</button>
      <button on:click="save()">Save</button>
    </div>
  {:else}
    Loading...
  {/if}
</div>
