import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

// Use 'latest' — defineMvuDataStore converts it to message_id: -1,
// which reads the most recent message that has MVU stat_data.
// This is the most reliable approach when loaded via $('body').load(),
// where getCurrentMessageId() may not return a meaningful value.
export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: 'latest' });
