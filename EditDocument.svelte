<script>
  import { EJSON } from "meteor/ejson";
  import jsondiffpatch from "jsondiffpatch";
  import { onMount } from "svelte";

  const processor = jsondiffpatch.create({
    cloneDiffValues: true
  });

  export let collection;
  export let documentId;

  let doc;
  let diffRef;
  let originalDocument;

  onMount(() => {
    Meteor.call('_pa.Mongo.document', collection, documentId, (err, result) => {
      if (err) {
        return alert(`Error loading document: ${err}`);
      }
      originalDocument = result;
      doc = EJSON.stringify(result, { indent: true });
    });
  });

  function diff() {
    const editing = EJSON.parse(doc);
    const delta = processor.diff(originalDocument, editing);

    if (delta) {
      diffRef.innerHTML = jsondiffpatch.formatters.html.format(
        delta,
        originalDocument
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
