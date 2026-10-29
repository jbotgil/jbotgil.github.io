import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture, RoundedBox, SoftShadows } from '@react-three/drei';
import { useTheme } from '../theme';

const PALETTE = ['#8b5cf6', '#6366f1', '#22d3ee', '#ec4899', '#a855f7', '#38bdf8', '#a78bfa', '#f472b6'];
const SLIDE_DURATION = 4;
const SLIDE_FADE = 0.9;

function useReducedMotion() {
    return useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);
}

function smoothstep(a, b, x) {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
}

/* ---- Texturas pintadas proceduralmente ---- */
function makeWoodTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#5b4c3c';
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i <= 10; i++) {
        g.strokeStyle = 'rgba(28,20,12,0.35)';
        g.lineWidth = 2;
        g.beginPath();
        g.moveTo(i * 25.6, 0);
        g.lineTo(i * 25.6, 256);
        g.stroke();
    }
    for (let i = 0; i < 90; i++) {
        g.fillStyle = `rgba(20,12,6,${0.03 + (i % 5) * 0.015})`;
        g.fillRect((i * 61) % 256, (i * 97) % 256, 4, 42);
        g.fillStyle = `rgba(255,240,220,${0.015 + (i % 3) * 0.012})`;
        g.fillRect((i * 131) % 256, (i * 53) % 256, 3, 34);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(7, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

function makeCarpetTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(128, 128, 10, 128, 128, 124);
    grad.addColorStop(0, '#3d4a78');
    grad.addColorStop(0.6, '#2c3558');
    grad.addColorStop(1, '#232b49');
    g.fillStyle = grad;
    g.beginPath();
    g.arc(128, 128, 124, 0, Math.PI * 2);
    g.fill();
    for (let i = 0; i < 26; i++) {
        g.strokeStyle = `rgba(150,170,230,${0.12})`;
        g.beginPath();
        g.arc(128, 128, 18 + i * 4, 0, Math.PI * 2);
        g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

function makeCityTexture() {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    const g = c.getContext('2d');
    g.fillStyle = '#0a0d1f';
    g.fillRect(0, 0, 256, 128);
    for (let i = 0; i < 80; i++) {
        g.fillStyle = i % 9 === 0 ? '#ffd9a0' : 'rgba(180,200,255,0.7)';
        const x = (i * 31) % 250;
        const y = (i * 7) % 120;
        g.fillRect(x, y, 3, 2);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

/* ---- Pantalla que va pasando los proyectos ---- */
function ProjectSlideshow({ textures, titleKey, t, colors, name }) {
    const matA = useRef();
    const matB = useRef();
    const label = useRef();

    useEffect(() => {
        matA.current.map = textures[0] || null;
        matB.current.map = textures[1] || null;
    }, [textures]);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const total = textures.length;
        if (!total) return;
        const idx = Math.floor(time / SLIDE_DURATION) % total;
        const next = (idx + 1) % total;
        const local = time % SLIDE_DURATION;
        const fade = smoothstep(SLIDE_DURATION - SLIDE_FADE, SLIDE_DURATION, local);
        if (matA.current && matB.current) {
            matA.current.map = textures[idx];
            matB.current.map = textures[next];
            matA.current.opacity = 1 - fade;
            matB.current.opacity = fade;
        }
        if (label.current) {
            label.current.textContent = t(titleKey[idx]);
            label.current.style.borderColor = `${colors[idx]}88`;
        }
    });

    return (
        <group>
            <mesh>
                <planeGeometry args={[1.7, 1.05]} />
                <meshBasicMaterial ref={matA} transparent toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, 0.002]}>
                <planeGeometry args={[1.7, 1.05]} />
                <meshBasicMaterial ref={matB} transparent toneMapped={false} opacity={0} />
            </mesh>
            <Html center position={[0, -0.85, 0]} zIndexRange={[40, 0]} style={{ pointerEvents: 'none' }}>
                <div ref={label}
                    className="whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md"
                    style={{ background: 'rgba(12,14,30,0.72)', color: '#fff', border: '1px solid #8b5cf688' }}
                >
                    {name}
                </div>
            </Html>
        </group>
    );
}

/* ---- Monitor con la presentación ---- */
function BigMonitor({ position, ...slides }) {
    return (
        <group position={position}>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.17, 0.21, 0.06, 18]} />
                <meshStandardMaterial color="#14151f" roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.035, 0.05, 0.56, 12]} />
                <meshStandardMaterial color="#1d1e2c" roughness={0.4} metalness={0.6} />
            </mesh>
            <RoundedBox args={[1.92, 1.24, 0.09]} radius={0.05} smoothness={3} position={[0, 0.62, 0]}>
                <meshStandardMaterial color="#0b0c14" roughness={0.35} metalness={0.7} />
            </RoundedBox>
            <group position={[0, 0.62, 0.05]}>
                <ProjectSlideshow {...slides} />
            </group>
        </group>
    );
}

