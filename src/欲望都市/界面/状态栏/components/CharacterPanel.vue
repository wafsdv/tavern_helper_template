<template>
  <div class="character-panel">
    <!-- Basic info row -->
    <div class="char-basics">
      <div class="basic-item" v-if="char_data.当前位置">
        <span class="basic-label">位置</span>
        <span class="basic-value">{{ char_data.当前位置 }}</span>
      </div>
      <div class="basic-item" v-if="char_data.冒险者等级">
        <span class="basic-label">等级</span>
        <span class="basic-value">{{ char_data.冒险者等级 }}</span>
      </div>
      <div class="basic-item" v-if="char_data.金钱 != null">
        <span class="basic-label">金钱</span>
        <span class="basic-value gold">{{ char_data.金钱 }} G</span>
      </div>
    </div>

    <!-- Debut sale info for 伊莎贝拉 -->
    <div v-if="char_data.当期销售量 != null" class="extra-info">
      <div class="extra-item">
        <span class="extra-label">当期主题</span>
        <span class="extra-value">{{ char_data.当期主题 ?? '—' }}</span>
      </div>
      <div class="extra-item">
        <span class="extra-label">当期销量</span>
        <span class="extra-value gold">{{ char_data.当期销售量 }} 册</span>
      </div>
    </div>

    <!-- Status bars -->
    <div class="bars-section">
      <div class="bar-row">
        <span class="bar-label">疲惫度</span>
        <div class="bar-track">
          <div
            class="bar-fill"
            :style="{ width: char_data.疲惫度 + '%', background: fatigueColor }"
          ></div>
        </div>
        <span class="bar-num" :style="{ color: fatigueColor }">{{ char_data.疲惫度 }}</span>
      </div>
      <div class="bar-row">
        <span class="bar-label">妊娠概率</span>
        <div class="bar-track">
          <div
            class="bar-fill"
            :style="{ width: char_data.妊娠概率 + '%', background: pregnancyColor }"
          ></div>
        </div>
        <span class="bar-num" :style="{ color: pregnancyColor }">{{ char_data.妊娠概率 }}%</span>
      </div>
      <div class="residue-row">
        <span class="bar-label">残余精液量</span>
        <span class="residue-value">{{ char_data.残余精液量 }}</span>
      </div>
    </div>

    <!-- Sexual experience grid -->
    <div class="section-subhead">性经验</div>
    <div class="exp-grid">
      <div
        v-for="(count, key) in char_data.性经验"
        :key="key"
        class="exp-item"
      >
        <span class="exp-label">{{ expLabels[key] ?? key }}</span>
        <span class="exp-count">{{ count }}</span>
      </div>
    </div>

    <!-- Attire & Equipment -->
    <div class="section-subhead">着装</div>
    <p class="detail-text">{{ char_data.着装 }}</p>

    <div class="section-subhead">装备</div>
    <p class="detail-text">{{ char_data.装备 }}</p>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const props = defineProps<{
  characterName: string;
}>();

const store = useDataStore();

const char_data = computed(() => {
  return store.data.女性角色[props.characterName] ?? {};
});

const expLabels: Record<string, string> = {
  阴道性交: '阴道',
  口交: '口交',
  肛交: '肛交',
  手交: '手交',
  乳交: '乳交',
  足交: '足交',
  自慰: '自慰',
  多人: '多人',
};

const fatigueColor = computed(() => {
  const v = char_data.value.疲惫度 ?? 0;
  if (v > 80) return 'var(--c-danger)';
  if (v > 50) return 'var(--c-warning)';
  return 'var(--c-bar-low)';
});

const pregnancyColor = computed(() => {
  const v = char_data.value.妊娠概率 ?? 0;
  if (v > 60) return 'var(--c-danger)';
  if (v > 30) return 'var(--c-warning)';
  return 'var(--c-bar-low)';
});
</script>

<style lang="scss" scoped>
.character-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.char-basics {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.basic-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.basic-label {
  font-size: 11px;
  color: var(--c-text-dim);
}

.basic-value {
  font-size: 12px;
  color: var(--c-text-bright);
  font-weight: 500;
}

.basic-value.gold {
  color: var(--c-primary);
}

/* Extra info (伊莎贝ラ magazine) */
.extra-info {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 6px 10px;
  background: rgba(212, 160, 80, 0.06);
  border-radius: 6px;
  border: 1px solid rgba(212, 160, 80, 0.12);
}

.extra-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.extra-label {
  font-size: 11px;
  color: var(--c-text-dim);
}

.extra-value {
  font-size: 12px;
  color: var(--c-text-bright);
}

.extra-value.gold {
  color: var(--c-primary);
}

/* Status bars */
.bars-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.residue-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar-label {
  font-size: 11px;
  color: var(--c-text-dim);
  min-width: 56px;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 8px;
  background: var(--c-bar-bg);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease, background 0.5s ease;
  min-width: 0;
}

.bar-num {
  font-size: 12px;
  font-weight: 600;
  min-width: 28px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.residue-value {
  font-size: 12px;
  color: var(--c-text-bright);
}

/* Exp grid */
.section-subhead {
  font-size: 11px;
  font-weight: 600;
  color: var(--c-primary-dim);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 2px;
}

.exp-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px 8px;
}

.exp-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 6px;
  background: var(--c-card);
  border-radius: 4px;
}

.exp-label {
  font-size: 11px;
  color: var(--c-text-dim);
}

.exp-count {
  font-size: 12px;
  color: var(--c-stat-number);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.detail-text {
  font-size: 11px;
  color: var(--c-text-dim);
  line-height: 1.6;
  word-break: break-all;
}
</style>
