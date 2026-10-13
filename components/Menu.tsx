'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Rocket, Trophy, Settings2, Volume2, VolumeX } from 'lucide-react'

export default function Menu() {
  const [muted, setMuted] = useState(false)
  return <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between px-6 py-10">
    <header className="flex items-center justify-between text-xs font-bold uppercase tracking-[.3em] text-cyan"><span>AB // 01</span><span className="text-white/40">Online</span></header>
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="relative flex size-28 items-center justify-center rounded-full border border-cyan/30 bg-cyan/5 shadow-[0_0_70px_rgba(92,225,230,.15)]"><Rocket className="size-12 -rotate-45 text-cyan" strokeWidth={1.5}/><span className="absolute -bottom-2 rounded-full border border-violet/40 bg-ink px-3 py-1 text-[9px] font-bold tracking-[.28em] text-violet">SECTOR 07</span></div>
      <div><p className="mb-3 text-[11px] font-bold uppercase tracking-[.5em] text-coral">Survive the void</p><h1 className="neon-text text-6xl font-black italic tracking-[-.08em] text-white">ASTRO<br/><span className="text-cyan">BLASTER</span></h1><p className="mt-5 text-sm text-white/45">An endless arcade run through the neon frontier.</p></div>
      <div className="flex w-full flex-col gap-3"><Link href="/play" className="flex h-14 items-center justify-center gap-3 rounded-xl bg-cyan font-black uppercase tracking-[.25em] text-ink shadow-[0_0_30px_rgba(92,225,230,.28)] transition hover:scale-[1.02]"><Rocket className="size-5"/> Launch mission</Link><Link href="#leaderboard" className="flex h-12 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[.04] text-xs font-bold uppercase tracking-[.22em] text-white/75"><Trophy className="size-4 text-violet"/> Leaderboard</Link></div>
    </div>
    <footer className="flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[.2em] text-white/35"><span>Best run <strong className="text-white">12,480</strong></span><button onClick={() => setMuted(!muted)} className="flex items-center gap-2 text-white/55" aria-label="Toggle sound">{muted ? <VolumeX className="size-4"/> : <Volume2 className="size-4"/>}<span>Audio {muted ? 'off' : 'on'}</span></button><Settings2 className="size-4"/></footer>
  </section>
}
