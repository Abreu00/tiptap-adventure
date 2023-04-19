<template>
  <div class="items">
    <template v-if="items.length">
      <button
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
      >
        {{ item }}
      </button>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  items: string[];
  command: ({ id }: { id: string }) => void;
}>();

const selectedIndex = ref<number>(0);

watch(props.items, () => {
  selectedIndex.value = 0;
});

function onKeyDown({ event }) {
  if (event.key === "ArrowUp") {
    upHandler();
    return true;
  }

  if (event.key === "ArrowDown") {
    downHandler();
    return true;
  }

  if (["Enter", "Tab", ' '].includes(event.key)) {
    enterHandler();
    return true;
  }

  return false;
}

function upHandler() {
  selectedIndex.value =
    (selectedIndex.value + props.items.length - 1) % props.items.length;
}

function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
}

function enterHandler() {
  selectItem(selectedIndex.value);
}

function selectItem(index) {
  const item = props.items[index];

  if (item) {
    props.command({ id: item });
  }
}

defineExpose({
  onKeyDown,
});
</script>

<style lang="scss">
.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    border-color: #000;
  }
}
</style>
