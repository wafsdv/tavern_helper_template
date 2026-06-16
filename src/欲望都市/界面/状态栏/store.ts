import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

function getMid(): number {
  // 1) URL hash from script-injected iframe
  const m = window.location.hash.match(/mid=(-?\d+)/);
  if (m) return Number(m[1]);
  // 2) native frontend context
  try { return getCurrentMessageId(); } catch (_) {}
  // 3) fallback: latest message
  return -1;
}

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getMid() });
