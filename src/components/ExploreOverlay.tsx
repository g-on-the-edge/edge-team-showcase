export default function ExploreOverlay() {
  return (
    <section className="relative z-10 min-h-screen w-full">
      <div className="sticky top-0 h-screen w-full">
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.45] via-black/[0.2] to-black/[0.65] backdrop-blur-[35px]" />
          <div className="relative w-full px-6 text-center text-white">
            <p className="text-xs uppercase tracking-[0.5em] text-teal-200 mb-4">
              Edge Ventures
            </p>
            <h3 className="text-4xl md:text-5xl font-semibold mb-3">
              Let&apos;s explore the Edge work
            </h3>
            <p className="text-lg text-white/80">
              Scroll to see our products in action and the teams powering them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
