import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];
const SCREEN_W = 0.95;
const SCREEN_H = 0.6;
const MONITOR_XS = [-4, -2.4, -0.8, 0.8, 2.4, 4];

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

/* ---- Monitor de proyecto (interactivo) ---- */
function ProjectMonitor({ texture, x, index, featured, title, t }) {
    const group = useRef();
    const [hovered, setHovered] = useState(false);
    const reduced = useReducedMotion();
    const color = PALETTE[index % PALETTE.length];

    useEffect(() => { fitImage(texture, SCREEN_W, SCREEN_H); }, [texture]);

    useFrame((state) => {
        if (reduced) return;
        const time = state.clock.elapsedTime;
        group.current.scale.setScalar((hovered ? 1.08 : 1) * (1 + Math.sin(time * 1.3 + index) * 0.02));
    });

    return (
        <group position={[x, 0, 0]}>
            <group ref={group}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <mesh position={[0, 1.03, -0.18]}>
                    <boxGeometry args={[0.24, 0.05, 0.2]} />
                    <meshStandardMaterial color="#5a5f84" roughness={0.5} metalness={0.5} />
                </mesh>
                <mesh position={[0, 1.17, -0.16]}>
                    <boxGeometry args={[0.06, 0.26, 0.045]} />
                    <meshStandardMaterial color="#4a4f74" roughness={0.4} metalness={0.6} />
                </mesh>
                <mesh position={[0, 1.68, -0.05]}>
                    <boxGeometry args={[SCREEN_W + 0.08, SCREEN_H + 0.08, 0.06]} />
                    <meshStandardMaterial color="#1a1d33" roughness={0.4} metalness={0.6} />
                </mesh>
                <mesh position={[0, 1.68, 0.01]}>
                    <planeGeometry args={[SCREEN_W, SCREEN_H]} />
                    <meshBasicMaterial map={texture} />
                </mesh>
                <mesh position={[0, 1.68, -0.09]}>
                    <planeGeometry args={[SCREEN_W + 0.2, SCREEN_H + 0.2]} />
                    <meshBasicMaterial color={color} transparent opacity={hovered ? 0.55 : 0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                {featured && (
                    <Html center position={[0, SCREEN_H / 2 + 0.26, 0]} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
                        <div className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: '1px solid rgba(139,92,246,0.5)' }}>
                            {t('projects.featured_tag')}
                        </div>
                    </Html>
                )}
                <Html center position={[0, -0.32, 0]} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
                    <div
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{ pointerEvents: 'auto', background: 'rgba(20,22,45,0.8)', color: '#fff', border: `1px solid ${color}88`, cursor: 'pointer' }}
                    >
                        {t(title)}
                    </div>
                </Html>
            </group>
        </group>
    );
}

/* ---- Monitor genérico de las mesas laterales ---- */
function SideMonitor({ rotationY, dark, position }) {
    return (
        <group position={position} rotation={[0, rotationY, 0]}>
            <mesh position={[0, 0.32, -0.16]}>
                <boxGeometry args={[0.2, 0.05, 0.16]} />
                <meshStandardMaterial color="#3a3f5e" roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.44, -0.15]}>
                <boxGeometry args={[0.05, 0.22, 0.04]} />
                <meshStandardMaterial color="#4a4f74" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.72, 0]}>
                <boxGeometry args={[0.66, 0.42, 0.05]} />
                <meshStandardMaterial color="#1a1d33" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.72, 0.02]}>
                <planeGeometry args={[0.6, 0.36]} />
                <meshBasicMaterial color={dark ? '#9fb0ff' : '#c7d2fe'} transparent opacity={0.85} />
            </mesh>
        </group>
    );
}

