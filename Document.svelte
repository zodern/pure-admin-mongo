<script>
  export default {
    data() {
      return {
        collapsed: false
      };
    },
    helpers: {
      summarize(document) {
        let json = JSON.stringify(document);
        // removes "" around keys
        json = json.replace(/"(\w+)"\s*:/g, "$1: ");
        // add space after commas
        json = json.replace(/,/g, ", ");
        // remove brackets at start and end
        json = json.substring(1, json.length - 2);

        return json.substring(0, 200);
      },
      formatJson(document) {
        return JSON.stringify(document, null, 4);
      }
    },
    methods: {
      edit() {
        const {
          collection,
          document
        } = this.get();

        this.fire('goTo', {
          page: 'editDocument',
          props: {
            collection,
            documentId: document._id
          }
        });
      },
      toggleCollapsed () {
        const {
          collapsed
        } = this.get();
        this.set({
          collapsed: !collapsed
        });
      }
    }
  };
</script>

<button on:click="edit()">Edit</button>
{#if collapsed}
  <pre class="collapse-document" on:click="toggleCollapsed()">+ {summarize(document)}</pre>
{:else}
  <div class="collapse-document" on:click="toggleCollapsed()">-</div>
  <pre>
    {formatJson(document, null, 4)}
  </pre>
{/if}
