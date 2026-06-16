import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

function getMid(): number {
  // 1) parent script injected __MVU_MID__ before doc.write
  const w = window as any;
  if (typeof w.__MVU_MID__ === 'number') return w.__MVU_MID__;
  // 2) native frontend context
  try { return getCurrentMessageId(); } catch (_) {}
  // 3) fallback
  return -1;
}

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getMid() });
