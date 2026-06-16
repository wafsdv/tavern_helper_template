<template>
  <div class="section">
    <div class="sec-head">👤 {{ playerName }}</div>
    <div class="row">
      <span class="kv"><span class="k">位置</span><span class="v">{{ p.当前位置 }}</span></span>
      <span class="kv"><span class="k">等级</span><span class="v">{{ p.冒险者等级 }}</span></span>
      <span class="kv"><span class="k">金钱</span><span class="v gold">{{ p.金钱 }} G</span></span>
    </div>
    <div class="cloth-sec"><div class="sub-head">上衣（含内衣）</div><p class="detail">{{ p.上衣加内衣 }}</p></div>
    <div class="cloth-sec"><div class="sub-head">下衣（含内裤）</div><p class="detail">{{ p.下衣加内裤 }}</p></div>
    <div class="cloth-sec"><div class="sub-head">配饰</div><p class="detail">{{ p.配饰 }}</p></div>
    <div class="cloth-sec"><div class="sub-head">装备</div><p class="detail">{{ p.装备 }}</p></div>
  </div>
</template>
<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
const p = computed(() => store.data.主角);
const playerName = computed(() => SillyTavern.getContext().name2 ?? '主角');
</script>
<style lang="scss" scoped>
.section { padding: 10px 14px; background: var(--c-card-alt); border-bottom: 1px solid var(--c-border); }
.sec-head { font-size: 12px; font-weight: 600; color: var(--c-primary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.08em; }
.row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin: 2px 0; }
.kv { display: inline-flex; align-items: baseline; gap: 6px; margin-right: 12px; }
.k { font-size: 11px; color: var(--c-text-dim); min-width: 36px; }
.v { font-size: 12px; color: var(--c-text-bright); &.gold { color: var(--c-primary); font-weight: 600; } }
.cloth-sec { margin-top: 8px; }
.sub-head { font-size: 11px; font-weight: 600; color: var(--c-primary-dim); text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid var(--c-border); padding-bottom: 2px; margin-bottom: 2px; }
.detail { font-size: 11px; color: var(--c-text-dim); line-height: 1.6; word-break: break-all; }
</style>
