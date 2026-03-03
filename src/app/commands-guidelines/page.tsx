"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaXTwitter, 
  FaWhatsapp, 
  FaTelegram, 
  FaDiscord, 
  FaFacebookMessenger 
} from "react-icons/fa6"; 
import { RiWechatFill } from "react-icons/ri";
import { IoChevronDown, IoFlash, IoSearch } from "react-icons/io5";

// --- TYPES ---
type Platform = 'X' | 'WhatsApp' | 'Telegram' | 'Discord' | 'Messenger' | 'WeChat';

interface Command {
  platform: Platform[];
  cmd: string;
  desc: string;
  example?: string;
}

// --- CONFIGURACIÓN DE PLATAFORMAS ---
const PLATFORMS_CONFIG = {
  X: { icon: <FaXTwitter />, color: "from-zinc-400 to-white" },
  WhatsApp: { icon: <FaWhatsapp />, color: "from-emerald-500 to-green-300" },
  Telegram: { icon: <FaTelegram />, color: "from-blue-500 to-cyan-400" },
  Discord: { icon: <FaDiscord />, color: "from-indigo-500 to-purple-400" },
  Messenger: { icon: <FaFacebookMessenger />, color: "from-blue-600 to-blue-400" },
  WeChat: { icon: <RiWechatFill />, color: "from-green-600 to-emerald-400" },
};

// --- BASE DE DATOS COMPLETA DE COMANDOS ---
const ALL_COMMANDS: Command[] = [
  // COMANDOS DE X (TWITTER)
  { platform: ['X'], cmd: "sign_up", desc: "Tweet '@zelloh_co #signup' to create a new account." },
  { platform: ['X'], cmd: "balance", desc: "Tweet '@zelloh_co #balance' to check your account balance." },
  { platform: ['X'], cmd: "link_account", desc: "Tweet '@zelloh_co #link @zelloh_co' to [$user] link your account to your Twitter handle." },
  { platform: ['X'], cmd: "send_money", desc: "Tweet '@zelloh_co send X $Zelloh to @recipient' to transfer funds." },
  { platform: ['X'], cmd: "request_money", desc: "Tweet '@zelloh_co request X $Zelloh from @debtor' to request funds." },
  { platform: ['X'], cmd: "transactions", desc: "Tweet '@zelloh_co #history' to view your transaction history." },
  { platform: ['X'], cmd: "withdraw", desc: "Tweet '@zelloh_co #withdraw [amount]' to withdraw funds to your national bank account." },
  { platform: ['X'], cmd: "log_out", desc: "Tweet '@zelloh_co #log_out' to sign out from your twitter Zelloh Account." },

  // COMANDOS DE ZELLOH BOTS (WHATSAPP, TELEGRAM, VIBER, ETC)
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "balance", desc: "Check your funds: 💳 Real balance, 💫 Spending bonuses, and 🔁 Pending bonuses." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "reload", desc: "Top up your card via external Card or by revealing your dedicated IBAN for SEPA transfers." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "request", desc: "Ask for money from friends/family via Mobile Number, Username, or QR Code." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "cards", desc: "Reveal card details, CVV, add to Apple/Google Wallet, or export PDF statements." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "payments", desc: "Manage your linked external bank accounts and saved credit/debit cards." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "nfts", desc: "NFT Hub: Buy directly from Opensea.io links or display your current collection." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "events", desc: "Access exclusive Zelloh events and ticket management." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "groups", desc: "Split expenses, trips, or bills with friends via Mobile, User, or Email." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "invite", desc: "Share your referral link and earn 20€ for every verified friend who joins." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "earnings", desc: "Track your referral rewards, Trophy Pass status, and available Cashback." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "activity", desc: "A quick summary of your latest incoming and outgoing movements." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "profile", desc: "View your Zelloh identity, verification status, and global rank." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "settings", desc: "Account security: Identity verification, block card, or report fraud." },
  { platform: ['WhatsApp', 'Telegram', 'Discord', 'Messenger', 'WeChat'], cmd: "support", desc: "Access the FAQ, join the 20k+ community on Discord, or ask a direct question." },
];

