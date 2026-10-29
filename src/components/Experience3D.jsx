import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Float, Html, useTexture } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];

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

/* Generador determinista (sin Math.random en render) */
function seeded(i) {
    const x = Math.sin(i * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}

/* Lluvia digital de fondo (glifos cayendo) */
function GlyphTexture() {
    return useMemo(() => {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px monospace';
        const chars = '01{}[]=+<>*/\\|';
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                ctx.fillText(chars[Math.floor(seeded(row * 2 + col) * chars.length)], col * 34, row * 40 + 28);
            }
        }
        return new THREE.CanvasTexture(canvas);
    }, []);
}

function GlyphRain() {
    const ref = useRef();
    const reduced = useReducedMotion();
    const texture = GlyphTexture();

    const { positions, speeds } = useMemo(() => {
        const count = 110;
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (seeded(i) * 2 - 1) * 6;
            positions[i * 3 + 1] = (seeded(i + 50) * 2 - 1) * 5;
            positions[i * 3 + 2] = -5.5 - seeded(i + 100) * 2.5;
            speeds[i] = 0.6 + seeded(i + 200) * 1.4;
        }
        return { positions, speeds };
    }, []);

    useFrame((state, delta) => {
        if (reduced) return;
        const attr = ref.current.geometry.attributes.position;
        for (let i = 0; i < speeds.length; i++) {
            let y = attr.getY(i) - speeds[i] * delta;
            if (y < -5.2) y = 5.2;
            attr.setY(i, y);
        }
        attr.needsUpdate = true;
    });

    return (
        <points ref={ref} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.32} map={texture} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} color="#7dd3fc" sizeAttenuation />
        </points>
    );
}

/* Núcleo de datos: cubo de voxels (puntos) + marco wireframe + nombre */
function DataCube({ name }) {
    const pointsRef = useRef();
    const wire = useRef();
    const reduced = useReducedMotion();

    const lattice = useMemo(() => {
        const n = 6;
        const positions = new Float32Array(n * n * n * 3);
        let idx = 0;
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                for (let z = 0; z < n; z++) {
                    positions[idx++] = (x / (n - 1) - 0.5) * 1.5;
                    positions[idx++] = (y / (n - 1) - 0.5) * 1.5;
                    positions[idx++] = (z / (n - 1) - 0.5) * 1.5;
                }
            }
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        pointsRef.current.rotation.y = time * 0.18;
        pointsRef.current.rotation.x = Math.sin(time * 0.15) * 0.3;
        wire.current.rotation.y = -time * 0.12;
        wire.current.rotation.x = Math.sin(time * 0.1 + 1) * 0.35;
    });

    return (
        <Float speed={reduced ? 0 : 1} rotationIntensity={reduced ? 0 : 0.2} floatIntensity={reduced ? 0 : 0.4}>
            <mesh ref={wire}>
                <boxGeometry args={[1.7, 1.7, 1.7]} />
                <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.25} />
            </mesh>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[lattice, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.06} color="#8b5cf6" transparent opacity={0.95} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>
            <Html center distanceFactor={7} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
                <div
                    className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold tracking-wide backdrop-blur-md"
                    style={{ background: 'rgba(15,10,40,0.6)', color: '#fff', border: '1px solid rgba(139,92,246,0.4)' }}
                >
                    {name}
                </div>
            </Html>
        </Float>
    );
}

/* Flujo de datos entrando al núcleo */
function Stream({ from, to, color, count = 16 }) {
    const refs = useRef([]);
    const reduced = useReducedMotion();

    const curve = useMemo(
        () =>
            new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(from[0], from[1], from[2]),
                new THREE.Vector3((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.9, (from[2] + to[2]) / 2),
                new THREE.Vector3(to[0], to[1], to[2])
            ),
        [from, to]
    );
    const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);

    useFrame((state) => {
        if (reduced) return;
        const t = state.clock.elapsedTime;
        refs.current.forEach((m, i) => {
            if (!m) return;
            const k = (t * 0.16 + offsets[i]) % 1;
            m.position.copy(curve.getPoint(k));
        });
    });

    return (
        <group>
            {offsets.map((_, i) => (
                <mesh key={i} ref={(r) => { refs.current[i] = r; }}>
                    <sphereGeometry args={[0.045, 6, 6]} />
                    <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
            ))}
        </group>
    );
}

/* Panel holográfico de proyecto (cargado de imagen real, sin formas esféricas) */
function ProjectPanel({ index, project, title, t, texture, position }) {
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();
    const color = PALETTE[index % PALETTE.length];

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        const pulse = 1 + Math.sin(time * 1.4 + index * 1.2) * 0.04;
        group.current.scale.setScalar((hovered ? 1.18 : 1) * pulse);
    });

    return (
        <Billboard position={position}>
            <group
                ref={group}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Bisel de cristal */}
                <mesh>
                    <boxGeometry args={[2.05, 1.28, 0.07]} />
                    <meshBasicMaterial color={color} transparent opacity={hovered ? 0.35 : 0.18} depthWrite={false} />
                </mesh>
                {/* Pantalla con la captura del proyecto */}
                <mesh position={[0, 0, 0.05]}>
                    <planeGeometry args={[1.95, 1.18]} />
                    <meshBasicMaterial map={texture} transparent />
                </mesh>
                {/* Halo de borde tras la pantalla */}
                <mesh position={[0, 0, -0.06]}>
                    <planeGeometry args={[2.18, 1.41]} />
                    <meshBasicMaterial color={color} transparent opacity={hovered ? 0.6 : 0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                <Html
                    center
                    distanceFactor={8}
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
        </Billboard>
    );
}

function Scene({ projects, t, dark }) {
    const group = useRef();
    const scroll = useScrollOffset();
    const reduced = useReducedMotion();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        group.current.rotation.y = scroll.current * 0.001 + (reduced ? 0.02 : time * 0.03);
    });

    const positions = useMemo(
        () =>
            projects.map((_, i) => {
                const u = projects.length === 1 ? 0 : (i / (projects.length - 1)) * 2 - 1;
                return [1.9 + Math.abs(u) * 0.55, u * 2.05, u * 1.3];
            }),
        [projects]
    );

    /* Carga las capturas reales de los proyectos como texturas */
    const textures = useTexture(projects.map((p) => '/' + p.image));
    useEffect(() => {
        textures.forEach((tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;
        });
    }, [textures]);

    return (
        <group ref={group}>
            <GlyphRain />
            <DataCube name="Javier Botella Gil" />

            <Stream from={[-5.5, -3, -4]} to={[0, 0, 0]} color="#22d3ee" />
            <Stream from={[-4.5, 3.2, -5]} to={[0, 0, 0]} color="#8b5cf6" />
            <Stream from={[-6, 0.5, -2.5]} to={[0, 0, 0]} color="#6366f1" />

            {projects.map((project, index) => (
                <ProjectPanel
                    key={index}
                    index={index}
                    project={project}
                    title={project.title}
                    t={t}
                    texture={textures[index]}
                    position={positions[index]}
                />
            ))}
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
            camera={{ position: [0.4, 1.4, 9.2], fov: 46 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[dark ? '#0b0817' : '#edf0fb']} />
            <fog attach="fog" args={[dark ? '#0b0817' : '#edf0fb', 12, 26]} />
            <Stars radius={42} depth={22} count={1000} factor={3.4} saturation={0} fade speed={0.5} />
            <Scene projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                enableDamping
                dampingFactor={0.06}
                minDistance={4.5}
                maxDistance={12}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={Math.PI / 1.9}
            />
        </Canvas>
    );
};

export default Experience3D;