/* ---- Persona sentada low-poly ---- */
function SeatedPerson({ position, rotationY, shirt, skin, dark }) {
    const body = useRef();
    const reduced = useReducedMotion();

    useFrame((state) => {
        if (reduced) return;
        const t = state.clock.elapsedTime;
        body.current.rotation.z = Math.sin(t * 0.8) * 0.02;
        body.current.position.y = 0 + Math.sin(t * 0.7) * 0.006;
    });

    return (
        <group position={position} rotation={[0, rotationY, 0]}>
            {/* Silla */}
            <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.2, 0.24, 0.07, 12]} />
                <meshStandardMaterial color="#2a2f52" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.03, 0.04, 0.42, 8]} />
                <meshStandardMaterial color="#3a3f5e" roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.58, -0.02]}>
                <boxGeometry args={[0.42, 0.09, 0.44]} />
                <meshStandardMaterial color="#4a4f74" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.92, -0.28]}>
                <boxGeometry args={[0.42, 0.5, 0.08]} />
                <meshStandardMaterial color="#4a4f74" roughness={0.8} />
            </mesh>

            {/* Cuerpo */}
            <group ref={body}>
                <mesh position={[0, 1.02, -0.12]}>
                    <boxGeometry args={[0.34, 0.42, 0.22]} />
                    <meshStandardMaterial color={shirt} roughness={0.85} />
                </mesh>
                <mesh position={[0, 1.42, -0.1]}>
                    <boxGeometry args={[0.18, 0.2, 0.18]} />
                    <meshStandardMaterial color={skin} roughness={0.7} />
                </mesh>
                {/* Brazos apoyados en la mesa */}
                <mesh position={[0.2, 1.14, 0.32]} rotation={[-1.1, 0, 0]}>
                    <boxGeometry args={[0.08, 0.34, 0.1]} />
                    <meshStandardMaterial color={shirt} roughness={0.85} />
                </mesh>
                <mesh position={[-0.2, 1.14, 0.32]} rotation={[-1.1, 0, 0]}>
                    <boxGeometry args={[0.08, 0.34, 0.1]} />
                    <meshStandardMaterial color={shirt} roughness={0.85} />
                </mesh>
                {/* Piernas */}
                <mesh position={[0.09, 0.62, -0.02]}>
                    <boxGeometry args={[0.1, 0.42, 0.14]} />
                    <meshStandardMaterial color={dark ? '#1a1d33' : '#2c3450'} roughness={0.8} />
                </mesh>
                <mesh position={[-0.09, 0.62, -0.02]}>
                    <boxGeometry args={[0.1, 0.42, 0.14]} />
                    <meshStandardMaterial color={dark ? '#1a1d33' : '#2c3450'} roughness={0.8} />
                </mesh>
            </group>
        </group>
    );
}

/* ---- Mesa ---- */
function Desk({ position, width, depth, dark, lightEdge }) {
    const desk = dark ? '#3d4368' : '#f7f9ff';
    const legs = dark ? '#2a2f52' : '#c9d1ea';
    return (
        <group position={position}>
            <mesh position={[0, 0.55, 0]}>
                <boxGeometry args={[width, 0.11, depth]} />
                <meshStandardMaterial color={desk} roughness={0.45} metalness={0.1} />
            </mesh>
            {[-width / 2 + 0.15, width / 2 - 0.15].map((px) => (
                <group key={px}>
                    <mesh position={[px, 0.27, depth / 2 - 0.15]}>
                        <boxGeometry args={[0.12, 0.46, 0.12]} />
                        <meshStandardMaterial color={legs} roughness={0.6} />
                    </mesh>
                    <mesh position={[px, 0.27, -depth / 2 + 0.15]}>
                        <boxGeometry args={[0.12, 0.46, 0.12]} />
                        <meshStandardMaterial color={legs} roughness={0.6} />
                    </mesh>
                </group>
            ))}
            {lightEdge && (
                <mesh position={[0, 0.62, -depth / 2 - 0.02]}>
                    <boxGeometry args={[width, 0.02, 0.02]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.85} blending={THREE.AdditiveBlending} />
                </mesh>
            )}
            {/* Teclado */}
            <mesh position={[0, 0.62, depth / 4]} rotation={[-0.05, 0, 0]}>
                <boxGeometry args={[width * 0.22, 0.03, 0.36]} />
                <meshStandardMaterial color={dark ? '#232746' : '#dfe6fb'} roughness={0.8} />
            </mesh>
        </group>
    );
}

