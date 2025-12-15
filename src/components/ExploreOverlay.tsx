export default function ExploreOverlay() {
  return (
    <section className="relative z-10 min-h-screen w-full">
      <div className="sticky top-0 h-screen w-full">
        <div className="relative flex h-full w-full flex-col items-center justify-between py-20">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.45] via-black/[0.2] to-black/[0.65] backdrop-blur-[35px]" />
          
          {/* Title at top */}
          <div className="relative w-full px-6 text-center text-white z-10 flex-shrink-0">
            <h3 className="text-4xl md:text-5xl font-semibold">
              Explore the Work coming out of Edge.
            </h3>
          </div>
          
          {/* Image at bottom with text on top */}
          <div className="relative w-full flex-grow flex items-end">
            <div className="absolute inset-x-0 bottom-0 h-[70vh] pointer-events-none">
              <div className="relative h-full w-full">
                <img 
                  src="/emplify_health_cover_overlay.png" 
                  alt="" 
                  className="absolute bottom-0 left-0 right-0 w-full h-full object-cover object-bottom"
                />
                {/* Gradient fade from solid at bottom to transparent at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-black/80" />
              </div>
            </div>
            
            {/* Text on top of image */}
            <div className="relative w-full px-6 text-center text-white z-10 pb-8">
              <p className="text-lg md:text-xl text-white/90">
                Scroll to see whats on the other side of possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
