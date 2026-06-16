import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
  // Wait until latest message has stat_data (MVU may parse asynchronously)
  await waitUntil(() => _.has(getVariables({ type: 'message', message_id: -1 }), 'stat_data'), { timeout: 30000, intervalBetweenAttempts: 500 });
  createApp(App).use(createPinia()).mount('#app');
});