/* ---- Planta ---- */
function Plant({ position, scale = 1 }) {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.14, 0.18, 0.26, 12]} />
                <meshStandardMaterial color="#b3475a" roughness={0.6} />
            </mesh>
            {[
                [0, 0.6, 0, 0, 0.55, 0],
                [-0.16, 0.72, 0.05, -0.3, 0.6, 0.3],
                [0.16, 0.66, -0.05, 0.3, 0.6, -0.3],
            ].map((p, i) => (
                <mesh key={i} position={[p[0], p[1], p[2]]} rotation={[p[3], 0, p[4]]}>
                    <boxGeometry args={[0.1, p[5], 0.02]} />
                    <meshStandardMaterial color="#4ade80" roughness={0.7} />
                </mesh>
            ))}
        </group>
    );
}

/* ---- Estantería con libros ---- */
function Shelf({ dark }) {
    const cols = [0.3, 0.4, 0.24, 0.34, 0.28];
    const bookColors = ['#8b5cf6', '#22d3ee', '#ec4899', '#f59e0b', '#34d399', '#6366f1', '#a855f7', '#38bdf8'];
    return (
        <group position={[-4.2, 0, -3.5]}>
            {[1.5, 1.9, 2.3].map((y) => (
                <group key={y}>
                    <mesh position={[0, y, 0]}>
                        <boxGeometry args={[2.1, 0.05, 0.24]} />
                        <meshStandardMaterial color={dark ? '#3a3f5e' : '#cfd6ec'} roughness={0.6} />
                    </mesh>
                    {cols.map((w, i) => (
                        <mesh key={i} position={[-0.95 + w / 2 + i * 0.42, y + 0.12, 0]}>
                            <boxGeometry args={[w, 0.2, 0.18]} />
                            <meshStandardMaterial color={bookColors[(i + Math.floor(y)) % bookColors.length]} roughness={0.8} />
                        </mesh>
                    ))}
                </group>
            ))}
            <mesh position={[0, 2.6, 0]}>
                <boxGeometry args={[2.1, 0.05, 0.24]} />
                <meshStandardMaterial color={dark ? '#3a3f5e' : '#cfd6ec'} roughness={0.6} />
            </mesh>
        </group>
    );
}

