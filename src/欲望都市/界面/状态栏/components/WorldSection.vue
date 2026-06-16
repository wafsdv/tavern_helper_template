<template>
  <div class="section">
    <div class="sec-head">🌍 世界</div>
    <div class="row">
      <span class="kv"><span class="k">日期</span><span class="v">{{ store.data.世界.日期 }}</span></span>
      <span class="kv"><span class="k">时段</span><span class="v">{{ store.data.世界.时间段 }}</span></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>
<style lang="scss" scoped>
.section { padding: 10px 14px; background: var(--c-card); border-bottom: 1px solid var(--c-border); }
.sec-head { font-size: 12px; font-weight: 600; color: var(--c-primary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em; }
.row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin: 2px 0; }
.kv { display: inline-flex; align-items: baseline; gap: 6px; margin-right: 12px; }
.k { font-size: 11px; color: var(--c-text-dim); min-width: 36px; }
.v { font-size: 12px; color: var(--c-text-bright); }
</style>
