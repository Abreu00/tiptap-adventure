<template>
  <editor-content :editor="editor" />
</template>

<script lang="ts" setup>
import { useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, watch, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editor = useEditor({
  extensions: [StarterKit],
});

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return;

    // HTML
    const isSame = editor.value.getHTML() === value;
    // JSON
    // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

    if (isSame) {
      return;
    }

    editor.value.commands.setContent(value, false);
  }
);

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    onUpdate: () => {
      if (!editor.value) return;

      // HTML
      emit("update:modelValue", editor.value.getHTML());

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
