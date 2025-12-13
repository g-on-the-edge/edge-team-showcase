export default function Hero() {
  return (
    <>
      {/* Fixed background that stays in place */}
      <section
        className="fixed inset-0 z-0 flex items-center justify-center min-h-screen overflow-hidden"
        style={{
          backgroundImage: 'url(/EdgeBackground.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="mb-8 inline-flex items-center justify-center">
            <img
              src="/Gundersen_Edge_RGB_White_large_tagline.png"
              alt="GHS Edge - On the Other Side of Possible"
              className="h-64 w-auto max-w-[80vw] scale-[2]"
            />
          </div>
          <div className="mt-28 animate-bounce">
            <svg
              className="w-16 h-16 mx-auto text-white/60"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>
      {/* Spacer to create scroll room before overlay appears */}
      <div className="h-screen" aria-hidden="true" />
    </>
  );
}
