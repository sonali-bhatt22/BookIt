import { Request, Response } from "express";
const promoCodes: Record<string, number> = {
  SAVE10: 0.1,   // 10% off
  SAVE50: 0.5,   // ₹100 off
  FLAT100: 100
};


export const validatePromo = (req: Request, res: Response) => {
  const { code, price } = req.body as {code: string, price: number};
  if (!promoCodes[code]) return res.status(400).json({ message: "Invalid code" });

  const discount = promoCodes[code];
  const finalPrice = discount < 1 ? price * (1 - discount) : price - discount;
  res.json({ 
    valid: true, 
    originalPrice: price,
    discountApplied: discount < 1 ? `${discount * 100}% `: `₹${discount}`,
    finalPrice });
};
