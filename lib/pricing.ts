export const PRICING = {
  singleHdDownload: {
    id: "single_hd_download",
    name: "HD Download",
    description: "One high-resolution, watermark-free image download.",
    unitAmountCents: 299,
    displayPrice: "$2.99",
  },
  threePack: {
    id: "three_pack",
    name: "3-Download Pack",
    description: "Planned pack for three HD downloads or variants.",
    unitAmountCents: 499,
    displayPrice: "$4.99",
    status: "planned",
  },
} as const;

export type PricingProductId = keyof typeof PRICING;
