<script>
  import { EJSON } from "meteor/ejson";
  import jsondiffpatch from "jsondiffpatch";
  import { onDestroy } from "svelte";

  const processor = jsondiffpatch.create({
    cloneDiffValues: true
  });

  export let collection;
  export let documentId;

  let sub = Meteor.subscribe("_pa.Mongo.document", {
    collection,
    id: documentId
  });
  let diffRef;
  let doc;
  let origionalDocument;
  let autorun = Tracker.autorun(() => {
    origionalDocument = Mongo.Collection.get(collection).findOne({
      _id: documentId
    });
    doc = EJSON.stringify(origionalDocument, { indent: true });
  });

  function diff() {
    const editing = EJSON.parse(doc);
    const delta = processor.diff(origionalDocument, editing);

    if (delta) {
      diffRef.innerHTML = jsondiffpatch.formatters.html.format(
        delta,
        origionalDocument
      );
      jsondiffpatch.formatters.html.showUnchanged();
    } else {
      diffRef.innerHTML = "Document was not modified";
    }
  }

  function save() {
    let json;
    try {
      json = EJSON.parse(doc);
    } catch (e) {
      alert("Unable to parse document. Make sure it is valid json.");
    }

    const shouldContinue = confirm("Are you sure you want to save your edits?");
    if (!shouldContinue) {
      return;
    }

    Meteor.call(
      "_pa.Mongo.save",
      {
        collection: collection,
        documentId: documentId,
        json
      },
      (e, d) => {
        if (e) {
          alert("Error saving. Check the javscript console for details.");
        } else {
          alert("Changes saved");
        }
      }
    );
  }

  onDestroy(() => {
    sub.stop();
    autorun.stop();
  });
</script>

<div id="mongoEditor">
  {#if doc}
    <div class="mongo-editor-content">
      <textarea wrap="soft" spellcheck={false} bind:value={doc} />
      <div class="view" bind:this={diffRef} />
    </div>
    <div>
      <button on:click={diff}>Diff</button>
      <button on:click={save}>Save</button>
    </div>
  {:else}Loading...{/if}
</div>
