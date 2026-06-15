export const Schema = z.object({
  世界: z.object({
    日期: z.string().prefault('待初始化'),
    时间段: z.string().prefault('待初始化'),
    当前位置: z.string().prefault('炼金工房'),
  }).prefault({}),
  主角: z.object({
    金钱: z.coerce.number().prefault(500),
    冒险者等级: z.string().prefault('E级'),
    着装: z.string().prefault('炼金工作袍'),
    装备: z.string().prefault('无'),
  }).prefault({}),
  女性角色: z.record(z.string().describe('女性角色名'), z.object({
    当前位置: z.string().optional(),
    冒险者等级: z.string().optional(),
    金钱: z.coerce.number().optional(),
    性经验: z.object({
      阴道性交: z.coerce.number().prefault(0),
      口交: z.coerce.number().prefault(0),
      肛交: z.coerce.number().prefault(0),
      手交: z.coerce.number().prefault(0),
      乳交: z.coerce.number().prefault(0),
      足交: z.coerce.number().prefault(0),
      自慰: z.coerce.number().prefault(0),
      多人: z.coerce.number().prefault(0),
    }).prefault({}),
    残余精液量: z.string().prefault('无'),
    妊娠概率: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    疲惫度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    当期销售量: z.coerce.number().optional(),
    当期主题: z.string().optional(),
    着装: z.string().prefault('待初始化'),
    装备: z.string().prefault('无'),
  }).prefault({})).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;
