import Image from "next/image";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CategoryCarousel from "../components/CategoryCarousel";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <CategoryCarousel />
      <ProductGrid />
    </>
  );
}
