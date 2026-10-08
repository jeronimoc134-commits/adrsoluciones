import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Menu, MessageCircle, Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/adr-contact';
import { Experience } from '@/components/adr-experience';
import architecture from '@/assets/architecture.asset.json';
import interior from '@/assets/interior.asset.json';
import kitchen from '@/assets/kitchen.asset.json';
import logo from '@/assets/logo.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'ADR Soluciones | Arquitectura, diseño y experiencias 3D' },
    { name: 'description', content: 'Arquitectura que transforma tu forma de vivir. Diseño arquitectónico, reformas, planes mensuales y recorridos virtuales 3D. Proyectos en Colombia, México y Estados Unidos.' },
    { property: 'og:title', content: 'ADR Soluciones | Espacios con otra perspectiva' },
    { property: 'og:description', content: 'Diseño arquitectónico, reformas y recorridos virtuales 3D. Descubre ADR Soluciones y comienza tu proyecto.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
const whatsapp = 'https://wa.me/573044391786?text=' + encodeURIComponent('Hola ADR Soluciones, vengo desde la página web y quiero cotizar un proyecto. ¿Me pueden dar más información?');
const offerings = [
  { title: 'Diseño arquitectónico', tag: 'DE LA IDEA AL ESPACIO', text: 'Arquitectura que conecta tu estilo de vida con el entorno. Concepto, distribución y diseño con una visión integral.' },
  { title: 'Reformas de apartamentos', tag: 'UNA NUEVA FORMA DE HABITAR', text: 'Reimaginamos lo que ya existe. Transformamos la distribución, los materiales y los detalles de tu apartamento.' },
  { title: 'Planes por mensualidad', tag: 'ARQUITECTURA A TU RITMO', text: 'Un plan de arquitectura por mensualidad para acompañar el desarrollo de tus ideas. Conversemos sobre el alcance que necesita tu proyecto.' },
  { title: 'Recorridos virtuales 3D', tag: 'VIVE TU IDEA ANTES DE CONSTRUIR', text: 'Explora la luz, la escala y los acabados de tu proyecto en recorridos virtuales. Una nueva perspectiva para tomar decisiones.' },
];
function Index() {
  const [menu, setMenu] = useState(false);
  const [openService, setOpenService] = useState<number | null>(0);
  const [filter, setFilter] = useState('Todos');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting) {e.target.classList.add('revealed'); observer.unobserve(e.target);}}), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(e => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  const projects = [
    { title: 'Arquitectura que da la bienvenida', category: 'Arquitectura', image: architecture.url, detail: 'EXTERIORES / DISEÑO ARQUITECTÓNICO' },
    { title: 'Espacios para imaginar', category: 'Interiores', image: interior.url, detail: 'INTERIORES / ESPACIOS INFANTILES' },
    { title: 'Donde todo se encuentra', category: 'Interiores', image: kitchen.url, detail: 'INTERIORES / COCINA Y SOCIAL' },
  ];
  return <main>
    <header className="site-header"><a href="#inicio" className="brand" aria-label="ADR Soluciones, inicio"><img src={logo.url} alt="" /><span>ADR<span className="brand-small">SOLUCIONES</span></span></a><nav className={menu ? 'main-nav menu-open' : 'main-nav'} aria-label="Navegación principal">{[['Estudio','estudio'],['Servicios','servicios'],['Proyectos','proyectos'],['Experiencia 3D','experiencia']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}</nav><Button asChild className="header-cta" variant="outline"><a href="#contacto">Hablemos de tu proyecto <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="mobile-menu" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></header>
    <section className="hero section-anchor" id="inicio"><img className="hero-image" src={architecture.url} alt="Diseño arquitectónico ADR de acceso contemporáneo con iluminación integrada" fetchPriority="high" /><div className="hero-shade" /><div className="hero-topline"><span>ARQUITECTURA · DISEÑO · RENDERIZACIÓN</span><span><i /> IDEAS SIN FRONTERAS</span></div><div className="hero-content"><span className="eyebrow">ESTUDIO DE ARQUITECTURA & DISEÑO</span><h1>ADR Soluciones<span>Espacios con<br />otra perspectiva.</span></h1><div className="hero-description"><p>Diseñamos más que espacios.<br />Creamos nuevas formas de vivirlos.</p><Button asChild className="hero-cta"><a href="#proyectos">Explora nuestros proyectos <ArrowUpRight /></a></Button></div></div><div className="hero-bottom"><a href="#estudio" className="scroll-link"><span className="scroll-circle"><ArrowDown /></span>DESCUBRE ADR</a><span>COLOMBIA &nbsp; / &nbsp; MÉXICO &nbsp; / &nbsp; ESTADOS UNIDOS</span><span className="hero-index">01 — 04</span></div><div className="hero-side">DISEÑO QUE SE SIENTE.</div></section>
    <div className="brand-strip"><span>UNA IDEA.</span><span>INFINITAS POSIBILIDADES.</span><ArrowDownRight /><span>ARQUITECTURA CON INTENCIÓN.</span><span className="strip-end">ADR®</span></div>
    <section id="estudio" className="studio section-anchor reveal"><span className="eyebrow">01 / EL ESTUDIO</span><div className="studio-content"><h2>No se trata solo<br />de cómo se ve.<br /><span>Se trata de cómo se vive.</span></h2><div className="studio-copy"><span className="small-cross">+</span><p>En ADR Soluciones, cada proyecto comienza con una pregunta: ¿cómo quieres vivir tu espacio?</p><p>Unimos arquitectura, diseño y visualización 3D para convertir tus ideas en lugares con identidad. Desde la primera línea hasta la última perspectiva.</p><div className="international"><span className="eyebrow">NUESTRA VISIÓN NO TIENE FRONTERAS</span><div><span>Colombia</span><span>México</span><span>Estados Unidos</span></div><p>Experiencia en proyectos en tres países.<br />Una misma pasión por diseñar diferente.</p></div></div></div></section>
    <section id="servicios" className="services section-anchor reveal"><div className="section-heading"><div><span className="eyebrow">02 / LO QUE HACEMOS</span><h2>Tu visión.<br /><span>Nuestra especialidad.</span></h2></div><p>Soluciones que se adaptan a ti.<br />Diseño que va más allá de lo esperado.</p></div><div className="service-list">{offerings.map((s,i) => <div key={s.title} className={`service-row ${openService === i ? 'expanded' : ''}`}><Button variant="ghost" className="service-toggle" aria-expanded={openService === i} onClick={() => setOpenService(openService === i ? null : i)}><span className="service-number">0{i+1}</span><h3>{s.title}</h3><span className="service-tag">{s.tag}</span><span className="service-plus">{openService === i ? <Minus /> : <Plus />}</span></Button>{openService === i && <div className="service-detail"><p>{s.text}</p><a href="#contacto">Conversemos sobre tu idea <ArrowUpRight /></a></div>}</div>)}</div></section>
    <section id="proyectos" className="projects section-anchor reveal"><div className="section-heading"><div><span className="eyebrow">PORTAFOLIO / UNA MIRADA A NUESTRO TRABAJO</span><h2>Ideas que<br /><span>encuentran su lugar.</span></h2></div><div className="project-filters" aria-label="Filtrar proyectos">{['Todos','Arquitectura','Interiores'].map(f => <Button key={f} variant="ghost" aria-pressed={filter===f} className={filter===f ? 'filter active' : 'filter'} onClick={() => setFilter(f)}>{f}</Button>)}</div></div><div className="project-grid">{projects.filter(p => filter==='Todos' || p.category===filter).map((p,i) => <a className="project-item" href="#experiencia" key={p.title}><div className="project-image"><img src={p.image} alt={p.title} loading="lazy" /><span className="project-arrow"><ArrowUpRight /></span><span className="project-counter">0{i+1}</span></div><div className="project-info"><div><span className="eyebrow">{p.detail}</span><h3>{p.title}</h3></div><ArrowUpRight /></div></a>)}</div></section>
    <Experience />
    <section id="contacto" className="contact section-anchor reveal"><div className="contact-copy"><span className="eyebrow">04 / EL SIGUIENTE GRAN ESPACIO</span><h2>Empieza<br />con una <span>idea.</span><ArrowUpRight /></h2><p>Y la tuya nos interesa.<br />Cuéntanos qué imaginas. Hagámoslo posible.</p><a className="whatsapp-contact" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /><div><span>¿PREFIERES CONVERSAR?</span><strong>Hablemos por WhatsApp <ArrowUpRight /></strong></div></a></div><ContactForm /></section>
    <footer><div className="footer-top"><a href="#inicio" className="footer-brand">ADR<span>SOLUCIONES</span></a><p>Arquitectura. Diseño. Nuevas perspectivas.</p><a href="#inicio" className="back-top">VOLVER ARRIBA <ArrowUpRight /></a></div><div className="footer-bottom"><span>© 2026 ADR Soluciones</span><span>COLOMBIA / MÉXICO / ESTADOS UNIDOS</span><a href={whatsapp} target="_blank" rel="noopener noreferrer">+57 304 439 1786 <ArrowUpRight /></a></div></footer>
    <Button asChild className="floating-whatsapp" size="icon"><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Cotizar con ADR por WhatsApp" title="Cotiza por WhatsApp"><MessageCircle /></a></Button>
  </main>;
}
