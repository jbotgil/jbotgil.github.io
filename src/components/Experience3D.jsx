import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];
const SCREEN_W = 1.1;
const SCREEN_H = 0.69;
const MONITOR_XS = [-2.8, -1.68, -0.56, 0.56, 1.68, 2.8];

function useReducedMotion() {
    return useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);
}

/* Ajusta la textura a la pantalla con recorte (cover) para no deformarla */
function fitImage(texture, planeW, planeH) {
    const img = texture && texture.image;
    if (!img || !img.width) return;
    const sx = planeW / img.width;
    const sy = planeH / img.height;
    const scale = Math.max(sx, sy);
    texture.repeat.set(sx / scale, sy / scale);
    texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);
    texture.needsUpdate = true;
}

/* Monitor que muestra un proyecto */
function Monitor({ texture, x, index, featured, title, t }) {
    const screen = useRef();
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();
    const color = PALETTE[index % PALETTE.length];

    useEffect(() => { fitImage(texture, SCREEN_W, SCREEN_H); }, [texture]);

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        const pulse = 1 + Math.sin(time * 1.3 + index) * 0.03;
        screen.current.scale.setScalar((hovered ? 1.07 : 1) * pulse);
    });

    return (
        <group position={[x, 0, 0]}>
            <group
                ref={screen}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Base + soporte */}
                <mesh position={[0, 1.06, -0.18]}>
                    <boxGeometry args={[0.28, 0.05, 0.22]} />
                    <meshStandardMaterial color="#0c0c16" roughness={0.6} metalness={0.4} />
                </mesh>
                <mesh position={[0, 1.21, -0.16]}>
                    <boxGeometry args={[0.07, 0.28, 0.05]} />
                    <meshStandardMaterial color="#101020" roughness={0.5} metalness={0.5} />
                </mesh>
                {/* Marco */}
                <mesh position={[0, 1.75, -0.05]}>
                    <boxGeometry args={[SCREEN_W + 0.07, SCREEN_H + 0.07, 0.06]} />
                    <meshStandardMaterial color="#090910" roughness={0.4} metalness={0.6} />
                </mesh>
                {/* Pantalla */}
                <mesh position={[0, 1.75, 0.01]}>
                    <planeGeometry args={[SCREEN_W, SCREEN_H]} />
                    <meshBasicMaterial map={texture} toneMapped={false} />
                </mesh>
                {/* Halo de borde trasero */}
                <mesh position={[0, 1.75, -0.09]}>
                    <planeGeometry args={[SCREEN_W + 0.18, SCREEN_H + 0.18]} />
                    <meshBasicMaterial color={color} transparent opacity={hovered ? 0.5 : 0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                {featured && (
                    <Html center position={[0, SCREEN_H / 2 + 0.24, 0]} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
                        <div className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: '1px solid rgba(139,92,246,0.5)' }}>
                            {t('projects.featured_tag')}
                        </div>
                    </Html>
                )}
                <Html center position={[0, -0.28, 0]} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
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

