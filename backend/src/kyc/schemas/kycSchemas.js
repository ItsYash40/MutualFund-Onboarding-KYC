import { z } from "zod";

export const submitKycSchema = z.object({
  name: z.string().trim().min(2).max(100),
  panNumber: z.string().trim().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/i),
  aadhaarNumber: z.string().trim().regex(/^\d{12}$/)
});

export const reviewKycSchema = z.object({
  remarks: z.string().trim().max(500).optional()
});

export const buyStockSchema = z.object({
  symbol: z.string().trim().min(1).max(12),
  name: z.string().trim().min(1).max(80),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().positive(),
  assetType: z.enum(["stock", "mutual_fund"]).optional(),
  amcAccount: z
    .object({
      bankName: z.string().trim().min(1).max(80),
      accountNumber: z.string().trim().min(6).max(24),
      ifsc: z.string().trim().min(4).max(16),
      accountHolder: z.string().trim().min(1).max(100),
      upiId: z.string().trim().max(80).optional()
    })
    .optional(),
  metadata: z.record(z.any()).optional()
});

export const createSipSchema = z.object({
  symbol: z.string().trim().min(1).max(12),
  name: z.string().trim().min(1).max(80),
  nav: z.coerce.number().positive(),
  monthlyAmount: z.coerce.number().min(100),
  sipDate: z.coerce.number().int().min(1).max(28),
  amcAccount: z
    .object({
      bankName: z.string().trim().min(1).max(80),
      accountNumber: z.string().trim().min(6).max(24),
      ifsc: z.string().trim().min(4).max(16),
      accountHolder: z.string().trim().min(1).max(100),
      upiId: z.string().trim().max(80).optional()
    })
    .optional(),
  metadata: z.record(z.any()).optional()
});
