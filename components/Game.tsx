'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Pause, Zap } from 'lucide-react'

export default function Game() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)
  const [energy, setEnergy] = useState(82)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    let game: import('phaser').Game | undefined
    let timer: ReturnType<typeof setInterval> | undefined
    import('phaser').then(({ default: Phaser }) => {
      if (!mountRef.current) return
      mountRef.current.replaceChildren()
      class PlayScene extends Phaser.Scene {
        player!: Phaser.GameObjects.Triangle
        bullets!: Phaser.Physics.Arcade.Group
        enemies!: Phaser.Physics.Arcade.Group
        create() {
          this.cameras.main.setBackgroundColor('#070b19')
          this.add.rectangle(180, 320, 360, 640, 0x070b19)
          for (let i = 0; i < 35; i++) { const x = Phaser.Math.Between(8, 352), y = Phaser.Math.Between(8, 632); this.add.circle(x, y, Phaser.Math.Between(1, 2), 0x9da8d8, Phaser.Math.FloatBetween(.25, .9)) }
          this.player = this.add.triangle(180, 560, 0, 22, 12, 0, 24, 22, 0x5ce1e6).setStrokeStyle(2, 0xb9ffff)
          this.physics.add.existing(this.player)
          this.bullets = this.physics.add.group(); this.enemies = this.physics.add.group()
          this.time.addEvent({ delay: 750, loop: true, callback: () => { const x = Phaser.Math.Between(20, 340); const enemy = this.add.circle(x, -20, Phaser.Math.Between(9, 17), 0xff7a90).setStrokeStyle(2, 0xffc1cc); this.physics.add.existing(enemy); (enemy.body as Phaser.Physics.Arcade.Body).setVelocityY(Phaser.Math.Between(80, 145)); this.enemies.add(enemy) } })
          this.time.addEvent({ delay: 260, loop: true, callback: () => { const bullet = this.add.rectangle(this.player.x, this.player.y - 20, 3, 14, 0xa78bfa); this.physics.add.existing(bullet); (bullet.body as Phaser.Physics.Arcade.Body).setVelocityY(-470); this.bullets.add(bullet) } })
          this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => { bullet.destroy(); enemy.destroy(); setScore((value) => value + 100) })
        }
        update() { const pointer = this.input.activePointer; if (pointer.isDown) this.player.x = Phaser.Math.Clamp(pointer.x, 18, 342); else { const keys = this.input.keyboard?.createCursorKeys(); if (keys?.left.isDown) this.player.x -= 4; if (keys?.right.isDown) this.player.x += 4 } }
      }
      game = new Phaser.Game({ type: Phaser.AUTO, width: 360, height: 640, parent: mountRef.current, transparent: false, physics: { default: 'arcade', arcade: { debug: false } }, scene: PlayScene, scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH } })
      timer = setInterval(() => setEnergy((value) => Math.min(100, value + 1)), 400)
    })
    return () => { if (timer) clearInterval(timer); game?.destroy(true) }
  }, [])
  return <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#070b19] px-4 py-6"><header className="flex items-center justify-between"><Link href="/" className="rounded-lg border border-white/10 p-2 text-white/60"><ArrowLeft className="size-5"/></Link><div className="text-center"><p className="text-[9px] font-bold uppercase tracking-[.35em] text-cyan">Sector 07</p><p className="text-xl font-black tracking-widest">{score.toLocaleString()}</p></div><button onClick={() => setPaused(!paused)} className="rounded-lg border border-white/10 p-2 text-white/60" aria-label="Pause game"><Pause className="size-5"/></button></header><div className="mt-5 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest"><div className="flex gap-1 text-coral"><span>♥</span><span>♥</span><span>♥</span></div><div className="flex flex-1 items-center gap-2 text-white/50"><Zap className="size-3 text-cyan"/><div className="h-1.5 flex-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan shadow-[0_0_10px_#5ce1e6]" style={{ width: `${energy}%` }}/></div></div><span className="text-violet">x1.0</span></div><div ref={mountRef} className="mt-4 h-[min(640px,calc(100vh-150px))] min-h-[320px] overflow-hidden rounded-2xl border border-cyan/20 bg-[#070b19] shadow-[0_0_45px_rgba(92,225,230,.08)]"/><div className="flex justify-between pt-4 text-[10px] font-bold uppercase tracking-[.22em] text-white/30"><span>Drag to move</span><span className="text-cyan">Auto-fire active</span></div></div>
}
