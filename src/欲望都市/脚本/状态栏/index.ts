import { mountStreamingMessages } from '@util/streaming';
import App from './App.vue';
import './global.css';

$(() => {
  mountStreamingMessages(
    () => createApp(App).use(createPinia()),
    {
      host: 'iframe',
      filter: (_message_id, message) => message.includes('<StatusPlaceHolderImpl/>'),
    },
  );
});
