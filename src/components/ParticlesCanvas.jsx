import { useEffect, useRef } from 'react';
import styles from '../styles/Particles.module.css';

function ParticlesCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame = null;
        const particles = Array.from({ length: 80 }, () => createParticle(canvas));

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles.forEach((particle) => {
                particle.x = Math.random() * canvas.width;
                particle.y = Math.random() * canvas.height;
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                if (particle.y > canvas.height + 20) particle.y = -20;
                if (particle.x > canvas.width + 20) particle.x = -20;
                if (particle.x < -20) particle.x = canvas.width + 20;

                ctx.beginPath();
                ctx.fillStyle = particle.color;
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrame = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.particlesCanvas} />;
}

function createParticle(canvas) {
    return {
        x: Math.random() * (canvas?.width || 1200),
        y: Math.random() * (canvas?.height || 800),
        vx: (Math.random() - 0.5) * 0.35,
        vy: Math.random() * 0.5 + 0.15,
        radius: Math.random() * 1.6 + 1.1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.55 + 0.12})`,
    };
}

export default ParticlesCanvas;
