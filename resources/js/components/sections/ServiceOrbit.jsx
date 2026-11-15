import { useEffect, useRef, useState } from 'react';
import { Code, Palette, Rocket, Settings, Globe, Cpu, Zap, Shield } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

const iconMap = { 
    code: Code, 
    palette: Palette, 
    rocket: Rocket, 
    settings: Settings,
    globe: Globe,
    cpu: Cpu,
    zap: Zap,
    shield: Shield
};

export const defaultServices = [
    {
        id: 'web-development',
        title: 'Web Development',
        icon: 'code',
        description: 'Building robust, scalable backends and interactive frontends using modern frameworks.',
        items: ['Laravel & PHP', 'React & Inertia', 'APIs & integrations', 'Performance & security'],
    },
    {
        id: 'design',
        title: 'Design',
        icon: 'palette',
        description: 'Creating intuitive user experiences and visually stunning interfaces that drive engagement.',
        items: ['UI / UX design', 'Design systems', 'Prototyping', 'Brand identity'],
    },
    {
        id: 'deployment',
        title: 'Deployment',
        icon: 'rocket',
        description: 'Seamlessly moving code from development to production with high availability.',
        items: ['CI/CD pipelines', 'Cloud hosting', 'Docker & containers', 'Domain & SSL setup'],
    },
    {
        id: 'management',
        title: 'Management',
        icon: 'settings',
        description: 'Long-term maintenance and strategic growth for your digital products.',
        items: ['Maintenance & updates', 'Monitoring & backups', 'Hosting support', 'Ongoing improvements'],
    },
    {
        id: 'architecture',
        title: 'Architecture',
        icon: 'cpu',
        description: 'Designing high-performance system architectures for complex applications.',
        items: ['Microservices', 'Database design', 'Scalability', 'Cloud Architecture'],
    },
    {
        id: 'performance',
        title: 'Optimization',
        icon: 'zap',
        description: 'Auditing and improving application speed and user experience metrics.',
        items: ['Core Web Vitals', 'Load speed', 'Asset optimization', 'Code splitting'],
    }
];

export function Services({ services = defaultServices }) {
    const orbitRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const radius = 300; // Orbit radius
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            const rotation = gsap.to('.orbit-ring', {
                rotation: 360,
                duration: 60,
                ease: 'none',
                repeat: -1
            });
            
            const counterRotation = gsap.to('.orbit-item-content', {
                rotation: -360,
                duration: 60,
                ease: 'none',
                repeat: -1
            });

            // Slow down when hovering
            if (isHovering) {
                gsap.to([rotation, counterRotation], { timeScale: 0.2, duration: 1 });
            } else {
                gsap.to([rotation, counterRotation], { timeScale: 1, duration: 1 });
            }
        }, orbitRef);
        
        return () => ctx.revert();
    }, [isHovering]);

    return (
        <section id="services" className="bg-[#050505] section-pad relative overflow-hidden min-h-[900px] flex items-center">
            {/* Immersive Background Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/[0.04] rounded-full blur-[160px] pointer-events-none" />
            
            <div className="section-container relative z-10 w-full">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
                    <div className="relative">
                        {/* Glow behind text for readability */}
                        <div className="absolute -inset-20 bg-primary/[0.02] blur-3xl rounded-full pointer-events-none" />
                        
                        <SectionHeader 
                            label="Capabilities"
                            title={<>Design <span className="border-text">& Dev</span></>}
                            className="mb-12 relative z-10"
                        />
                        
                        <div className="max-w-md relative z-10">
                            <div className="h-72 flex flex-col justify-center">
                                <div key={activeIndex} className="animate-in fade-in slide-in-from-left-6 duration-700 ease-out">
                                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 uppercase tracking-tighter text-gradient leading-none">
                                        {services[activeIndex].title}
                                    </h3>
                                    <p className="text-xl text-white/80 leading-relaxed mb-10 font-medium">
                                        {services[activeIndex].description}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {services[activeIndex].items.map((item) => (
                                            <span key={item} className="px-5 py-2 rounded-full border border-primary/30 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 shadow-[0_0_20px_rgba(0,245,184,0.15)]">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[800px] w-[800px] hidden lg:flex items-center justify-center" ref={orbitRef}>
                        {/* Static Center Piece - The Engine */}
                        <div className="absolute z-20 h-44 w-44 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.9)]">
                            <div className="h-28 w-28 rounded-full bg-primary/5 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_4s_infinite]" />
                                <div className="h-8 w-8 rounded-full bg-primary shadow-[0_0_30px_rgba(0,245,184,0.6)]" />
                            </div>
                        </div>

                        {/* Orbit Rings */}
                        <div className="absolute h-[600px] w-[600px] rounded-full border border-white/[0.05]" />
                        <div className="orbit-ring absolute h-[600px] w-[600px] rounded-full border border-dashed border-primary/30 shadow-[inset_0_0_80px_rgba(0,245,184,0.03)]">
                            {services.map((service, i) => {
                                const angle = (i / services.length) * (2 * Math.PI);
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                const Icon = iconMap[service.icon] || Code;
                                const active = activeIndex === i;

                                return (
                                    <div
                                        key={service.id}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer"
                                        style={{
                                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                                        }}
                                        onMouseEnter={() => {
                                            setActiveIndex(i);
                                            setIsHovering(true);
                                        }}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        <div className="orbit-item-content group">
                                            <div className={cn(
                                                "h-24 w-24 rounded-[2.5rem] bg-[#0c0c0c] border transition-all duration-700 flex items-center justify-center shadow-2xl relative overflow-hidden",
                                                active 
                                                    ? "border-primary bg-primary/20 scale-125 -translate-y-6 shadow-[0_30px_60px_rgba(0,245,184,0.2)]" 
                                                    : "border-white/20 hover:border-primary/50 hover:bg-white/[0.08]"
                                            )}>
                                                {/* Inner Glow on hover/active */}
                                                <div className={cn(
                                                    "absolute inset-0 bg-primary/10 transition-opacity duration-700",
                                                    active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                                                )} />
                                                
                                                <Icon size={36} className={cn(
                                                    "relative z-10 transition-all duration-700",
                                                    active ? "text-primary scale-110" : "text-white/60 group-hover:text-white/90"
                                                )} />
                                            </div>
                                            
                                            {/* Floating Label */}
                                            <div className={cn(
                                                "absolute top-full mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2 rounded-xl bg-night/90 backdrop-blur-xl border transition-all duration-500",
                                                active 
                                                    ? "text-primary opacity-100 translate-y-0 scale-100 border-primary/30 shadow-[0_10px_30px_rgba(0,245,184,0.1)]" 
                                                    : "text-white/40 opacity-0 -translate-y-4 scale-90 border-white/10"
                                            )}>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">{service.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Mobile List View */}
                    <div className="lg:hidden space-y-8">
                        {services.map((service) => (
                            <div key={service.id} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02]">
                                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">{service.title}</h3>
                                <p className="text-white/40 mb-6">{service.description}</p>
                                <div className="flex flex-wrap gap-3">
                                    {service.items.map(item => (
                                        <span key={item} className="text-[9px] font-black uppercase tracking-widest text-primary/60">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

