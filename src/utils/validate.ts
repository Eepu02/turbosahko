import { z } from "zod";

export const dataSetModel = z.object({
  data: z.array(
    z.object({
      datasetId: z.number(),
      startTime: z.coerce.date(),
      endTime: z.coerce.date(),
      value: z.number(),
    }),
  ),
  pagination: z.object({
    total: z.number(),
    lastPage: z.number(),
    prevPage: z.number().nullable(),
    nextPage: z.number().nullable(),
    perPage: z.number(),
    currentPage: z.number(),
    from: z.number(),
    to: z.number(),
  }),
});
