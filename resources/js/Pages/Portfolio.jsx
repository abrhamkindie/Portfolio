import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/ServiceOrbit';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';

const API_BASE = '/api';

async function fetchData(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
}

export default function Portfolio({ initialData = {}, auth }) {
    const isOwner = !!auth?.user;
    const [data, setData] = useState({
        profile: initialData.profile || null,
        projects: initialData.projects || [],
        skills: initialData.skills || [],
        experiences: initialData.experiences || [],
        educations: initialData.educations || [],
        certificates: initialData.certificates || [],
    });
    const onProfileChange = (profile) => setData((d) => ({ ...d, profile }));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData.profile) return;

        const loadData = async () => {
            try {
                setLoading(true);
                const [profileRes, projectsRes, skillsRes, experiencesRes, educationsRes, certificatesRes] = await Promise.all([
                    fetchData('/profile'),
                    fetchData('/projects?published=true&per_page=20'),
                    fetchData('/skills?per_page=50'),
                    fetchData('/experiences?per_page=20'),
                    fetchData('/educations?per_page=20'),
                    fetchData('/certificates?per_page=20'),
                ]);

                setData({
                    profile: profileRes.data || profileRes,
                    projects: projectsRes.data || projectsRes,
                    skills: skillsRes.data || skillsRes,
                    experiences: experiencesRes.data || experiencesRes,
                    educations: educationsRes.data || educationsRes,
                    certificates: certificatesRes.data || certificatesRes,
                });
            } catch (err) {
                console.error('Failed to load portfolio data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [initialData.profile]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-night font-sans text-white/50">
                <p className="text-sm">Loading…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-night px-6 text-center font-sans text-white">
                <h2 className="text-3xl font-bold tracking-tight">Something went wrong</h2>
                <p className="text-sm text-white/60">{error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">Try again</button>
            </div>
        );
    }

    return (
        <>
            <Head
                title={
                    [data.profile?.full_name, data.profile?.title].filter(Boolean).join(' — ') ||
                    'Abrham — Portfolio'
                }
            />
            <div className="min-h-screen bg-night font-sans text-white antialiased">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:text-primary-foreground"
                >
                    Skip to content
                </a>
                <Navbar profile={data.profile} />
                <main id="main-content">
                    <Hero profile={data.profile} onProfileChange={onProfileChange} editable={isOwner} />
                    <About profile={data.profile} />
                    <Projects projects={data.projects} />
                    <Services />
                    <Skills skills={data.skills} />
                    <Experience experiences={data.experiences} />
                    <Education educations={data.educations} />
                    <Certificates certificates={data.certificates} />
                    <Contact profile={data.profile} />
                </main>
                <Footer profile={data.profile} />
            </div>
        </>
    );
}
