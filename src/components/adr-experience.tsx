import { useRef, useState } from 'react';
import { ArrowUpRight, Maximize2, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import patioVideo from '@/assets/patio-video.asset.json';
import kitchenVideo from '@/assets/kitchen-video.asset.json';
import interiorVideo from '@/assets/interior-video.asset.json';
import patio from '@/assets/patio.asset.json';
import kitchen from '@/assets/kitchen.asset.json';
import interior from '@/assets/interior.asset.json';

const scenes = [
  { name: 'Patio contemporáneo', category: 'Arquitectura exterior', video: patioVideo.url, poster: patio.url },
  { name: 'El corazón del hogar', category: 'Diseño interior', video: kitchenVideo.url, poster: kitchen.url },
  { name: 'Un mundo por imaginar', category: 'Espacios infantiles', video: interiorVideo.url, poster: interior.url },
];
export function Experience() {
  const video = useRef<HTMLVideoElement>(null);
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const current = scenes[scene];
  if (!current) return null;
  function toggle() {
    const node = video.current;
    if (!node) return;
    if (node.paused) void node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { node.pause(); setPlaying(false); }
  }
  return <section className="experience section-anchor" id="experiencia">
    <div className="section-heading experience-heading"><div><span className="eyebrow">03 / MÁS ALLÁ DE UN PLANO</span><h2>Antes de construirlo.<br /><span>Ya puedes sentirlo.</span></h2></div><p>La luz. Los materiales. Cada perspectiva.<br />Descubre tus espacios con recorridos virtuales 3D.</p></div>
    <div className="scene-tabs" role="tablist" aria-label="Recorridos disponibles">{scenes.map((s, i) => <Button key={s.name} variant="ghost" role="tab" aria-selected={scene === i} className={scene === i ? 'scene-tab active' : 'scene-tab'} onClick={() => {setScene(i); setProgress(0); setPlaying(false);}}><span>0{i + 1}</span>{s.category}<ArrowUpRight /></Button>)}</div>
    <div className="cinema">
      <video key={current.video} ref={video} src={current.video} poster={current.poster} muted playsInline preload="metadata" onTimeUpdate={() => { const v = video.current; if (v && v.duration) setProgress(v.currentTime / v.duration * 100); }} onEnded={() => setPlaying(false)} />
      <div className="cinema-top"><span><i /> ADR VIRTUAL EXPERIENCE</span><Button variant="ghost" size="icon" title="Pantalla completa" aria-label="Pantalla completa" onClick={() => {const v = video.current; if (v) void v.requestFullscreen?.().catch(() => undefined);}}><Maximize2 /></Button></div>
      <Button variant="ghost" className={`cinema-play ${playing ? 'is-playing' : ''}`} aria-label={playing ? 'Pausar recorrido' : 'Reproducir recorrido'} onClick={toggle}>{playing ? <Pause /> : <Play />}</Button>
      <div className="cinema-bottom"><div><span className="eyebrow">RECORRIDO VIRTUAL / 0{scene + 1}</span><h3>{current.name}</h3></div><span className="cinema-label">DISEÑADO PARA VIVIRSE ↗</span><div className="cinema-controls"><Button variant="ghost" size="icon" aria-label={playing ? 'Pausar' : 'Reproducir'} onClick={toggle}>{playing ? <Pause /> : <Play />}</Button><input aria-label="Avance del recorrido" type="range" min="0" max="100" value={progress} onChange={e => { const v = video.current; const n = Number(e.target.value); if (v && Number.isFinite(v.duration)) {v.currentTime = n / 100 * v.duration; setProgress(n);} }} /><span>{Math.round(progress)}%</span></div></div>
    </div>
  </section>;
}