// --- COMPONENTES AUXILIARES ---
const CommandCard = ({ cmd, desc, platform }: { cmd: string, desc: string, platform: Platform }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="group relative"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f4e452]/20 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
    <div className="relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2.5rem] h-full flex flex-col gap-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-3xl font-[1000] italic uppercase tracking-tighter">
          <span className="text-[#f4e452]">/</span>{cmd}
        </h3>
        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
          {platform}
        </span>
      </div>
      <p className="text-zinc-400 font-medium text-sm leading-relaxed">
        {desc}
      </p>
      <div className="pt-4 mt-auto">
        <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
        <button className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#f4e452] opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          Copy Command
        </button>
      </div>
    </div>
  </motion.div>
);

export default function CommandsGuidelines() {
  const [activePlatform, setActivePlatform] = useState<Platform>('X');
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCommands = useMemo(() => {
    return ALL_COMMANDS.filter(c => 
      c.platform.includes(activePlatform) &&
      (c.cmd.toLowerCase().includes(searchQuery.toLowerCase()) || 
       c.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [activePlatform, searchQuery]);

  return (
    <main className="bg-[#050505] text-white min-h-screen w-full font-sans selection:bg-[#f4e452] selection:text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-44 pb-32 relative">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#7D26FF]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#f4e452]/10 blur-[120px] rounded-full pointer-events-none" />

        {/* HERO HEADER */}
        <div className="text-center mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-[#f4e452] mb-8"
          >
            <IoFlash /> Available on all protocols
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none mb-6">
            Zelloh <br />
            <span className={`bg-gradient-to-r ${PLATFORMS_CONFIG[activePlatform].color} bg-clip-text text-transparent`}>
              Commands
            </span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
            Manage your finances, NFTs, and transfers using simple text commands across your favorite social platforms.
          </p>
        </div>

        {/* CONTROLS: SELECTOR + SEARCH */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-24 relative z-[100]">
          {/* Dropdown Custom */}
          <div className="relative w-full md:w-auto">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-64 bg-[#111] border border-white/10 px-8 py-4 rounded-2xl flex items-center justify-between hover:border-[#f4e452]/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {PLATFORMS_CONFIG[activePlatform].icon}
                </span>
                <span className="font-black italic uppercase tracking-tight">{activePlatform}</span>
              </div>
              <IoChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                >
                  {(Object.keys(PLATFORMS_CONFIG) as Platform[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setActivePlatform(p); setIsDropdownOpen(false); }}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                    >
                      {PLATFORMS_CONFIG[p].icon}
                      <span className="font-bold uppercase text-[10px] tracking-widest">{p}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <IoSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 text-xl" />
            <input 
              type="text"
              placeholder="SEARCH COMMANDS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#f4e452]/40 font-bold uppercase text-xs tracking-widest transition-all"
            />
          </div>
        </div>

        {/* COMMANDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-40">
          <AnimatePresence mode="popLayout">
            {filteredCommands.map((item) => (
              <CommandCard 
                key={`${activePlatform}-${item.cmd}`}
                cmd={item.cmd} 
                desc={item.desc}
                platform={activePlatform}
              />
            ))}
          </AnimatePresence>
          
          {filteredCommands.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <p className="text-zinc-600 font-[1000] italic uppercase text-4xl">No matches found</p>
            </div>
          )}
        </div>

        {/* FOOTER SECTION */}
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter">
              Missing a <span className="text-[#f4e452]">feature?</span>
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
              We are constantly deploying new protocols
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-[1000] italic uppercase tracking-tighter text-xl hover:bg-[#f4e452] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Suggest an Command
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-[1000] italic uppercase tracking-tighter text-xl hover:bg-white/10 transition-colors">
              Read Developer Docs
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}