<template>
  <div v-if="editor">
    <editor-content :editor="editor" />
    <div class="flex">
      <button @click="handleClick('@')">Add @mention</button>
      <button @click="handleClick('#')">Add #hashtag</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNode } from "./mention";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";

import defineSuggestions from "./suggestion";

const editor = useEditor({
  extensions: [
    StarterKit,
    createNode("mention", "@").configure({
      HTMLAttributes: {
        class: "mention",
      },
      suggestion: defineSuggestions("mention-suggestions"),
    }),
    createNode("hashtag", "#").configure({
      HTMLAttributes: {
        class: "hashtag",
      },
      suggestion: defineSuggestions("hashtag-suggestions"),
    }),
  ],
  content: `<p>New text handler for notimo <span data-type="mention" class="mention" data-id="Tom Cruise">@Tom Cruise</span> </p><p><span data-type="hashtag" class="hashtag" data-id="greenflags">#greenflags</span> <span data-type="hashtag" class="hashtag" data-id="start">#start</span> <span data-type="mention" class="mention" data-id="Christina Applegate">@Christina Applegate</span> <span data-type="hashtag" class="hashtag" data-id="action">#action</span> </p>`,
});

function handleClick(char: "@" | "#") {
  console.log(editor.value?.getHTML())
  editor.value?.commands.insertContent(char);
  editor.value?.commands.focus();
}
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  border: 1px solid #ddd;
  padding: 0.25em 0.5em;
  border-radius: 0.75rem;
  margin: 2rem auto;
  max-width: 20rem;
}

.mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
}

.hashtag {
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
  background-color: peru;
}

.flex {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
