<template>
  <nav class="tabs">
    <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ act: model === tab.id }" @click="model = model === tab.id ? null : tab.id">{{ tab.label }}</button>
  </nav>
</template>
<script setup lang="ts">
defineProps<{ tabs: { id: string; label: string }[] }>();
const model = defineModel<string | null>({ required: true });
</script>
<style lang="scss" scoped>
.tabs { display: flex; background: var(--c-surface); border-bottom: 1px solid var(--c-border); }
.tab-btn { flex: 1; padding: 6px 10px; border: none; background: transparent; color: var(--c-text-dim); font-size: 13px; font-weight: 500; cursor: pointer; font-family: var(--font-display); border-bottom: 2px solid transparent; transition: all 0.2s;
  &:hover { color: var(--c-text); background: rgba(212,160,80,0.06); }
  &.act { color: var(--c-primary); border-bottom-color: var(--c-primary); background: rgba(212,160,80,0.08); }
}
</style>
