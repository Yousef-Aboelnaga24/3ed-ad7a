import { useState } from 'react';
import styles from '../styles/Confetti.module.css';

function ConfettiBurst() {
    const [pieces] = useState(() =>
        Array.from({ length: 40 }, (_, index) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.4;
            const rotate = Math.random() * 360;
            const hue = Math.random() * 80 + 180;

            return {
                id: index,
                left,
                delay,
                rotate,
                color: `hsl(${hue}, 100%, 70%)`,
            };
        })
    );

    return (
        <div className={styles.confettiLayer}>
            {pieces.map((piece) => (
                <span
                    key={piece.id}
                    className={styles.confettiPiece}
                    style={{
                        left: `${piece.left}%`,
                        backgroundColor: piece.color,
                        transform: `rotate(${piece.rotate}deg)`,
                        animationDelay: `${piece.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default ConfettiBurst;