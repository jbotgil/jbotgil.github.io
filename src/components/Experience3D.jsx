import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles, Html } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];
const ORBIT_RADIUS = 3.1;
const POINTS_PER_ORB = 150;

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

function hexToVec3(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function orbBaseY(index) {
    return index % 3 === 0 ? 0.55 : index % 3 === 1 ? -0.55 : 0;
}

/* Nube de puntos en esfera (distribución de Fibonacci) */
function useSpherePoints(count, radius) {
    return useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = Math.PI * i * 0.618033988749895;
            positions[i * 3] = Math.cos(theta) * r * radius;
            positions[i * 3 + 1] = y * radius;
            positions[i * 3 + 2] = Math.sin(theta) * r * radius;
        }
        return positions;
    }, [count, radius]);
}

/* Proyecto = "astro de datos": nube de puntos + sombra wireframe + etiqueta */
function DataOrb({ index, total, title, t }) {
    const group = useRef();
    const core = useRef();
    const halo = useRef();
    const material = useRef();
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();

    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * ORBIT_RADIUS;
    const z = Math.sin(angle) * ORBIT_RADIUS;
    const color = PALETTE[index % PALETTE.length];
    const points = useSpherePoints(POINTS_PER_ORB, 0.62);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (reduced) return;
        core.current.rotation.x = time * 0.25 + index;
        core.current.rotation.y = time * 0.35 + index;
        halo.current.rotation.y = -time * 0.3;
        const pulse = 1 + Math.sin(time * 1.5 + index * 1.3) * 0.08;
        core.current.scale.setScalar(hovered ? 1.25 * pulse : pulse);
        if (material.current) {
            material.current.size = 0.09 * (1 + Math.sin(time * 2.2 + index) * 0.25);
            material.current.opacity = 0.7 + Math.sin(time * 2 + index) * 0.25;
        }
    });

    return (
        <group position={[x, orbBaseY(index), z]}>
            <group
                ref={core}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Nube de puntos (los "datos") */}
                <points frustumCulled={false}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[points, 3]} />
                    </bufferGeometry>
                    <pointsMaterial
                        ref={material}
                        size={0.09}
                        color={color}
                        transparent
                        depthWrite={false}
                        sizeAttenuation
                        blending={THREE.AdditiveBlending}
                    />
                </points>
                {/* Sombra de forma */}
                <mesh scale={1.1}>
                    <icosahedronGeometry args={[0.6, 1]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
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

            {/* Aro halo sutil */}
            <mesh ref={halo} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.9, 0.012, 6, 48]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} />
            </mesh>
        </group>
    );
}

/* Núcleo central = "hub neuronal" */
function Core({ name }) {
    const inner = useRef();
    const wire = useRef();
    const halo = useRef();
    const reduced = useReducedMotion();
    const haloPoints = useSpherePoints(70, 1.9);

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        inner.current.rotation.x = time * 0.22;
        inner.current.rotation.y = time * 0.28;
        wire.current.rotation.x = -time * 0.12;
        wire.current.rotation.y = -time * 0.18;
        halo.current.rotation.y = time * 0.1;
    });

    return (
        <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.55}>
            <group>
                <mesh ref={inner}>
                    <icosahedronGeometry args={[1.05, 1]} />
                    <meshStandardMaterial color="#8b5cf6" roughness={0.25} metalness={0.6} flatShading emissive="#8b5cf6" emissiveIntensity={0.45} />
                </mesh>
                <mesh ref={wire}>
                    <icosahedronGeometry args={[1.42, 1]} />
                    <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
                </mesh>
                {/* Halo de datos alrededor del núcleo */}
                <points ref={halo}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[haloPoints, 3]} />
                    </bufferGeometry>
                    <pointsMaterial size={0.035} color="#a5b4fc" transparent opacity={0.45} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
                </points>
                <Sparkles count={46} scale={6.5} size={1.6} speed={0.4} opacity={0.5} color="#a5b4fc" />
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

    /* Conexiones núcleo → orbes (líneas tipo red neuronal) */
    const beams = useMemo(() => {
        const positions = new Float32Array(projects.length * 6);
        const colors = new Float32Array(projects.length * 6);
        projects.forEach((_, index) => {
            const a = (index / projects.length) * Math.PI * 2;
            const x = Math.cos(a) * ORBIT_RADIUS;
            const z = Math.sin(a) * ORBIT_RADIUS;
            const y = orbBaseY(index);
            positions[index * 6] = 0; positions[index * 6 + 1] = 0; positions[index * 6 + 2] = 0;
            positions[index * 6 + 3] = x; positions[index * 6 + 4] = y; positions[index * 6 + 5] = z;
            const c = hexToVec3(PALETTE[index % PALETTE.length]);
            colors[index * 6] = c[0]; colors[index * 6 + 1] = c[1]; colors[index * 6 + 2] = c[2];
            colors[index * 6 + 3] = c[0]; colors[index * 6 + 4] = c[1]; colors[index * 6 + 5] = c[2];
        });
        return { positions, colors };
    }, [projects]);

    return (
        <group ref={group}>
            <Core name="Javier Botella Gil" />

            {/* Conexiones nodo → nodo */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[beams.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[beams.colors, 3]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>

            {/* Anillo de órbita tenue */}
            <mesh rotation={[Math.PI / 2.15, 0, 0]}>
                <torusGeometry args={[ORBIT_RADIUS, 0.01, 6, 96]} />
                <meshBasicMaterial color={dark ? '#8b5cf6' : '#6366f1'} transparent opacity={0.3} />
            </mesh>

            {projects.map((project, index) => (
                <DataOrb key={index} index={index} total={projects.length} title={project.title} t={t} />
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
            camera={{ position: [2.4, 1.3, 9.5], fov: 46 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[dark ? '#0b0817' : '#edf0fb']} />
            <fog attach="fog" args={[dark ? '#0b0817' : '#edf0fb', 12, 27]} />
            <ambientLight intensity={0.85} />
            <pointLight position={[6, 5, 6]} intensity={1.4} color="#8b5cf6" />
            <pointLight position={[-6, -3, -4]} intensity={1.1} color="#22d3ee" />
            <Stars radius={42} depth={22} count={1100} factor={3.4} saturation={0} fade speed={0.6} />
            <Scene projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.7}
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