import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ExternalLink, 
  Scale, 
  AlertTriangle,
  Building,
  Landmark,
  Compass,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import LeafletGisMap from '../gis/LeafletGisMap.jsx';

const HERO_SLIDES = [
  {
    id: 1,
    src: '/land_acquisition_hero_1787591493962.jpg',
    alt: 'National Infrastructure Expressway & Railway Corridor across Agricultural Land',
    tag: 'National Infrastructure Corridors',
    subtag: 'Dedicated Freight Corridors & Expressways'
  },
  {
    id: 2,
    src: '/corporate_land_hero.jpg',
    alt: 'Corporate & Industrial Growth Corridors',
    tag: 'Industrial Growth Corridors',
    subtag: 'Expressway Interchanges & Logistics Hubs'
  },
  {
    id: 3,
    src: '/land_pooling_hero.jpg',
    alt: 'Agricultural Land Pooling & Cadastral Parcels',
    tag: 'Agricultural Land Pooling Schemes',
    subtag: 'DGPS Surveyed Cadastral Parcels & Solatium'
  }
];

export default function LandingHeroSection({
  onSelectTab,
  onOpenOfficerLogin,
  onSearchLand
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [searchType, setSearchType] = useState('ulpin'); // 'ulpin', 'survey', 'gazette', 'project'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Dynamic background rotation like official government portals (slides leftward every 5.5s)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Sample quick search database
  const sampleRecords = [
    {
      ulpin: 'GJ-BRD-2024-8842-991A',
      surveyNo: '142/A',
      village: 'Vadadla',
      tehsil: 'Bharuch',
      state: 'Gujarat',
      project: 'Western Dedicated Freight Corridor (WDFC) - Phase II',
      stage: 'Sec 23 Collector Award Sealed',
      compensationStatus: '₹42,80,000 Credited via PFMS DBT',
      gazetteNo: 'SEC11-GUJ-VAD-2024-089',
      projectId: 'PRJ-WDFC-2024-GUJ-01'
    },
    {
      ulpin: 'MH-THN-2024-3312-004B',
      surveyNo: '56/1',
      village: 'Diva',
      tehsil: 'Thane',
      state: 'Maharashtra',
      project: 'Mumbai-Ahmedabad High Speed Rail (Bullet Train)',
      stage: 'Sec 19 Declaration of Acquisition',
      compensationStatus: 'Award Computation Under Scrutiny',
      gazetteNo: 'SEC19-MAH-THN-2024-104',
      projectId: 'PRJ-MAHSR-2024-02'
    },
    {
      ulpin: 'UP-GZB-2024-1190-772C',
      surveyNo: '89',
      village: 'Muradnagar',
      tehsil: 'Ghaziabad',
      state: 'Uttar Pradesh',
      project: 'Delhi-Meerut Regional Rapid Transit System (RRTS)',
      stage: 'Sec 38 Possession Taken & Recorded',
      compensationStatus: '100% DBT Disbursed + R&R Grant',
      gazetteNo: 'SEC38-UP-GZB-2023-341',
      projectId: 'PRJ-RRTS-2023-UP-04'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const found = sampleRecords.filter(r => 
      r.ulpin.toLowerCase().includes(q) ||
      r.surveyNo.toLowerCase().includes(q) ||
      r.village.toLowerCase().includes(q) ||
      r.gazetteNo.toLowerCase().includes(q) ||
      r.projectId.toLowerCase().includes(q) ||
      r.project.toLowerCase().includes(q)
    );

    setSearchResults(found.length > 0 ? found : 'not-found');
  };

  const handleApplyPreset = (val, type) => {
    setSearchType(type);
    setSearchQuery(val);
    const found = sampleRecords.filter(r => 
      (type === 'ulpin' && r.ulpin === val) ||
      (type === 'survey' && r.surveyNo === val) ||
      (type === 'gazette' && r.gazetteNo === val)
    );
    setSearchResults(found);
  };

  return (
    <div className="w-full">
      {/* Hero Section with Edge-to-Edge Aerial Background */}
      <section className="relative text-white overflow-hidden bg-[#0a1526]">
      
      {/* Dynamic Movable Sliding Background Carousel (Continuous Leftward Sliding across 3 Slides) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div 
          className="flex h-full w-[300%] transition-transform duration-1000 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${(currentSlideIndex * 100) / HERO_SLIDES.length}%)` }}
        >
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="relative w-1/3 h-full shrink-0">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover object-[center_28%]"
              />
            </div>
          ))}
        </div>
        {/* Subtle Dark Gradient Overlay for High Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1526]/80 via-[#0a1526]/60 to-[#0a1526]/95 pointer-events-none" />
      </div>

      {/* Hero Content Section - Centered directly over background image */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:pt-14 sm:pb-24 flex flex-col items-center text-center">
        
        {/* Ministry Kicker Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#C5A059]/70 text-[#E6CA85] text-xs font-semibold tracking-wide shadow-md backdrop-blur-xs mb-5">
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Ministry of Rural Development • Department of Land Resources</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif max-w-4xl drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] mb-4">
          National Land Acquisition Management<br className="hidden sm:inline" /> Portal
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white font-sans max-w-3xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-7 font-medium">
          Unified digital spatial governance and compensation lifecycle platform under the statutory framework of RFCTLARR Act, 2013. Integrated with DGPS Cadastral GIS &amp; PFMS Direct Benefit Transfer.
        </p>

        {/* White Floating Search Card */}
        <div className="w-full max-w-4xl bg-white text-slate-800 rounded-xl shadow-2xl p-4 sm:p-5 text-left border border-slate-200 mb-6">
          
          {/* Top Search Tabs */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-8 border-b border-slate-200 pb-3 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => { setSearchType('project'); setSearchResults(null); }}
              className={`pb-1 transition-colors cursor-pointer ${
                searchType === 'project'
                  ? 'text-[#1B365D] border-b-2 border-[#1B365D] font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Search by Project Name
            </button>
            <button
              type="button"
              onClick={() => { setSearchType('survey'); setSearchResults(null); }}
              className={`pb-1 transition-colors cursor-pointer ${
                searchType === 'survey'
                  ? 'text-[#1B365D] border-b-2 border-[#1B365D] font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Search by Survey Number
            </button>
            <button
              type="button"
              onClick={() => { setSearchType('ulpin'); setSearchResults(null); }}
              className={`pb-1 transition-colors cursor-pointer ${
                searchType === 'ulpin'
                  ? 'text-[#1B365D] border-b-2 border-[#1B365D] font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Search by Land Parcel ID
            </button>
          </div>

          {/* Search Input Bar & Button */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 mt-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === 'project'
                    ? 'Enter Project Name or Ministry (e.g., Western Dedicated Freight Corridor)...'
                    : searchType === 'survey'
                    ? 'Enter Survey/Khasra No & Village (e.g., 142/A, Vadadla)...'
                    : 'Enter 14-digit ULPIN (e.g., GJ-BRD-2024-8842-991A)...'
                }
                className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-300 rounded-lg pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1B365D] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1B365D] hover:bg-[#132742] text-white font-bold text-sm rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search Records</span>
            </button>
          </form>

          {/* Bottom Sub-info: Popular searches & Active Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-2 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-600">Popular searches:</span>
              <button
                type="button"
                onClick={() => handleApplyPreset('WDFC Gujarat', 'project')}
                className="hover:text-[#1B365D] hover:underline cursor-pointer"
              >
                WDFC Gujarat,
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('Jewar Airport Corridor', 'project')}
                className="hover:text-[#1B365D] hover:underline cursor-pointer"
              >
                Jewar Airport Corridor,
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('142/A', 'survey')}
                className="hover:text-[#1B365D] hover:underline cursor-pointer"
              >
                Survey 142/A Rampura
              </button>
            </div>
            <span className="font-semibold text-slate-600 shrink-0">248 Projects Online</span>
          </div>

          {/* Search Results Display */}
          {searchResults && searchResults !== 'not-found' && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-300 rounded-lg">
              <div className="text-xs font-bold text-[#1B365D] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Found {searchResults.length} Matching Statutory Land Record(s):</span>
              </div>
              <div className="space-y-2.5">
                {searchResults.map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>Khasra/Survey {item.surveyNo}, Village {item.village}, {item.tehsil} ({item.state})</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-100 text-amber-900 rounded border border-amber-300">
                          {item.ulpin}
                        </span>
                      </div>
                      <div className="text-slate-600 mt-1">
                        <strong className="text-slate-700">Project:</strong> {item.project}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 mt-1">
                        <span><strong className="text-slate-700">Stage:</strong> <span className="text-emerald-700 font-semibold">{item.stage}</span></span>
                        <span><strong className="text-slate-700">Compensation:</strong> <span className="text-amber-800 font-semibold">{item.compensationStatus}</span></span>
                        <span><strong className="text-slate-700">Gazette:</strong> <span className="font-mono text-cyan-800">{item.gazetteNo}</span></span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTab('track-land')}
                      className="px-3 py-1.5 rounded bg-[#C5A059] text-slate-950 font-bold hover:bg-[#b58f45] transition-colors cursor-pointer text-xs shrink-0 self-start md:self-center"
                    >
                      View Full Lifecycle
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults === 'not-found' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>No matching records found for "{searchQuery}". Please check the project name, survey number, or ULPIN.</span>
            </div>
          )}

        </div>

        {/* 3 Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => onSelectTab('track-land')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#b58f45] text-slate-950 font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md hover:shadow-lg border border-amber-300/40"
          >
            <MapPin className="w-4 h-4" />
            <span>Track Your Land Status</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('cadastral-gis-monitor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#142338]/90 hover:bg-[#142338] text-white font-medium text-xs sm:text-sm cursor-pointer transition-all border border-slate-600/70 backdrop-blur-xs shadow-md"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>View Interactive GIS Map</span>
          </button>

          <button
            onClick={onOpenOfficerLogin}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md border border-slate-200"
          >
            <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
            <span>Officer / Citizen Login</span>
          </button>
        </div>

        {/* Official Government Dynamic Background Carousel Controls & Status */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-1.5 px-4 rounded-full bg-black/60 backdrop-blur-md border border-slate-700/80 text-xs text-slate-300 shadow-xl select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-amber-200 font-semibold">
              {HERO_SLIDES[currentSlideIndex].tag}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              ({currentSlideIndex + 1}/{HERO_SLIDES.length})
            </span>
          </div>

          <div className="h-3 w-[1px] bg-slate-700 hidden sm:block" />

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlideIndex(i)}
                aria-label={`Switch to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlideIndex === i 
                    ? 'w-6 h-2 bg-[#C5A059]' 
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="h-3 w-[1px] bg-slate-700 hidden sm:block" />

          {/* Prev / Play / Next Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause slide rotation" : "Resume slide rotation"}
              className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Smooth Transition Ribbon at the base of Hero */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FAF8F5]/20 to-transparent pointer-events-none" />
    </section>

    {/* Section 2 to 4: Clean Institutional Body (Seamless Institutional Palette matching National Portal) */}
    <div className="w-full bg-[#FAF8F5] text-slate-900 pb-12 sm:pb-16 border-b border-slate-200">
      
      {/* Section 2: White National Land Acquisition Status Bar */}
      <div className="max-w-7xl mx-auto -mt-8 sm:-mt-10 relative z-20 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xl p-4 sm:p-6 text-slate-800">
          
          {/* Status Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B365D] tracking-wider uppercase font-serif">
              <span className="text-amber-500">📈</span>
              <span>National Land Acquisition Status (RFCTLARR Act 2013)</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-500 uppercase bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              Updated: Live Portal Aggregation
            </span>
          </div>

          {/* 5 KPI Metric Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="pt-2 sm:pt-0 sm:px-3 first:pl-0">
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Total Projects</div>
              <div className="text-2xl sm:text-3xl font-black text-[#1B365D] font-mono mt-0.5">248</div>
              <div className="text-[11px] text-slate-500 mt-0.5">184 Active Districts</div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Area Notified</div>
              <div className="text-2xl sm:text-3xl font-black text-[#1B365D] font-mono mt-0.5">
                18,540 <span className="text-xs font-normal text-slate-500">Acres</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Sec 11(1) Gazette</div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Area Handed Over</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono mt-0.5">
                12,870 <span className="text-xs font-normal text-slate-500">Acres</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">69.4% Possession Done</div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Affected Families</div>
              <div className="text-2xl sm:text-3xl font-black text-[#1B365D] font-mono mt-0.5">42,350</div>
              <div className="text-[11px] text-slate-500 mt-0.5">SIA Census Done</div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Compensation Disbursed</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono mt-0.5">
                ₹ 8,240.50 <span className="text-xs font-normal text-slate-500">Cr</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">PFMS Direct Bank Transfer</div>
            </div>
          </div>

        </div>
      </div>

      {/* Section 3: National Cadastral GIS & SLA Monitor Box with Real Interactive Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12" id="cadastral-gis-monitor">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B365D] border border-amber-400/50 flex items-center justify-center text-[#C5A059] shadow-sm shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-lg sm:text-xl font-bold text-[#1B365D] uppercase tracking-wider font-serif">
                    National Cadastral GIS &amp; SLA Monitor
                  </h2>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                    LIVE NIC DILRMP SYNC
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Interactive Cadastral GIS Corridor Alignment, Multi-layer Survey Polygons &amp; Statutory Milestone Tracking
                </p>
              </div>
            </div>

            {/* 3 Quick Micro KPI Indicators */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
              <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Corridor Length</div>
                <div className="text-xs sm:text-sm font-bold text-[#1B365D] font-mono">1,504 KM</div>
              </div>
              <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Parcels Mapped</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 font-mono">42,850+</div>
              </div>
              <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-center">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Award Disbursed</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-700 font-mono">94.8%</div>
              </div>
            </div>
          </div>

          {/* Interactive Real Leaflet GIS Map */}
          <div className="rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-900">
            <LeafletGisMap 
              height="480px"
              showTools={true}
              showTableDefault={false}
              showSaveButton={false}
            />
          </div>
        </div>
      </div>

      {/* Section 4: 6 Key Statutory Service Gateway Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B365D] font-serif">
            Core Statutory Citizen &amp; Department Services
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Comprehensive modules engineered under the RFCTLARR Act 2013 for total transparency, rapid execution, and direct benefit transfer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Track My Land */}
          <div 
            onClick={() => onSelectTab('track-land')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-[#C5A059] rounded-xl p-5 cursor-pointer transition-all shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B365D]/10 border border-[#1B365D]/20 flex items-center justify-center text-[#1B365D] mb-4 group-hover:scale-105 group-hover:bg-[#1B365D] group-hover:text-[#E6CA85] transition-all">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1B365D] group-hover:text-blue-900 transition-colors flex items-center justify-between">
              <span>Track My Land &amp; ULPIN</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Check complete statutory acquisition stage from Sec 4 SIA mandate, Sec 11 preliminary notification, Sec 19 declaration to final physical possession.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>ULPIN &amp; Khasra Search</span>
              <span className="text-[#C5A059] font-bold">Statutory SLA Timers</span>
            </div>
          </div>

          {/* Card 2: Compensation Calculator */}
          <div 
            onClick={() => onSelectTab('compensation')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-[#C5A059] rounded-xl p-5 cursor-pointer transition-all shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B365D]/10 border border-[#1B365D]/20 flex items-center justify-center text-[#1B365D] mb-4 group-hover:scale-105 group-hover:bg-[#1B365D] group-hover:text-[#E6CA85] transition-all">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1B365D] group-hover:text-blue-900 transition-colors flex items-center justify-between">
              <span>Statutory Compensation Calculator</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Compute transparent compensation based on First Schedule formulas: Market Value × Multiplier (Rural 1.25–2.0x, Urban 1.0x) + 100% Solatium + 12% Interest.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>Sections 26 to 30</span>
              <span className="text-emerald-700 font-bold">100% Solatium Guarantee</span>
            </div>
          </div>

          {/* Card 3: R&R Entitlements & Passbook */}
          <div 
            onClick={() => onSelectTab('rnr-passbook')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-[#C5A059] rounded-xl p-5 cursor-pointer transition-all shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B365D]/10 border border-[#1B365D]/20 flex items-center justify-center text-[#1B365D] mb-4 group-hover:scale-105 group-hover:bg-[#1B365D] group-hover:text-[#E6CA85] transition-all">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1B365D] group-hover:text-blue-900 transition-colors flex items-center justify-between">
              <span>R&amp;R Entitlements &amp; Passbook</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Explore Second Schedule entitlements: constructed housing grants, subsistence grants (₹3,000/mo), cattle shed grants, and 25 mandatory civic infrastructure amenities.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>2nd &amp; 3rd Schedules</span>
              <span className="text-blue-800 font-bold">Direct DBT Passbook</span>
            </div>
          </div>

          {/* Card 4: Gazette Notifications Vault */}
          <div 
            onClick={() => onSelectTab('gazette-vault')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-[#C5A059] rounded-xl p-5 cursor-pointer transition-all shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B365D]/10 border border-[#1B365D]/20 flex items-center justify-center text-[#1B365D] mb-4 group-hover:scale-105 group-hover:bg-[#1B365D] group-hover:text-[#E6CA85] transition-all">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1B365D] group-hover:text-blue-900 transition-colors flex items-center justify-between">
              <span>Public Gazette Vault</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Search and download certified statutory gazette publications: Section 4 SIA notifications, Section 11 preliminary notifications, Section 19 declarations, and Collector awards.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>2048-bit DSC Verified</span>
              <span className="text-slate-700 font-bold">Central &amp; State Gazettes</span>
            </div>
          </div>

          {/* Card 5: Cadastral GIS Explorer */}
          <div 
            onClick={() => onSelectTab('gis-explorer')}
            className="bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-[#C5A059] rounded-xl p-5 cursor-pointer transition-all shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B365D]/10 border border-[#1B365D]/20 flex items-center justify-center text-[#1B365D] mb-4 group-hover:scale-105 group-hover:bg-[#1B365D] group-hover:text-[#E6CA85] transition-all">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#1B365D] group-hover:text-blue-900 transition-colors flex items-center justify-between">
              <span>Cadastral GIS Explorer</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Interactive spatial viewer powered by Leaflet, Bhuvan WMS, and Turf.js. Inspect acquisition buffer corridors, surveyed polygons, and affected village boundaries.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>Satellite &amp; Vector Canvas</span>
              <span className="text-cyan-800 font-bold">Spatial Intersect Preview</span>
            </div>
          </div>

          {/* Card 6: NLAMS Master Workspaces & RBAC Access Matrix */}
          <div 
            onClick={() => onSelectTab('rbac-directory')}
            className="bg-white hover:bg-slate-50/90 border-2 border-[#1B365D]/30 hover:border-[#C5A059] rounded-xl p-5 cursor-pointer transition-all shadow-xs hover:shadow-md group relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B365D] border border-[#C5A059]/40 flex items-center justify-center text-[#E6CA85] mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-base font-bold text-[#1B365D] group-hover:text-blue-900 transition-colors flex items-center justify-between">
              <span>Master Workspaces &amp; RBAC Access</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B365D] group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Centralized RBAC architecture providing dedicated statutory workspaces for Requiring Body, District Collector (CALA), Central &amp; State Governments, SIA/IEG, R&amp;R, and LARR Tribunal.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span className="text-[#1B365D] font-bold">8 Workspaces + Citizen</span>
              <span className="text-emerald-700 font-bold">RBAC Access Matrix</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
  );
}
