import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles, Html } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];
const ORBIT_RADIUS = 3.6;

function useReducedMotion() {
    return useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);
}

function useScrollOffset() {
    const ref = useRef(0);
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => { ref.current = window.scrollY; });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);
    return ref;
}

function Planet({ index, total, title, t }) {
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();

    const angle = (index / total) * Math.PI * 2;
    const color = PALETTE[index % PALETTE.length];

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (!reduced) {
            group.current.position.y = Math.sin(time * 0.7 + index * 1.7) * 0.3;
        }
        group.current.rotation.z = time * 0.2 + index;
    });

    return (
        <group position={[Math.cos(angle) * ORBIT_RADIUS, 0, Math.sin(angle) * ORBIT_RADIUS]}>
            <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh scale={hovered ? 0.72 : 0.55}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial color={color} roughness={0.35} metalness={0.55} flatShading emissive={color} emissiveIntensity={hovered ? 0.8 : 0.35} />
                </mesh>
                <mesh>
                    <sphereGeometry args={[1, 10, 10]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
                </mesh>
                <Html
                    center
                    distanceFactor={9}
                    zIndexRange={[40, 0]}
                    style={{ pointerEvents: 'none' }}
                >
                    <div
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{ pointerEvents: 'auto', background: 'rgba(15,10,40,0.65)', color: '#fff', border: `1px solid ${color}55`, cursor: 'pointer' }}
                    >
                        {t(title)}
                    </div>
                </Html>
            </group>
        </group>
    );
}

function Core({ name }) {
    const inner = useRef();
    const wire = useRef();
    const reduced = useReducedMotion();

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        inner.current.rotation.x = time * 0.22;
        inner.current.rotation.y = time * 0.28;
        wire.current.rotation.x = -time * 0.12;
        wire.current.rotation.y = -time * 0.18;
    });

    return (
        <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.5} floatIntensity={reduced ? 0 : 0.7}>
            <group>
                <mesh ref={inner}>
                    <icosahedronGeometry args={[1.15, 1]} />
                    <meshStandardMaterial color="#8b5cf6" roughness={0.25} metalness={0.6} flatShading emissive="#8b5cf6" emissiveIntensity={0.45} />
                </mesh>
                <mesh ref={wire}>
                    <icosahedronGeometry args={[1.55, 1]} />
                    <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
                </mesh>
                <Sparkles count={50} scale={7} size={1.6} speed={0.4} opacity={0.5} color="#a5b4fc" />
                <Html center distanceFactor={7} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
                    <div
                        className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold tracking-wide backdrop-blur-md"
                        style={{ background: 'rgba(15,10,40,0.6)', color: '#fff', border: '1px solid rgba(139,92,246,0.4)' }}
                    >
                        {name}
                    </div>
                </Html>
            </group>
        </Float>
    );
}

function Scene({ projects, t, dark }) {
    const group = useRef();
    const scroll = useScrollOffset();
    const reduced = useReducedMotion();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        group.current.rotation.y = scroll.current * 0.0012 + (reduced ? 0.03 : time * 0.08);
    });

    const renderPlanet = (project, index) => (
        <Planet key={index} index={index} total={projects.length} title={project.title} t={t} />
    );

    return (
        <group ref={group}>
            <Core name="Javier Botella Gil" />
            {/* Órbita */}
            <mesh rotation={[Math.PI / 2.15, 0, 0]}>
                <torusGeometry args={[ORBIT_RADIUS, 0.015, 8, 96]} />
                <meshBasicMaterial color={dark ? '#8b5cf6' : '#6366f1'} transparent opacity={0.45} />
            </mesh>
            {projects.map(renderPlanet)}
        </group>
    );
}

const Experience3D = ({ projects, t }) => {
    const { theme } = useTheme();
    const dark = theme === 'dark';

    return (
        <Canvas
            flat
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            camera={{ position: [0, 1.3, 9.5], fov: 45 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[dark ? '#0b0817' : '#edf0fb']} />
            <fog attach="fog" args={[dark ? '#0b0817' : '#edf0fb', 13, 30]} />
            <ambientLight intensity={0.85} />
            <pointLight position={[6, 5, 6]} intensity={1.4} color="#8b5cf6" />
            <pointLight position={[-6, -3, -4]} intensity={1.1} color="#22d3ee" />
            <Stars radius={42} depth={22} count={1200} factor={3.4} saturation={0} fade speed={0.6} />
            <Scene projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.7}
                enableDamping
                dampingFactor={0.06}
                minDistance={5}
                maxDistance={13}
                minPolarAngle={Math.PI / 3.4}
                maxPolarAngle={Math.PI / 1.8}
            />
        </Canvas>
    );
};

export default Experience3D;