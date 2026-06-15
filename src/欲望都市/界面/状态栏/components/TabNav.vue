<template>
  <nav class="tabs">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      class="tab-button"
      :class="{ active: model === tab.id }"
      :aria-expanded="model === tab.id"
      @click="toggleTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: { id: string; label: string }[];
}>();

const model = defineModel<string | null>({ required: true });

function toggleTab(id: string) {
  model.value = model.value === id ? null : id;
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
}

.tab-button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--c-text-dim);
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-display);
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  color: var(--c-text);
  background: rgba(212, 160, 80, 0.06);
}

.tab-button.active {
  color: var(--c-primary);
  border-bottom-color: var(--c-primary);
  background: rgba(212, 160, 80, 0.08);
}
</style>
