import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles, Html } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];
const HIDDEN_COUNT = 4;

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

/* Neurona de entrada = proyecto (etiqueta + clic → proyectos) */
function ProjectNode({ index, title, t, position }) {
    const inner = useRef();
    const material = useRef();
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();
    const color = PALETTE[index % PALETTE.length];

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        const pulse = 1 + Math.sin(time * 1.6 + index * 1.3) * 0.12;
        inner.current.scale.setScalar(hovered ? 1.35 * pulse : pulse);
        if (material.current) {
            material.current.emissiveIntensity = hovered ? 1.1 : 0.55 + Math.sin(time * 1.8 + index) * 0.2;
            material.current.opacity = 0.85 + Math.sin(time * 1.9 + index) * 0.15;
        }
    });

    return (
        <group position={position}>
            <group
                ref={inner}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <mesh>
                    <sphereGeometry args={[0.32, 20, 20]} />
                    <meshStandardMaterial
                        ref={material}
                        color={color}
                        roughness={0.3}
                        metalness={0.5}
                        transparent
                        emissive={color}
                        emissiveIntensity={0.6}
                    />
                </mesh>
                <mesh>
                    <sphereGeometry args={[0.46, 8, 8]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
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

/* Neurona oculta (decorativa) */
function HiddenNode({ position }) {
    const ref = useRef();
    const reduced = useReducedMotion();

    useFrame((state) => {
        if (reduced) return;
        const t = state.clock.elapsedTime;
        ref.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.12);
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.17, 12, 12]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.5} transparent opacity={0.7} emissive="#8b5cf6" emissiveIntensity={0.5} />
        </mesh>
    );
}

/* Pulsos de datos viajando por las sinapsis */
function Pulses({ edges, reduced }) {
    const refs = useRef([]);
    const packets = useMemo(
        () =>
            edges.map((e, i) => ({
                from: new THREE.Vector3(e[0], e[1], e[2]),
                to: new THREE.Vector3(e[3], e[4], e[5]),
                offset: (i * 0.618033988749895) % 1,
                speed: 0.6 + ((i * 7) % 10) * 0.05,
            })),
        [edges]
    );

    useFrame((state) => {
        if (reduced) return;
        const t = state.clock.elapsedTime;
        refs.current.forEach((mesh, i) => {
            if (!mesh) return;
            const p = packets[i];
            const k = (t * p.speed + p.offset) % 1;
            mesh.position.lerpVectors(p.from, p.to, k);
        });
    });

    return packets.map((p, i) => (
        <mesh key={i} ref={(r) => { refs.current[i] = r; }}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
    ));
}

/* Neurona de salida: núcleo con tu nombre */
function OutputNeuron({ name }) {
    const inner = useRef();
    const wire = useRef();
    const halo = useRef();
    const reduced = useReducedMotion();
    const haloPoints = useSpherePoints(60, 1.8);

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
        <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.5}>
            <group>
                <mesh ref={inner}>
                    <icosahedronGeometry args={[1.0, 1]} />
                    <meshStandardMaterial color="#8b5cf6" roughness={0.25} metalness={0.6} flatShading emissive="#8b5cf6" emissiveIntensity={0.5} />
                </mesh>
                <mesh ref={wire}>
                    <icosahedronGeometry args={[1.38, 1]} />
                    <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
                </mesh>
                <points ref={halo}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[haloPoints, 3]} />
                    </bufferGeometry>
                    <pointsMaterial size={0.035} color="#a5b4fc" transparent opacity={0.4} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
                </points>
                <Sparkles count={42} scale={6} size={1.6} speed={0.4} opacity={0.5} color="#a5b4fc" />
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
        group.current.rotation.y = scroll.current * 0.0012 + (reduced ? 0.03 : time * 0.06);
    });

    const { inputs, hidden, edges } = useMemo(() => {
        const INPUTS = projects.map((_, i) => {
            const u = projects.length === 1 ? 0 : (i / (projects.length - 1)) * 2 - 1;
            return [2.25 + u * 0.55, u * 2.0, -u * 1.35];
        });
        const HIDDEN = [
            [1.15, 1.05, 0.35],
            [1.35, 0.35, -0.5],
            [1.15, -0.35, 0.25],
            [1.35, -1.05, -0.5],
        ];
        const edges = [];
        INPUTS.forEach((p, i) => {
            edges.push([...p, ...HIDDEN[i % HIDDEN_COUNT]]);
            edges.push([...p, ...HIDDEN[(i + 2) % HIDDEN_COUNT]]);
        });
        HIDDEN.forEach((p) => edges.push([...p, 0, 0, 0]));
        return { inputs: INPUTS, hidden: HIDDEN, edges };
    }, [projects]);

    /* Conexiones como líneas (vertex colors por tramo) */
    const connections = useMemo(() => {
        const inputHidden = projects.length * 2;
        const positions = new Float32Array(edges.length * 6);
        const colors = new Float32Array(edges.length * 6);
        edges.forEach((e, i) => {
            positions.set(e, i * 6);
            const isFinal = i >= inputHidden;
            const c = isFinal ? [0.13, 0.83, 0.93] : [0.55, 0.36, 0.96];
            colors[i * 6] = c[0]; colors[i * 6 + 1] = c[1]; colors[i * 6 + 2] = c[2];
            colors[i * 6 + 3] = c[0]; colors[i * 6 + 4] = c[1]; colors[i * 6 + 5] = c[2];
        });
        return { positions, colors };
    }, [edges, projects.length]);

    return (
        <group ref={group}>
            <OutputNeuron name="Javier Botella Gil" />

            {/* Sinapsis */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[connections.positions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[connections.colors, 3]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.45} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>

            {/* Flujo de datos por las conexiones */}
            <Pulses edges={edges} reduced={reduced} />

            {/* Capa de entrada */}
            {projects.map((project, index) => (
                <ProjectNode key={index} index={index} title={project.title} t={t} position={inputs[index]} />
            ))}

            {/* Capa oculta */}
            {hidden.map((pos, index) => (
                <HiddenNode key={index} position={pos} />
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
            camera={{ position: [0.4, 1.3, 9.2], fov: 46 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[dark ? '#0b0817' : '#edf0fb']} />
            <fog attach="fog" args={[dark ? '#0b0817' : '#edf0fb', 12, 26]} />
            <ambientLight intensity={0.9} />
            <pointLight position={[6, 5, 6]} intensity={1.4} color="#8b5cf6" />
            <pointLight position={[-6, -3, -4]} intensity={1.1} color="#22d3ee" />
            <Stars radius={42} depth={22} count={1100} factor={3.4} saturation={0} fade speed={0.6} />
            <Scene projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.6}
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