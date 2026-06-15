<template>
  <div class="status-panel">
    <WorldSection />
    <ProtagonistPanel />
    <TabNav v-model="active_tab" :tabs="tabs" />
    <div v-if="active_tab" class="content-area">
      <CharacterPanel :character-name="active_tab" />
    </div>
    <div v-else class="content-area empty-hint">
      选择一个角色查看详情
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

const character_names = computed(() => {
  return Object.keys(store.data.女性角色);
});

const tabs = computed(() => {
  return character_names.value.map(name => ({ id: name, label: name }));
});

const active_tab = useLocalStorage<string | null>(
  `status_bar:${getCurrentMessageId()}:active_tab`,
  tabs.value[0]?.id ?? null,
);

watch(tabs, (new_tabs) => {
  if (new_tabs.length > 0 && !new_tabs.find(t => t.id === active_tab.value)) {
    active_tab.value = new_tabs[0].id;
  }
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
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
}

.content-area {
  padding: 10px 14px;
  min-height: 40px;
}

.empty-hint {
  color: var(--c-text-dim);
  text-align: center;
  padding: 20px;
  font-size: 12px;
}
</style>
