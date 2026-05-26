import { useEffect, useMemo, useState, useRef } from 'react';
import styles from '../styles/Greeting.module.css';

function GreetingCard({ user, onLogout }) {
    const [messageText, setMessageText] = useState('');
    const [playing, setPlaying] = useState(false);

    const audioRef = useRef(new Audio('/sounds/takbeer.mpeg'));

    const themeStyles = useMemo(
        () => ({
            '--accent': user.accent,
            '--glow': user.glow,
        }),
        [user]
    );

    // ✨ Typewriter effect
    useEffect(() => {
        let current = '';
        const fullText = user.message;
        let index = 0;

        const interval = setInterval(() => {
            current += fullText[index] || '';
            setMessageText(current);
            index += 1;

            if (index >= fullText.length) {
                clearInterval(interval);
            }
        }, 45);

        return () => clearInterval(interval);
    }, [user.message]);

    // 🎧 تشغيل / إيقاف التكبيرات
    const playMelody = () => {
        const audio = audioRef.current;

        if (playing) {
            audio.pause();
            audio.currentTime = 0;
            setPlaying(false);
            return;
        }

        audio.play().then(() => {
            setPlaying(true);
        });

        audio.onended = () => {
            setPlaying(false);
        };
    };

    // 🧹 تنظيف الصوت عند unmount
    useEffect(() => {
        const audio = audioRef.current;

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div className={styles.greetingWrapper} style={themeStyles}>
            <div className={styles.celebrationBadge}>عيد مبارك</div>

            <div className={styles.cardGlass}>
                <div className={styles.greetingHeader}>
                    <div>
                        <h2>أهلاً {user.displayName}</h2>
                        <p className={styles.subline}>
                            بطاقتك الخاصة أصبحت جاهزة للاحتفال.
                        </p>
                    </div>
                    <div className={styles.iconGlow}>🌙</div>
                </div>

                <div className={styles.messageFrame}>
                    <div className={styles.messageBalloon}>
                        {messageText}
                    </div>
                </div>

                <div className={styles.actionRow}>
                    <button
                        className={styles.musicButton}
                        onClick={playMelody}
                    >
                        {playing ? 'جاري التكبير...' : 'تشغيل تكبيرات العيد'}
                    </button>

                    <button
                        className={styles.logoutButton}
                        onClick={onLogout}
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GreetingCard;