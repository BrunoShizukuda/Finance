import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAirReportSchema = z.object({
    month: z.string().refine(value => isMatch(value, "MM"))
})

export type generateAirReportSchema = z.infer<typeof generateAirReportSchema>