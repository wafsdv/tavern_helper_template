<template>
  <div class="status-panel">
    <div class="panel-header" @click="collapsed = !collapsed">
      <span class="panel-title">📊 变量状态</span>
      <span class="panel-arrow" :class="{ open: !collapsed }">▶</span>
    </div>
    <div v-show="!collapsed" class="panel-body">
      <WorldSection />
      <ProtagonistPanel />
      <TabNav v-model="active_tab" :tabs="tabs" />
      <div v-if="active_tab" class="content-area">
        <CharacterPanel :character-name="active_tab" />
      </div>
      <div v-else class="content-area empty-hint">选择角色查看详情</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import WorldSection from './components/WorldSection.vue';
import ProtagonistPanel from './components/ProtagonistPanel.vue';
import CharacterPanel from './components/CharacterPanel.vue';
import TabNav from './components/TabNav.vue';

const store = useDataStore();
const collapsed = useLocalStorage<boolean>('mvu_sb_collapsed', true);

const chars = computed(() => Object.keys(store.data.女性角色));
const tabs = computed(() => chars.value.map(n => ({ id: n, label: n })));
const active_tab = ref(tabs.value[0]?.id ?? null);
watch(tabs, (list) => {
  if (list.length && !list.find(t => t.id === active_tab.value)) active_tab.value = list[0].id;
});
</script>

<style lang="scss" scoped>
.status-panel {
  width: 100%;
  max-width: 720px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: 13px;
  color: var(--c-text);
  line-height: 1.5;
  box-shadow: 0 2px 16px rgba(0,0,0,0.4);
  margin: 0 auto;
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: var(--c-card);
  border-bottom: 1px solid var(--c-border);
  cursor: pointer;
  user-select: none;
  &:hover { background: #222244; }
}
.panel-title { font-weight: 600; color: var(--c-primary); font-size: 13px; }
.panel-arrow { color: var(--c-text-dim); font-size: 11px; transition: transform 0.3s; &.open { transform: rotate(90deg); } }
.panel-body { max-height: 500px; overflow-y: auto; }
.content-area { padding: 10px 14px; min-height: 40px; }
.empty-hint { color: var(--c-text-dim); text-align: center; padding: 20px; font-size: 12px; }
</style>