/* ---- Persona de noche (silueta orgánica) ---- */
function NightCoder({ dark }) {
    const body = useRef();
    const armL = useRef();
    const armR = useRef();
    const reduced = useReducedMotion();

    useFrame((state) => {
        if (reduced) return;
        const t = state.clock.elapsedTime;
        body.current.position.y = Math.sin(t * 0.6) * 0.008;
        const tip = Math.sin(t * 7) * 0.05 + 0.06;
        armL.current.rotation.x = 0.9 + tip;
        armR.current.rotation.x = 0.9 - tip;
    });

    const cloth = dark ? '#23263f' : '#2c3450';
    const skin = '#d0a37b';

    return (
        <group position={[0, 0, 0.28]} rotation={[0, Math.PI, 0]}>
            {/* Silla */}
            <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.22, 0.28, 0.08, 18]} />
                <meshStandardMaterial color="#15161f" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.035, 0.04, 0.42, 12]} />
                <meshStandardMaterial color="#26273a" roughness={0.5} metalness={0.5} />
            </mesh>
            <RoundedBox args={[0.46, 0.1, 0.46]} radius={0.04} smoothness={3} position={[0, 0.8, 0]}>
                <meshStandardMaterial color={dark ? '#1b1d30' : '#3a4060'} roughness={0.85} />
            </RoundedBox>
            <RoundedBox args={[0.44, 0.62, 0.1]} radius={0.045} smoothness={3} position={[0, 1.32, -0.28]} rotation={[-0.15, 0, 0]}>
                <meshStandardMaterial color={dark ? '#1b1d30' : '#3a4060'} roughness={0.85} />
            </RoundedBox>

            {/* Cuerpo */}
            <group ref={body}>
                <mesh position={[0, 1.25, 0.02]}>
                    <capsuleGeometry args={[0.17, 0.5, 4, 12]} />
                    <meshStandardMaterial color={cloth} roughness={0.8} />
                </mesh>
                <mesh position={[0, 1.82, 0.02]}>
                    <sphereGeometry args={[0.14, 20, 20]} />
                    <meshStandardMaterial color={skin} roughness={0.7} />
                </mesh>
                {/* Brazo izquierdo (tecleando) */}
                <mesh ref={armL} position={[-0.24, 1.42, 0.02]} rotation={[0.9, 0, 0.2]}>
                    <capsuleGeometry args={[0.055, 0.4, 4, 10]} />
                    <meshStandardMaterial color={cloth} roughness={0.8} />
                </mesh>
                {/* Brazo derecho (tecleando) */}
                <mesh ref={armR} position={[0.24, 1.42, 0.02]} rotation={[0.9, 0, -0.2]}>
                    <capsuleGeometry args={[0.055, 0.4, 4, 10]} />
                    <meshStandardMaterial color={cloth} roughness={0.8} />
                </mesh>
                {/* Piernas */}
                <mesh position={[0.11, 0.72, 0.02]}>
                    <capsuleGeometry args={[0.07, 0.42, 4, 10]} />
                    <meshStandardMaterial color={dark ? '#1a1c2e' : '#2c3350'} roughness={0.85} />
                </mesh>
                <mesh position={[-0.11, 0.72, 0.02]}>
                    <capsuleGeometry args={[0.07, 0.42, 4, 10]} />
                    <meshStandardMaterial color={dark ? '#1a1c2e' : '#2c3350'} roughness={0.85} />
                </mesh>
            </group>
        </group>
    );
}

