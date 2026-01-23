import React from 'react';

export function Waves({
    className = "",
    strokeColor = "#ffffff22",
    backgroundColor = "transparent",
    pointerSize = 0.5
}) {
    // We render the structure and a script that will run in the browser.
    // This is because the theme is rendered as a static string.
    return (
        <div
            className={`waves-component ${className}`}
            id="waves-container"
            style={{
                backgroundColor,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none',
                '--x': '-0.5rem',
                '--y': '50%',
            }}
        >
            <style>
                {`
                    @media print {
                        .waves-component {
                            display: none !important;
                        }
                    }
                    .waves-component svg {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    .waves-component .pointer-dot {
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 50%;
                        transform: translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0);
                        will-change: transform;
                    }
                `}
            </style>
            <svg id="waves-svg" xmlns="http://www.w3.org/2000/svg" />
            <div
                className="pointer-dot"
                style={{
                    width: `${pointerSize}rem`,
                    height: `${pointerSize}rem`,
                    background: strokeColor,
                }}
            />
            <script
                type="module"
                dangerouslySetInnerHTML={{
                    __html: `
                import { createNoise2D } from 'https://cdn.jsdelivr.net/npm/simplex-noise@4.0.3/+esm';

                const container = document.getElementById('waves-container');
                if (container) {
                    const svg = document.getElementById('waves-svg');
                    const pointer = container.querySelector('.pointer-dot');
                    
                    const strokeColor = "${strokeColor}";
                    
                    let bounding = null;
                    let noise = createNoise2D();
                    let mouse = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false };
                    let lines = [];
                    let paths = [];
                    let raf = null;

                    function setSize() {
                        bounding = container.getBoundingClientRect();
                        svg.style.width = \`\${bounding.width}px\`;
                        svg.style.height = \`\${bounding.height}px\`;
                    }

                    function setLines() {
                        if (!bounding) return;
                        const { width, height } = bounding;
                        lines = [];
                        paths.forEach(p => p.remove());
                        paths = [];

                        const xGap = 12;
                        const yGap = 12;
                        const oWidth = width + 200;
                        const oHeight = height + 30;
                        const totalLines = Math.ceil(oWidth / xGap);
                        const totalPoints = Math.ceil(oHeight / yGap);
                        const xStart = (width - xGap * totalLines) / 2;
                        const yStart = (height - yGap * totalPoints) / 2;

                        for (let i = 0; i < totalLines; i++) {
                            const points = [];
                            for (let j = 0; j < totalPoints; j++) {
                                points.push({
                                    x: xStart + xGap * i,
                                    y: yStart + yGap * j,
                                    wave: { x: 0, y: 0 },
                                    cursor: { x: 0, y: 0, vx: 0, vy: 0 },
                                });
                            }
                            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            path.setAttribute('fill', 'none');
                            path.setAttribute('stroke', strokeColor);
                            path.setAttribute('stroke-width', '1');
                            svg.appendChild(path);
                            paths.push(path);
                            lines.push(points);
                        }
                    }

                    function updateMouse(x, y) {
                        if (!bounding) return;
                        mouse.x = x - bounding.left;
                        mouse.y = y - bounding.top + window.scrollY;
                        if (!mouse.set) {
                            mouse.sx = mouse.lx = mouse.x;
                            mouse.sy = mouse.ly = mouse.y;
                            mouse.set = true;
                        }
                    }

                    window.addEventListener('resize', () => { setSize(); setLines(); });
                    window.addEventListener('mousemove', e => updateMouse(e.pageX, e.pageY));
                    container.addEventListener('touchmove', e => {
                        if (e.touches[0]) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
                    }, { passive: false });

                    function tick(time) {
                        mouse.sx += (mouse.x - mouse.sx) * 0.1;
                        mouse.sy += (mouse.y - mouse.sy) * 0.1;
                        const dx = mouse.x - mouse.lx;
                        const dy = mouse.y - mouse.ly;
                        mouse.vs += (Math.hypot(dx, dy) - mouse.vs) * 0.1;
                        mouse.vs = Math.min(100, mouse.vs);
                        mouse.lx = mouse.x; mouse.ly = mouse.y;
                        mouse.a = Math.atan2(dy, dx);

                        container.style.setProperty('--x', \`\${mouse.sx}px\`);
                        container.style.setProperty('--y', \`\${mouse.sy}px\`);

                        lines.forEach(points => {
                            points.forEach(p => {
                                const move = noise((p.x + time * 0.008) * 0.003, (p.y + time * 0.003) * 0.002) * 8;
                                p.wave.x = Math.cos(move) * 12;
                                p.wave.y = Math.sin(move) * 6;
                                const dmx = p.x - mouse.sx;
                                const dmy = p.y - mouse.sy;
                                const d = Math.hypot(dmx, dmy);
                                const l = Math.max(175, mouse.vs);
                                if (d < l) {
                                    const s = 1 - d / l;
                                    const f = Math.cos(d * 0.001) * s;
                                    p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035;
                                    p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035;
                                }
                                p.cursor.vx += (0 - p.cursor.x) * 0.01;
                                p.cursor.vy += (0 - p.cursor.y) * 0.01;
                                p.cursor.vx *= 0.95; p.cursor.vy *= 0.95;
                                p.cursor.x += p.cursor.vx; p.cursor.y += p.cursor.vy;
                            });
                        });

                        lines.forEach((points, i) => {
                            const p0 = points[0];
                            let d = \`M \${p0.x + p0.wave.x + p0.cursor.x} \${p0.y + p0.wave.y + p0.cursor.y}\`;
                            for (let j = 1; j < points.length; j++) {
                                const p = points[j];
                                d += \` L \${p.x + p.wave.x + p.cursor.x} \${p.y + p.wave.y + p.cursor.y}\`;
                            }
                            if (paths[i]) paths[i].setAttribute('d', d);
                        });

                        raf = requestAnimationFrame(tick);
                    }

                    setSize();
                    setLines();
                    raf = requestAnimationFrame(tick);
                }
                `
                }}
            />
        </div>
    );
}

export default Waves;
