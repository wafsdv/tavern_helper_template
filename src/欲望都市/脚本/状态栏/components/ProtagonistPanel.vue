<template>
  <div class="protagonist-section">
    <div class="section-header">👤 {{ user_name }}</div>
    <div class="protag-grid">
      <div class="protag-item">
        <span class="protag-label">金钱</span>
        <span class="protag-value gold">{{ store.data.主角.金钱 }} G</span>
      </div>
      <div class="protag-item">
        <span class="protag-label">等级</span>
        <span class="protag-value">{{ store.data.主角.冒险者等级 }}</span>
      </div>
      <div class="protag-item wide">
        <span class="protag-label">着装</span>
        <span class="protag-value detail">{{ store.data.主角.着装 }}</span>
      </div>
      <div class="protag-item wide">
        <span class="protag-label">装备</span>
        <span class="protag-value detail">{{ store.data.主角.装备 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
const user_name = computed(() => SillyTavern.getContext().name2 ?? '主角');
</script>

<style lang="scss" scoped>
.protagonist-section {
  padding: 10px 14px;
  background: var(--c-card-alt);
  border-bottom: 1px solid var(--c-border);
}
.section-header {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-primary);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.protag-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
}
.protag-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.protag-item.wide {
  grid-column: 1 / -1;
}
.protag-label {
  font-size: 11px;
  color: var(--c-text-dim);
  min-width: 32px;
  flex-shrink: 0;
}
.protag-value {
  font-size: 12px;
  color: var(--c-text-bright);
}
.protag-value.gold {
  color: var(--c-primary);
  font-weight: 600;
}
.protag-value.detail {
  font-size: 11px;
  color: var(--c-text-dim);
}
</style>
