<template>
  <div class="message-wrapper">
    <div class="message-body" v-html="clean_message"></div>
    <div class="status-panel">
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
import { injectStreamingMessageContext } from '@util/streaming';
import { useDataStore } from './store';
import WorldSection from './components/WorldSection.vue';
import ProtagonistPanel from './components/ProtagonistPanel.vue';
import CharacterPanel from './components/CharacterPanel.vue';
import TabNav from './components/TabNav.vue';

const ctx = injectStreamingMessageContext();
const store = useDataStore();

const clean_message = computed(() => {
  return ctx.message
    .replace('<StatusPlaceHolderImpl/>', '')
    .replace(/\n\n$/, '');
});

const char_names = computed(() => Object.keys(store.data.女性角色));
const tabs = computed(() => char_names.value.map(n => ({ id: n, label: n })));
const active_tab = useLocalStorage<string | null>(
  `status_bar:${ctx.message_id}:active_tab`,
  tabs.value[0]?.id ?? null,
);

watch(tabs, (list) => {
  if (list.length > 0 && !list.find(t => t.id === active_tab.value)) {
    active_tab.value = list[0].id;
  }
});
</script>

<style lang="scss" scoped>
.message-wrapper {
  font-family: var(--font-display);
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text);
  width: 100%;
}

.message-body {
  margin-bottom: 12px;
  color: var(--c-text);
}

.status-panel {
  width: 100%;
  max-width: 720px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
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