/* ---- Lámpara de escritorio con luz real ---- */
function DeskLamp({ dark }) {
    const lightRef = useRef();
    return (
        <group position={[0, 0, 0]}>
            <RoundedBox args={[0.42, 0.06, 0.3]} radius={0.02} smoothness={2} position={[0, 0.03, 0]}>
                <meshStandardMaterial color="#1c1d2b" roughness={0.4} metalness={0.5} />
            </RoundedBox>
            <mesh position={[0, 0.5, 0]} rotation={[0.15, 0, 0]}>
                <cylinderGeometry args={[0.018, 0.022, 0.9, 10]} />
                <meshStandardMaterial color="#33354c" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.98, 0.18]} rotation={[-0.7, 0, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.5, 10]} />
                <meshStandardMaterial color="#33354c" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 1.18, 0.62]} rotation={[-1, 0, 0]}>
                <coneGeometry args={[0.18, 0.24, 20, 1, true]} />
                <meshStandardMaterial color="#2a2b40" roughness={0.4} metalness={0.6} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 1.1, 0.72]}>
                <sphereGeometry args={[0.09, 14, 14]} />
                <meshStandardMaterial emissive="#ffd9a0" emissiveIntensity={3} color="#1a160a" />
            </mesh>
            <pointLight ref={lightRef} position={[0, 1.05, 0.85]} intensity={dark ? 7 : 3} distance={7} decay={2} color="#ffc98a" castShadow />
        </group>
    );
}

/* ---- Planta algo más rica ---- */
function Plant({ position, scale = 1 }) {
    const leaves = useMemo(() => {
        const arr = [];
        const count = 7;
        for (let i = 0; i < count; i++) {
            const a = (i / count) * Math.PI * 2 + i * 0.3;
            arr.push({
                pos: [Math.sin(a) * 0.28 * (0.6 + (i % 3) * 0.2), 0.55 + (i % 4) * 0.14, Math.cos(a) * 0.28 * (0.6 + (i % 3) * 0.2)],
                rotY: a,
                h: 0.5 + (i % 3) * 0.2,
            });
        }
        return arr;
    }, []);
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.15, 0.2, 0.34, 16]} />
                <meshStandardMaterial color="#283b4f" roughness={0.6} />
            </mesh>
            {leaves.map((leaf, i) => (
                <mesh key={i} position={leaf.pos} rotation={[0.2, leaf.rotY, 0.5]}>
                    <planeGeometry args={[0.14, leaf.h, 1, 3]} />
                    <meshStandardMaterial color={i % 2 ? '#3fae5a' : '#2f8f4a'} roughness={0.8} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
}

/* ---- Habitación nocturna ---- */
function NightRoom({ dark }) {
    const wood = useMemo(() => makeWoodTexture(), []);
    const carpet = useMemo(() => makeCarpetTexture(), []);
    const city = useMemo(() => makeCityTexture(), []);
    const wall = dark ? '#181a2c' : '#33375a';
    const bg = dark ? '#0b0e1e' : '#232846';

    return (
        <group>
            {/* Suelo de madera */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -0.5]} receiveShadow>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial map={wood} roughness={0.55} metalness={0.05} />
            </mesh>
            {/* Alfombra */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.4]} receiveShadow>
                <circleGeometry args={[2.6, 40]} />
                <meshStandardMaterial map={carpet} roughness={0.95} />
            </mesh>
            {/* Pared trasera */}
            <mesh position={[0, 1.9, -3.3]} receiveShadow>
                <planeGeometry args={[10, 3.8]} />
                <meshStandardMaterial color={wall} roughness={0.9} />
            </mesh>
            {/* Paredes laterales */}
            <mesh position={[-5, 1.9, -0.4]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[5.8, 3.8]} />
                <meshStandardMaterial color={dark ? '#151729' : '#2c3150'} roughness={0.9} />
            </mesh>
            <mesh position={[5, 1.9, -0.4]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[5.8, 3.8]} />
                <meshStandardMaterial color={dark ? '#151729' : '#2c3150'} roughness={0.9} />
            </mesh>
            {/* Rodapié */}
            <mesh position={[0, 0.06, -3.26]}>
                <boxGeometry args={[10, 0.12, 0.05]} />
                <meshStandardMaterial color={dark ? '#0d0f1c' : '#1e2238'} roughness={0.7} />
            </mesh>

            {/* Ventana de noche con ciudad */}
            <group position={[2.6, 2.1, -3.26]}>
                <RoundedBox args={[2.6, 1.8, 0.08]} radius={0.03} smoothness={2}>
                    <meshStandardMaterial color={dark ? '#14151f' : '#2a2d45'} roughness={0.5} />
                </RoundedBox>
                <mesh position={[0, 0, 0.05]}>
                    <planeGeometry args={[2.2, 1.4]} />
                    <meshBasicMaterial map={city} toneMapped={false} />
                </mesh>
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[2.2, 1.4]} />
                    <meshStandardMaterial color={bg} transparent opacity={0.15} roughness={1} />
                </mesh>
            </group>

            {/* Cuadros en la pared */}
            <mesh position={[-3.2, 2.4, -3.26]}>
                <boxGeometry args={[0.7, 0.5, 0.05]} />
                <meshStandardMaterial color={dark ? '#23253b' : '#3a405f'} roughness={0.6} />
            </mesh>
            <mesh position={[-3.2, 2.4, -3.23]}>
                <planeGeometry args={[0.5, 0.3]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8} />
            </mesh>

            {/* Luz fría de la ventana */}
            <pointLight position={[2.6, 2.4, -2.6]} intensity={dark ? 2.2 : 1.2} distance={6} color="#aab6ff" />
        </group>
    );
}

