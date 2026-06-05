export default function HeroBanner() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 mt-5">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#e8e7e4] shadow-sm">
        <img
          src="./assets/headphone.png"
          alt="Headphones"
          className="pointer-events-none absolute -left-4  hidden w-40 -rotate-6 select-none drop-shadow sm:block"
          loading="lazy"
        />
        <img
          src="./assets/keyboard.webp"
          alt="Mechanical keyboard"
          className="pointer-events-none absolute left-14 bottom-2 hidden w-36 -rotate-12 select-none drop-shadow sm:block"
          loading="lazy"
        />
        <img
          src="./assets/camera.png"
          alt="DSLR camera"
          className="pointer-events-none absolute right-16 top-3 hidden w-36 rotate-6 select-none drop-shadow sm:block"
          loading="lazy"
        />
        <img
          src="/assets/ip17pm.png"
          alt="Smartphone"
          className="pointer-events-none absolute right-6 top-12 hidden w-20  select-none drop-shadow sm:block"
          loading="lazy"
        />

        <div className="relative flex items-center justify-center px-6 py-8 sm:px-12 sm:py-10">
          <div className="max-w-xl text-center">
            <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl lg:text-3xl">
              <span className="font-bold">REVOSHOP</span> - Premium Tech Gear.
            </h1>
            <p className="mt-1 text-base font-medium text-neutral-900 sm:text-lg">
              Elevated Experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
