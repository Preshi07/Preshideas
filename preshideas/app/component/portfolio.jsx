import { useState, useEffect } from 'react';

export default function PortfolioSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Presh-Ideas Everywhere",
      description: "Sometimes, just going to press with a story or hook isn't enough to drive demand at scale, and coupling it with social, creators, and paid can turn a media moment into a viral conversation. Our Presh-Ideas Everywhere approach can be reactive or proactive in driving product and service growth through organic and paid storytelling by combining PR and social activities to drive category domination, rankings, traffic and revenue.",
      phone: "tiktok"
    },
    {
      title: "Presh-Ideas Live",
      description: "We help brands capture real-time moments and turn them into lasting impact through rapid response strategies and live activation.",
      phone: "bbc"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <p className="text-sm text-gray-600">
              Products that competitors try to copy
            </p>

            <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
              Being proactive<br />and reactive wins
            </h1>

            <div className="border-t border-gray-300 pt-6">
              <p className="text-sm text-gray-600 mb-6">
                What you should hear...
              </p>

              <div className="space-y-6">
                <button 
                  onClick={() => setCurrentSlide(1)}
                  className={`block text-left transition-colors ${currentSlide === 1 ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  Presh-Ideas Live
                </button>

                <div>
                  <button 
                    onClick={() => setCurrentSlide(0)}
                    className={`block text-left mb-4 transition-colors ${currentSlide === 0 ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    Presh-Ideas Everywhere
                  </button>
                  
                  <div className={`transition-opacity duration-500 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {slides[0].description}
                    </p>
                  </div>

                  <div className={`transition-opacity duration-500 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {slides[1].description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-300 mt-8 pt-6">
                <p className="text-sm text-gray-900 mb-6">Campaigns</p>
              </div>
            </div>

            <button className="inline-flex items-center text-sm text-gray-900 hover:text-gray-600 transition-colors">
              Take A Look At Our Work <span className="ml-2">→</span>
            </button>
          </div>

          {/* Right - Phone Images */}
          <div className="relative flex justify-center items-center h-[600px]">
            {/* TikTok Phone */}
            <div 
              className={`absolute transition-all duration-700 ${
                currentSlide === 0 
                  ? 'opacity-100 translate-x-0 z-20' 
                  : 'opacity-0 -translate-x-8 z-10'
              }`}
            >
              <div className="relative w-64 h-[550px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
                <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <p className="text-white text-sm font-medium">TikTok</p>
                </div>
              </div>
            </div>

            {/* BBC News Phone */}
            <div 
              className={`absolute transition-all duration-700 ${
                currentSlide === 1 
                  ? 'opacity-100 translate-x-0 z-20' 
                  : 'opacity-0 translate-x-8 z-10'
              }`}
            >
              <div className="relative w-64 h-[550px] bg-red-600 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-black">
                <div className="absolute top-0 left-0 w-full h-full bg-red-600 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white text-4xl font-bold mb-2">BBC</div>
                    <div className="text-white text-2xl font-bold tracking-wider">NEWS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}