import { z } from 'zod';

const TransactionDataItemSchema = z.object({
  year: z.number(),
  value: z.number(),
});

const TransactionResultSchema = z.object({
  prefectureCode: z.coerce.string(),
  prefectureName: z.string(),
  type: z.coerce.string(),
  years: z.array(TransactionDataItemSchema),
});

const TransactionJsonItemSchema = z.object({
  year: z.number(),
  prefectureCode: z.coerce.string(),
  type: z.coerce.string(),
  data: z.object({
    result: TransactionResultSchema,
  }),
});

export const TransactionJsonSchema = z.array(TransactionJsonItemSchema);

// スキーマから型を推論
export type TransactionJson = z.infer<typeof TransactionJsonSchema>;
