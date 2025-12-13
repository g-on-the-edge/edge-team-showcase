interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: string;
  color: string;
  logo?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
      <div className={`h-3 bg-gradient-to-r ${project.color}`} />
      
      <div className="p-8 md:p-12">
        <div className="mb-6">
          {project.logo && (
            <div className="mb-4">
              <img 
                src={`/Gundersen_Edge_RGB-${project.logo.toUpperCase()}_lockup.png`}
                alt={`Edge ${project.logo}`}
                className="h-16 w-auto filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              />
            </div>
          )}
          <span className="inline-block px-4 py-2 bg-white/10 text-white/70 rounded-full text-sm font-medium border border-white/10">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {project.title}
        </h3>
        
        <p className="text-lg text-gray-200 mb-6 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center`}>
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-white/60 font-medium">Impact</p>
            <p className="text-lg font-semibold text-white">{project.impact}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className={`px-6 py-3 bg-gradient-to-r ${project.color} text-white rounded-lg font-medium hover:shadow-lg transition-shadow`}>
            Learn More
          </button>
          <button className="px-6 py-3 border border-white/20 text-white/70 rounded-lg font-medium hover:border-white/40 hover:text-white transition-colors">
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
}
