<template>
  <div class="cp">
    <!-- basics -->
    <div class="row">
      <span class="kv" v-if="c.当前位置"><span class="k">位置</span><span class="v">{{ c.当前位置 }}</span></span>
      <span class="kv" v-if="c.冒险者等级"><span class="k">等级</span><span class="v">{{ c.冒险者等级 }}</span></span>
      <span class="kv" v-if="c.金钱 != null"><span class="k">金钱</span><span class="v gold">{{ c.金钱 }} G</span></span>
    </div>
    <!-- magazine -->
    <div class="extra" v-if="c.当期销售量 != null">
      <span class="kv"><span class="k">主题</span><span class="v">{{ c.当期主题 ?? '—' }}</span></span>
      <span class="kv"><span class="k">销量</span><span class="v gold">{{ c.当期销售量 }} 册</span></span>
    </div>
    <!-- bars -->
    <div class="sub-head">状态</div>
    <span class="kv"><span class="k">疲惫度</span></span>
    <div class="bar"><div class="bar-trk"><div class="bar-f" :style="{ width: (c.疲惫度 ?? 0) + '%', background: fatigueColor }"></div></div><span class="bar-n" :style="{ color: fatigueColor }">{{ c.疲惫度 ?? 0 }}</span></div>
    <span class="kv"><span class="k">妊娠概率</span></span>
    <div class="bar"><div class="bar-trk"><div class="bar-f" :style="{ width: (c.妊娠概率 ?? 0) + '%', background: pregColor }"></div></div><span class="bar-n" :style="{ color: pregColor }">{{ c.妊娠概率 ?? 0 }}%</span></div>
    <span class="kv"><span class="k">残余精液</span><span class="v">{{ c.残余精液量 ?? 0 }} ml</span></span>

    <!-- sex experience -->
    <div class="sub-head">性经验</div>
    <div class="exp-grid">
      <div v-for="(val, key) in c.性经验" :key="key" class="exp-i"><span class="exp-l">{{ exLabel(key) }}</span><span class="exp-c">{{ val }}</span></div>
    </div>

    <!-- clothing -->
    <div class="sub-head">上衣（含内衣）</div><p class="detail">{{ c.上衣加内衣 }}</p>
    <div class="sub-head">下衣（含内裤）</div><p class="detail">{{ c.下衣加内裤 }}</p>
    <div class="sub-head">配饰</div><p class="detail">{{ c.配饰 }}</p>
    <div class="sub-head">装备</div><p class="detail">{{ c.装备 }}</p>
  </div>
</template>
<script setup lang="ts">
import { useDataStore } from '../store';

const props = defineProps<{ characterName: string }>();
const store = useDataStore();
const c = computed(() => store.data.女性角色[props.characterName] ?? {});

const LABELS: Record<string, string> = {
  '阴道性交': '阴道', '口交': '口交', '肛交': '肛交', '手交': '手交',
  '乳交': '乳交', '足交': '足交', '自慰': '自慰', '多人': '多人',
  '与user的性爱次数': '与user性爱', 'user中出次数': 'user中出',
  '与他人含魔物的性爱次数': '与他人性爱', '他人中出次数': '他人中出',
};
function exLabel(k: string) { return LABELS[k] ?? k; }

const fatigueColor = computed(() => { const v = c.value.疲惫度 ?? 0; return v > 80 ? 'var(--c-danger)' : v > 50 ? 'var(--c-warning)' : 'var(--c-bar-low)'; });
const pregColor = computed(() => { const v = c.value.妊娠概率 ?? 0; return v > 60 ? 'var(--c-danger)' : v > 30 ? 'var(--c-warning)' : 'var(--c-bar-low)'; });
</script>
<style lang="scss" scoped>
.cp { display: flex; flex-direction: column; gap: 10px; }
.row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin: 2px 0; }
.kv { display: inline-flex; align-items: baseline; gap: 6px; margin-right: 12px; }
.k { font-size: 11px; color: var(--c-text-dim); min-width: 36px; }
.v { font-size: 12px; color: var(--c-text-bright); &.gold { color: var(--c-primary); font-weight: 600; } }
.extra { display: flex; gap: 16px; flex-wrap: wrap; padding: 6px 10px; background: rgba(212,160,80,0.06); border-radius: 6px; border: 1px solid rgba(212,160,80,0.12); }
.sub-head { font-size: 11px; font-weight: 600; color: var(--c-primary-dim); text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid var(--c-border); padding-bottom: 2px; margin-top: 4px; }
.bar { display: flex; align-items: center; gap: 8px; margin: 2px 0; }
.bar-trk { flex: 1; height: 8px; background: var(--c-bar-bg); border-radius: 4px; overflow: hidden; }
.bar-f { height: 100%; border-radius: 4px; transition: width 0.5s; min-width: 0; }
.bar-n { font-size: 12px; font-weight: 600; min-width: 30px; text-align: right; font-variant-numeric: tabular-nums; }
.exp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 2px 6px; }
.exp-i { display: flex; justify-content: space-between; padding: 2px 6px; background: var(--c-card); border-radius: 3px; }
.exp-l { font-size: 11px; color: var(--c-text-dim); }
.exp-c { font-size: 12px; color: var(--c-stat-number); font-weight: 600; font-variant-numeric: tabular-nums; }
.detail { font-size: 11px; color: var(--c-text-dim); line-height: 1.6; word-break: break-all; }
</style>