/* ---- Escritorio de madera ---- */
function NightDesk({ dark }) {
    const wood = useMemo(() => makeWoodTexture(), []);
    return (
        <group position={[0, 0, -0.4]}>
            <RoundedBox args={[3.6, 0.1, 1.05]} radius={0.03} smoothness={3} position={[0, 0.62, 0]} receiveShadow castShadow>
                <meshStandardMaterial map={wood} roughness={0.45} metalness={0.05} />
            </RoundedBox>
            {[-1.5, 1.5].map((px) => (
                <group key={px}>
                    <RoundedBox args={[0.09, 0.6, 0.09]} radius={0.02} smoothness={2} position={[px, 0.28, -0.3]} castShadow>
                        <meshStandardMaterial color={dark ? '#191a28' : '#33375a'} roughness={0.6} />
                    </RoundedBox>
                    <RoundedBox args={[0.09, 0.6, 0.09]} radius={0.02} smoothness={2} position={[px, 0.28, 0.3]} castShadow>
                        <meshStandardMaterial color={dark ? '#191a28' : '#33375a'} roughness={0.6} />
                    </RoundedBox>
                </group>
            ))}
            {/* Teclado */}
            <RoundedBox args={[0.9, 0.035, 0.26]} radius={0.015} smoothness={2} position={[0, 0.68, 0.32]} rotation={[-0.06, 0, 0]} castShadow>
                <meshStandardMaterial color={dark ? '#0d0f1c' : '#22263c'} roughness={0.7} />
            </RoundedBox>
            {/* Taza */}
            <mesh position={[1.15, 0.68, 0.28]}>
                <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
                <meshStandardMaterial color={dark ? '#0f111f' : '#2a2d45'} roughness={0.4} metalness={0.4} />
            </mesh>
        </group>
    );
}

/* ---- Escena completa ---- */
function NightOffice({ projects, t, dark }) {
    const textures = useTexture(projects.map((p) => '/' + p.image));
    useEffect(() => {
        textures.forEach((tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;
        });
    }, [textures]);

    const titleKey = projects.map((p) => p.title);
    const name = t('hero.role1');

    return (
        <group>
            <NightRoom dark={dark} />
            <NightDesk dark={dark} />
            <BigMonitor
                position={[0, 0.68, -0.35]}
                textures={textures}
                titleKey={titleKey}
                t={t}
                colors={PALETTE}
                name={name}
            />
            <group position={[1.05, 0.68, -0.2]}>
                <DeskLamp dark={dark} />
            </group>
            <NightCoder dark={dark} />
            <Plant position={[-4.4, 0, -1.6]} scale={1.1} />
            <Plant position={[4.5, 0, -1.4]} scale={0.85} />
        </group>
    );
}

const Experience3D = ({ projects, t }) => {
    const { theme } = useTheme();
    const dark = theme === 'dark';
    const bg = dark ? '#0b0e1e' : '#232846';

    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}
            camera={{ position: [1.6, 2.1, 3.6], fov: 45 }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <color attach="background" args={[bg]} />
            <fog attach="fog" args={[bg, 8, 15]} />
            <ambientLight intensity={dark ? 0.45 : 0.5} color="#6b76ba" />
            <directionalLight
                position={[-3, 5, 4]}
                intensity={dark ? 0.35 : 0.5}
                color="#bcc4ff"
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-left={-6}
                shadow-camera-right={6}
                shadow-camera-top={6}
                shadow-camera-bottom={-6}
            />
            {dark && <pointLight position={[0, 2.6, 1.5]} intensity={2} distance={9} color="#8b9cff" />}
            <SoftShadows size={14} samples={8} focus={0.4} />
            <NightOffice projects={projects} t={t} dark={dark} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.35}
                enableDamping
                dampingFactor={0.06}
                target={[0, 1.15, -0.2]}
                minDistance={3.5}
                maxDistance={11}
                minPolarAngle={0.9}
                maxPolarAngle={1.5}
            />
        </Canvas>
    );
};

export default Experience3D;