export type Product = {
  id: string;
  name: string;
  priceLabel: string;
  priceValue: number;
  image: string;
  images: string[];
  description: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Edifier W800BT Pro",
    priceLabel: "Rp 600.000",
    priceValue: 600000,
    image: "/assets/Edifier-W800BT-Pro-2-1.png",
    images: ["/assets/Edifier-W800BT-Pro-2-1.png", "/assets/headphone.png"],
    description:
      "Comfortable wireless headphones with punchy bass, soft cushions, and long battery life for daily listening.",
    category: "audio",
  },
  {
    id: "2",
    name: "Wooting 60 HE V2",
    priceLabel: "Rp 4.200.000",
    priceValue: 4200000,
    image: "/assets/wooting.webp",
    images: ["/assets/wooting.webp", "/assets/keyboard.webp"],
    description:
      "Compact analog keyboard with rapid trigger response and smooth switches for competitive play.",
    category: "keyboard",
  },
  {
    id: "3",
    name: "Logitech PRO X2 SUPERSTRIKE",
    priceLabel: "Rp 5.000.000",
    priceValue: 5000000,
    image: "/assets/mouse.webp",
    images: ["/assets/mouse.webp"],
    description:
      "Ultra-light wireless mouse tuned for esports precision, fast clicks, and long play sessions.",
    category: "mouse",
  },
  {
    id: "4",
    name: "ADATA LEGEND 900 1TB",
    priceLabel: "Rp 2.499.000",
    priceValue: 2499000,
    image: "/assets/adata.png",
    images: ["/assets/adata.png"],
    description:
      "High-speed NVMe SSD built for fast boot times, quick file transfers, and reliable performance.",
    category: "storage",
  },
  {
    id: "5",
    name: "Canon EOS 90D",
    priceLabel: "Rp 18.000.000",
    priceValue: 18000000,
    image: "/assets/camera.png",
    images: ["/assets/camera.png"],
    description:
      "Versatile DSLR with sharp 4K video and fast autofocus, ready for creators and enthusiasts.",
    category: "camera",
  },
  {
    id: "6",
    name: "iPhone 17 Pro Max",
    priceLabel: "Rp 24.999.000",
    priceValue: 24999000,
    image: "/assets/ip17pm.png",
    images: ["/assets/ip17pm.png"],
    description:
      "Flagship smartphone with a vivid display, pro camera system, and all-day battery life.",
    category: "smartphone",
  },
  {
    id: "7",
    name: "RK84 Mechanical Keyboard",
    priceLabel: "Rp 700.000",
    priceValue: 700000,
    image: "/assets/keyboard.webp",
    images: ["/assets/keyboard.webp", "/assets/wooting.webp"],
    description:
      "Wireless 75% keyboard with hot-swappable switches and a sturdy, compact layout.",
    category: "keyboard",
  },
  {
    id: "8",
    name: "Sony WH-1000XM5",
    priceLabel: "Rp 4.500.000",
    priceValue: 4500000,
    image: "/assets/headphone.png",
    images: ["/assets/headphone.png", "/assets/Edifier-W800BT-Pro-2-1.png"],
    description:
      "Premium noise-cancelling headphones with rich sound, clear calls, and lightweight comfort.",
    category: "audio",
  },
  {
    id: "9",
    name: "Keychron K2 V2",
    priceLabel: "Rp 1.350.000",
    priceValue: 1350000,
    image: "/assets/keyboard.webp",
    images: ["/assets/keyboard.webp", "/assets/wooting.webp"],
    description:
      "Versatile wireless keyboard with a compact profile and tactile typing feel.",
    category: "keyboard",
  },
  {
    id: "10",
    name: "Logitech G Pro X Superlight",
    priceLabel: "Rp 1.699.000",
    priceValue: 1699000,
    image: "/assets/mouse.webp",
    images: ["/assets/mouse.webp"],
    description:
      "Featherweight esports mouse with smooth glide and precise sensor tracking.",
    category: "mouse",
  },
  {
    id: "11",
    name: "ADATA XPG S70 2TB",
    priceLabel: "Rp 5.000.000",
    priceValue: 5000000,
    image: "/assets/adata.png",
    images: ["/assets/adata.png"],
    description:
      "High-capacity NVMe storage designed for creators, gamers, and heavy workloads.",
    category: "storage",
  },
  {
    id: "12",
    name: "Canon RF 50mm f/1.8 STM",
    priceLabel: "Rp 7.299.000",
    priceValue: 7299000,
    image: "/assets/camera.png",
    images: ["/assets/camera.png"],
    description:
      "Compact prime lens with bright aperture for sharp portraits and smooth bokeh.",
    category: "camera",
  },
];
