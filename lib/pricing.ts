export const PRICING = {
  singleHdDownload: {
    id: "single_hd_download",
    name: "HD Download",
    description: "One high-resolution, watermark-free image download.",
    unitAmountCents: 99,
    displayPrice: "$0.99",
  },
} as const;

export type PricingProductId = keyof typeof PRICING;
