import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

interface TeamGridProps {
  teamMembers: TeamMember[];
}

const TeamGrid = ({ teamMembers }: TeamGridProps) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile & Tablet: Stack vertically */}
      <div className="lg:hidden flex flex-col gap-3 sm:gap-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 ${
              index === 0 ? 'aspect-[3/4] sm:aspect-[4/3]' : 'aspect-[4/3]'
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/10" />
            
            {/* Social Icons - appear on hover */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Linkedin size={16} className="sm:w-5 sm:h-5 text-white" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Twitter size={16} className="sm:w-5 sm:h-5 text-white" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Instagram size={16} className="sm:w-5 sm:h-5 text-white" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Mail size={16} className="sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white transition-all duration-500 group-hover:bottom-5 sm:group-hover:bottom-7">
              <h3 className={`font-bold mb-1 transition-all duration-500 group-hover:text-white/90 ${
                index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}>
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 transition-all duration-500 group-hover:text-gray-200">{member.title}</p>
            </div>
            {/* Hover border effect */}
            <div className="absolute inset-0 border-2 border-white/0 rounded-2xl sm:rounded-3xl transition-all duration-500 group-hover:border-white/20" />
          </div>
        ))}
      </div>

      {/* Desktop: Advanced grid layout */}
      <div className="hidden lg:grid grid-cols-10 gap-4 h-[600px] xl:h-[700px]">
        {/* Large card - Amanda Reed - Takes 4 columns and 2 rows */}
        <div className="col-span-4 row-span-2 relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-white/10">
          <img
            src={teamMembers[0].image}
            alt={teamMembers[0].name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/10" />
          
          {/* Social Icons - appear on hover */}
          <div className="absolute top-6 right-6 flex gap-3 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Linkedin size={20} className="text-white" />
            </button>
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Twitter size={20} className="text-white" />
            </button>
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Instagram size={20} className="text-white" />
            </button>
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Mail size={20} className="text-white" />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-6 text-white transition-all duration-500 group-hover:bottom-8">
            <h3 className="text-3xl lg:text-4xl font-bold mb-2 transition-all duration-500 group-hover:text-white/90">{teamMembers[0].name}</h3>
            <p className="text-base lg:text-lg text-gray-300 transition-all duration-500 group-hover:text-gray-200">{teamMembers[0].title}</p>
          </div>
          {/* Hover border effect */}
          <div className="absolute inset-0 border-2 border-white/0 rounded-3xl transition-all duration-500 group-hover:border-white/20" />
        </div>

        {/* Top row - 3 medium cards */}
        {teamMembers.slice(1, 4).map((member, index) => (
          <div
            key={`top-${index}`}
            className="col-span-2 relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-white/10"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/10" />
            
            {/* Social Icons - appear on hover */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Linkedin size={16} className="text-white" />
              </button>
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Twitter size={16} className="text-white" />
              </button>
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Instagram size={16} className="text-white" />
              </button>
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Mail size={16} className="text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 text-white transition-all duration-500 group-hover:bottom-5">
              <h3 className="text-xl lg:text-2xl font-bold mb-1 transition-all duration-500 group-hover:text-white/90">{member.name}</h3>
              <p className="text-sm lg:text-base text-gray-300 transition-all duration-500 group-hover:text-gray-200">{member.title}</p>
            </div>
            {/* Hover border effect */}
            <div className="absolute inset-0 border-2 border-white/0 rounded-3xl transition-all duration-500 group-hover:border-white/20" />
          </div>
        ))}

        {/* Bottom row - 3 medium cards */}
        {teamMembers.slice(4, 7).map((member, index) => (
          <div
            key={`bottom-${index}`}
            className="col-span-2 relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-white/10"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/10" />
            
            {/* Social Icons - appear on hover */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Linkedin size={16} className="text-white" />
              </button>
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Twitter size={16} className="text-white" />
              </button>
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Instagram size={16} className="text-white" />
              </button>
              <button className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <Mail size={16} className="text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 text-white transition-all duration-500 group-hover:bottom-5">
              <h3 className="text-xl lg:text-2xl font-bold mb-1 transition-all duration-500 group-hover:text-white/90">{member.name}</h3>
              <p className="text-sm lg:text-base text-gray-300 transition-all duration-500 group-hover:text-gray-200">{member.title}</p>
            </div>
            {/* Hover border effect */}
            <div className="absolute inset-0 border-2 border-white/0 rounded-3xl transition-all duration-500 group-hover:border-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
