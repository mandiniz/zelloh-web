"use client";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiClock, FiTag, FiSearch } from "react-icons/fi";

const POSTS = [
  {
    id: 1,
    category: "Ecosystem",
    title: "The Future of Zelloh: Protocol v3.0 Deployment",
    date: "Feb 12, 2026",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000",
    featured: true,
    readTime: "5 min read"
  },
  {
    id: 2,
    category: "Nodes",
    title: "How to Optimize your Mobile Gateway for Rewards",
    date: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1614064641935-3bb7518b2c5f?q=80&w=1000",
    featured: false,
    readTime: "3 min read"
  },
  {
    id: 3,
    category: "Alpha",
    title: "Global Partnership with leading Web3 Terminals",
    date: "Feb 08, 2026",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
    featured: false,
    readTime: "4 min read"
  },
  {
    id: 4,
    category: "Community",
    title: "Joining the Ecosystem: $20 Bonus Program explained",
    date: "Feb 05, 2026",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000",
    featured: false,
    readTime: "6 min read"
  }
];

export default function BlogPage() {
  const featuredPost = POSTS.find(p => p.featured);
  const regularPosts = POSTS.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#E6F379] selection:text-black">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#E6F379]/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER SECTION */}
        <header className="mb-20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#E6F379]"
              >
                <div className="w-1.5 h-1.5 bg-[#E6F379] rounded-full animate-pulse" />
                Live_Updates
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-[0.8]">
                News & <br /> <span className="text-[#E6F379]">Insights_</span>
              </h1>
            </div>

            <div className="relative group w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#E6F379] transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH_TERMINAL..."
                className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#E6F379]/50 transition-all"
              />
            </div>
          </div>
        </header>

        {/* FEATURED POST */}
        {featuredPost && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative mb-20 cursor-pointer"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[3rem] border border-white/10">
              <img 
                src={featuredPost.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={featuredPost.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-16 space-y-6 w-full max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="bg-[#E6F379] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Featured
                  </span>
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    <FiClock /> {featuredPost.readTime}
                  </div>
                </div>
                <h2 className="text-3xl md:text-6xl font-[1000] italic uppercase tracking-tighter leading-tight group-hover:text-[#E6F379] transition-colors">
                  {featuredPost.title}
                </h2>
                <div className="flex items-center gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  <span>{featuredPost.date}</span>
                  <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <span>By Zelloh Core</span>
                </div>
              </div>

              <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <FiArrowUpRight size={32} />
              </div>
            </div>
          </motion.section>
        )}

        {/* REGULAR CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 mb-6">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={post.title}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                {/* CATEGORY TAG */}
                <div className="absolute top-6 left-6">
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <FiTag className="text-[#E6F379]" size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{post.category}</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#E6F379] rounded-2xl flex items-center justify-center text-black">
                    <FiArrowUpRight size={24} />
                  </div>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1.5"><FiClock className="text-[#E6F379]" /> {post.readTime}</span>
                </div>
                <h3 className="text-2xl font-black italic uppercase leading-[0.9] tracking-tighter group-hover:text-[#E6F379] transition-colors">
                  {post.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="mt-20 flex justify-center">
          <button className="relative group p-[1px] rounded-full overflow-hidden bg-white/10 hover:bg-white transition-colors duration-300">
            <div className="bg-[#020202] group-hover:bg-transparent px-10 py-5 rounded-full transition-colors duration-300">
              <span className="text-xs font-[1000] uppercase tracking-[0.4em] group-hover:text-black transition-colors">Load_More_Data</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}