/* ---- Habitación ---- */
function Room({ dark }) {
    const wall = dark ? '#272b4d' : '#eef1f9';
    const wallDark = dark ? '#202440' : '#dfe4f4';
    const floor = dark ? '#1c2038' : '#e6eaf6';

    return (
        <group>
            {/* Suelo */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[14, 9]} />
                <meshStandardMaterial color={floor} roughness={0.85} />
            </mesh>
            {/* Alfombra central */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -0.4]}>
                <circleGeometry args={[3.4, 32]} />
                <meshStandardMaterial color={dark ? '#3a3f5e' : '#d3dbf3'} roughness={1} />
            </mesh>
            {/* Techo */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
                <planeGeometry args={[14, 9]} />
                <meshStandardMaterial color={dark ? '#1c2038' : '#dfe4f4'} roughness={0.95} />
            </mesh>
            {/* Pared trasera */}
            <mesh position={[0, 2, -3.6]}>
                <planeGeometry args={[14, 4]} />
                <meshStandardMaterial color={wall} roughness={0.92} />
            </mesh>
            {/* Pared izquierda */}
            <mesh position={[-6.6, 2, -0.3]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[6.6, 4]} />
                <meshStandardMaterial color={wallDark} roughness={0.92} />
            </mesh>
            {/* Pared derecha */}
            <mesh position={[6.6, 2, -0.3]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[6.6, 4]} />
                <meshStandardMaterial color={wallDark} roughness={0.92} />
            </mesh>

            {/* Ventana con resplandor */}
            <group position={[3.6, 2.1, -3.55]}>
                <mesh>
                    <planeGeometry args={[3, 2.2]} />
                    <meshBasicMaterial color={dark ? '#8fa0e8' : '#bcd0ff'} transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, -1.15, 0.02]}>
                    <boxGeometry args={[2.6, 0.05, 0.05]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
                </mesh>
            </group>

            {/* Luces de techo cálidas */}
            <group>
                <mesh position={[-3.2, 3.94, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[1.6, 2.4]} />
                    <meshBasicMaterial color="#fff7ed" transparent opacity={dark ? 0.4 : 0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                <mesh position={[3.2, 3.94, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[1.6, 2.4]} />
                    <meshBasicMaterial color="#fff7ed" transparent opacity={dark ? 0.4 : 0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
                <mesh position={[0, 3.94, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.2, 4]} />
                    <meshBasicMaterial color="#eef2ff" transparent opacity={dark ? 0.45 : 0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
            </group>

            {/* Faldón de luz tras mesa central */}
            <mesh position={[0, 1.6, -3.4]}>
                <planeGeometry args={[11, 1.6]} />
                <meshBasicMaterial color={dark ? '#8b5cf6' : '#c7d2fe'} transparent opacity={dark ? 0.22 : 0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

/* ---- Escena de oficina ---- */
function OfficeScene({ projects, t, dark }) {
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
            <Shelf dark={dark} />

            {/* Mesa central con los proyectos */}
            <Desk position={[0, 0, -1.3]} width={10.4} depth={1.9} dark={dark} lightEdge />
            <group position={[0, -0.455, 0]}>
                {projects.map((project, index) => (
                    <ProjectMonitor
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

            {/* Mesa izquierda con persona */}
            <Desk position={[-4.7, 0, -0.4]} width={1.9} depth={1} dark={dark} />
            <SideMonitor rotationY={Math.PI / 2} dark={dark} position={[-4.7, 0.27, -0.5]} />
            <SeatedPerson position={[-5.6, 0, -0.4]} rotationY={Math.PI / 2} shirt="#6366f1" skin="#f2c194" dark={dark} />

            {/* Mesa derecha con persona */}
            <Desk position={[4.7, 0, -0.4]} width={1.9} depth={1} dark={dark} />
            <SideMonitor rotationY={-Math.PI / 2} dark={dark} position={[4.7, 0.27, -0.5]} />
            <SeatedPerson position={[5.6, 0, -0.4]} rotationY={-Math.PI / 2} shirt="#22d3ee" skin="#d9a06b" dark={dark} />

            {/* Plantas y extras */}
            <Plant position={[-6.1, 0, -2.9]} scale={1.15} />
            <Plant position={[6.1, 0, -2.7]} scale={0.9} />
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
            camera={{ position: [0, 3, 8.5], fov: 55 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[dark ? '#191c36' : '#dde3f3']} />
            <ambientLight intensity={dark ? 1.5 : 1.7} />
            <directionalLight position={[3, 6, 5]} intensity={dark ? 1.2 : 1.4} />
            <pointLight position={[0, 3.5, -1]} intensity={dark ? 0.9 : 0.6} color="#c7d2fe" />
            <pointLight position={[-4, 2, 2]} intensity={0.5} color="#22d3ee" />
            <OfficeScene projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
                enableDamping
                dampingFactor={0.06}
                target={[0, 1.5, -0.6]}
                minDistance={5}
                maxDistance={13}
                minPolarAngle={0.7}
                maxPolarAngle={1.4}
            />
        </Canvas>
    );
};

export default Experience3D;