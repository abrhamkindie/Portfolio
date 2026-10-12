

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { ImageShowcase } from '@/components/sections/ImageShowcase';
import { ServiceOrbit } from '@/components/sections/ServiceOrbit';
import { Skills } from '@/components/sections/Skills';
import { Process } from '@/components/sections/Process';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';
import { Cursor } from '@/components/layout/Cursor';
import { PageIntro } from '@/components/layout/PageIntro';

const API_BASE = '/api';

async function fetchData(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
}

export default function Portfolio({ initialData = {}, auth }) {
    const isOwner = !!auth?.user;
    const [introDone, setIntroDone] = useState(false);
    const [data, setData] = useState({
        profile: initialData.profile || null,
        projects: initialData.projects || [],
        skills: initialData.skills || [],
        experiences: initialData.experiences || [],
        educations: initialData.educations || [],
        certificates: initialData.certificates || [],
    });
    const onProfileChange = (profile) => setData((d) => ({ ...d, profile }));
    const [loading, setLoading] = useState(!initialData.profile);
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
            <div className="flex min-h-screen items-center justify-center bg-white font-sans text-[#262626]">
                <p className="text-sm text-[#7b7b7b]">Loading…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 text-center font-sans text-[#262626]">
                <h2 className="text-3xl font-semibold tracking-[-0.02em]">Something went wrong</h2>
                <p className="text-sm text-[#7b7b7b]">{error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">Try again</button>
            </div>
        );
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-white font-sans text-[#262626] antialiased">
                {!introDone && <PageIntro onDone={() => setIntroDone(true)} />}
                <Cursor />
                <Navbar profile={data.profile} />
                <main id="main-content">
                    <Hero profile={data.profile} onProfileChange={onProfileChange} editable={isOwner} />
                    <About profile={data.profile} />
                    <Projects projects={data.projects} />
                    <ImageShowcase projects={data.projects} />
                    <ServiceOrbit />
                    <Skills skills={data.skills} />
                    <Process />
                    <Experience experiences={data.experiences} />
                    <Education educations={data.educations} />
                    <Certificates certificates={data.certificates} />
                    <Contact profile={data.profile} />
                </main>
                <Footer profile={data.profile} />
            </div>
        </ThemeProvider>
    );
}