function Room({ dark }) {
    const wall = dark ? '#0d0b1a' : '#dfe4f4';
    const floor = dark ? '#12101f' : '#e9ecf8';
    const trim = dark ? '#17152a' : '#c9d1ea';

    return (
        <group>
            {/* Suelo */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[11, 7]} />
                <meshStandardMaterial color={floor} roughness={0.9} />
            </mesh>
            {/* Pared trasera */}
            <mesh position={[0, 1.9, -3]}>
                <planeGeometry args={[11, 3.8]} />
                <meshStandardMaterial color={wall} roughness={0.95} />
            </mesh>
            {/* Paredes laterales */}
            <mesh position={[-5.5, 1.9, -0.2]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[5.6, 3.8]} />
                <meshStandardMaterial color={wall} roughness={0.95} />
            </mesh>
            <mesh position={[5.5, 1.9, -0.2]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[5.6, 3.8]} />
                <meshStandardMaterial color={wall} roughness={0.95} />
            </mesh>
            {/* Rodapié luminoso */}
            <mesh position={[0, 0.03, -2.95]} rotation={[0, 0, 0]}>
                <boxGeometry args={[11, 0.06, 0.02]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.7} />
            </mesh>
            {/* Franjas neón en la pared */}
            <mesh position={[-3.4, 3.4, -2.97]}>
                <boxGeometry args={[3.2, 0.03, 0.02]} />
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh position={[3.4, 3.4, -2.97]}>
                <boxGeometry args={[3.2, 0.03, 0.02]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
            </mesh>
            {/* Panel de luz tras los monitores */}
            <mesh position={[0, 3.55, -2.96]}>
                <boxGeometry args={[7.4, 0.06, 0.02]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
            </mesh>
            {/* Mesa */}
            <mesh position={[0, 1.05, -1.55]}>
                <boxGeometry args={[7.6, 0.12, 1.9]} />
                <meshStandardMaterial color={trim} roughness={0.6} />
            </mesh>
            {/* Patas */}
            {[-3.55, 3.55].map((px) => (
                <group key={px}>
                    <mesh position={[px, 0.5, -0.62]}>
                        <boxGeometry args={[0.12, 1, 0.12]} />
                        <meshStandardMaterial color="#181830" roughness={0.6} />
                    </mesh>
                    <mesh position={[px, 0.5, -2.35]}>
                        <boxGeometry args={[0.12, 1, 0.12]} />
                        <meshStandardMaterial color="#181830" roughness={0.6} />
                    </mesh>
                </group>
            ))}
            {/* Canto de mesa con línea de luz */}
            <mesh position={[0, 1.12, -2.46]}>
                <boxGeometry args={[7.6, 0.02, 0.02]} />
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
            </mesh>
            {/* Teclado */}
            <mesh position={[0, 1.13, -0.55]} rotation={[-0.05, 0, 0]}>
                <boxGeometry args={[1.5, 0.03, 0.38]} />
                <meshStandardMaterial color="#191a2e" roughness={0.8} />
            </mesh>
        </group>
    );
}

/* Lámpara de escritorio */
function DeskLamp() {
    return (
        <group position={[4.4, 0, -2.3]}>
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.12, 0.16, 0.06, 12]} />
                <meshStandardMaterial color="#222238" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.98, 8]} />
                <meshStandardMaterial color="#2a2a44" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.12, 0.12]} rotation={[0.4, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
                <meshStandardMaterial color="#2a2a44" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.45, 0.55]} rotation={[-0.5, 0, 0]}>
                <coneGeometry args={[0.22, 0.26, 14, 1, true]} />
                <meshStandardMaterial color="#2a2a44" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 1.36, 0.72]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshBasicMaterial color="#fef3c7" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

/* Taza de café */
function Mug() {
    return (
        <group position={[-4.35, 0, -2.2]}>
            <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.09, 0.08, 0.18, 14]} />
                <meshStandardMaterial color="#0f1022" roughness={0.4} metalness={0.3} />
            </mesh>
            <mesh position={[0.1, 1.2, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.045, 0.02, 8, 12]} />
                <meshStandardMaterial color="#0f1022" roughness={0.4} metalness={0.3} />
            </mesh>
        </group>
    );
}

/* Silla de oficina (silueta) */
function Chair() {
    return (
        <group position={[-2.4, 0, 1.6]} rotation={[0, 0.5, 0]}>
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.2, 0.26, 0.6, 10]} />
                <meshStandardMaterial color="#1a1b30" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.66, -0.05]}>
                <boxGeometry args={[0.7, 0.08, 0.66]} />
                <meshStandardMaterial color="#232440" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.95, -0.36]}>
                <boxGeometry args={[0.66, 0.62, 0.09]} />
                <meshStandardMaterial color="#232440" roughness={0.8} />
            </mesh>
        </group>
    );
}

function OfficeScene({ projects, t, dark }) {
    /* Carga las capturas reales de los proyectos */
    const textures = useTexture(projects.map((p) => '/' + p.image));
    useEffect(() => {
        textures.forEach((tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;
        });
    }, [textures]);

    return (
        <group>
            <Room dark={dark} />
            <DeskLamp />
            <Mug />
            <Chair />
            {projects.map((project, index) => (
                <Monitor
                    key={index}
                    texture={textures[index]}
                    x={MONITOR_XS[index % MONITOR_XS.length]}
                    index={index}
                    featured={!!project.featured}
                    title={project.title}
                    t={t}
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
            camera={{ position: [0, 2.4, 8], fov: 50 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[dark ? '#0b0817' : '#e6eaf8']} />
            <ambientLight intensity={1.0} />
            <pointLight position={[4, 5, 4]} intensity={1.1} color="#a5b4fc" />
            <pointLight position={[-4, 4, -2]} intensity={0.8} color="#22d3ee" />
            <OfficeScene projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                enableDamping
                dampingFactor={0.06}
                target={[0, 1.5, -0.8]}
                minDistance={4}
                maxDistance={12}
                minPolarAngle={0.7}
                maxPolarAngle={1.45}
            />
        </Canvas>
    );
};

export default Experience3D;