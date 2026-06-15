<template>
  <div class="world-section">
    <div class="section-header">🌍 世界</div>
    <div class="world-grid">
      <div class="world-item">
        <span class="world-label">日期</span>
        <span class="world-value">{{ store.data.世界.日期 }}</span>
      </div>
      <div class="world-item">
        <span class="world-label">时段</span>
        <span class="world-value">{{ store.data.世界.时间段 }}</span>
      </div>
      <div class="world-item wide">
        <span class="world-label">位置</span>
        <span class="world-value">{{ store.data.世界.当前位置 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>

<style lang="scss" scoped>
.world-section {
  padding: 10px 14px;
  background: var(--c-card);
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
.world-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
}
.world-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.world-item.wide {
  grid-column: 1 / -1;
}
.world-label {
  font-size: 11px;
  color: var(--c-text-dim);
  min-width: 32px;
  flex-shrink: 0;
}
.world-value {
  font-size: 12px;
  color: var(--c-text-bright);
}
</style>
