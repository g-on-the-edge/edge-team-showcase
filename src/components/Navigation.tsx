interface NavigationProps {
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

export default function Navigation({ currentSection, setCurrentSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 border-b border-white/10 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-white">
        <div className="flex items-center flex-shrink-0">
          <img 
            src="/logos/Gundersen_Edge_RGB_White.png" 
            alt="Edge" 
            className="h-8 md:h-12 w-auto"
          />
        </div>
        
        <div className="flex gap-3 md:gap-6 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase">
          {[
            { label: 'Home', id: 0, href: '#section-0' },
            { label: 'Engage', id: 1, href: '#section-1' },
            { label: 'Launch', id: 2, href: '#section-2' },
            { label: 'Ventures', id: 3, href: '#section-3' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setCurrentSection(item.id)}
              className={`transition-colors whitespace-nowrap ${
                currentSection === item.id 
                  ? 'text-teal-300 font-semibold' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
