import { injectStreamingMessageContext } from '@util/streaming';
import { Schema } from '../../schema';

export const useDataStore = defineStore('status-bar', errorCatched(() => {
  const ctx = injectStreamingMessageContext();
  const data = ref(Schema.parse(
    _.get(getVariables({ type: 'message', message_id: ctx.message_id }), 'stat_data', {}),
    { reportInput: true },
  )) as Ref<z.infer<typeof Schema>>;

  useIntervalFn(() => {
    const stat_data = _.get(
      getVariables({ type: 'message', message_id: ctx.message_id }),
      'stat_data',
      {},
    );
    const r = Schema.safeParse(stat_data);
    if (!r.error && !_.isEqual(data.value, r.data)) {
      data.value = r.data;
    }
  }, 2000);

  return { data };
}));
