import { useEffect, useMemo, useState } from 'react';
import styles from './styles/App.module.css';
import { users } from './data/users';
import LoginCard from './components/LoginCard';
import GreetingCard from './components/GreetingCard';
import ParticlesCanvas from './components/ParticlesCanvas';
import ConfettiBurst from './components/ConfettiBurst';

function App() {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const themeStyle = useMemo(
        () => ({
            '--accent': activeUser?.accent || '#8c9cff',
            '--glow': activeUser?.glow || '#67f5ff',
        }),
        [activeUser]
    );

    const handleLogin = ({ username, password }) => {
        setError('');
        const matched = users.find(
            (user) => user.username === username.trim().toLowerCase() && user.password === password.trim()
        );

        if (!matched) {
            setError('بيانات غير صحيحة. حاول مرة أخرى أو تأكد من اسم المستخدم وكلمة المرور.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setActiveUser(matched);
            setIsLoading(false);
            setShowConfetti(true);
            window.setTimeout(() => setShowConfetti(false), 2600);
        }, 1500);
    };

    const handleLogout = () => {
        setActiveUser(null);
        setError('');
    };

    useEffect(() => {
        document.documentElement.dir = 'rtl';
    }, []);

    return (
        <div className={styles.appShell} style={themeStyle}>
            <ParticlesCanvas />
            <div className={styles.overlay} />
            <div className={styles.heroFrame}>
                <div className={styles.headerBand}>
                    <div>
                        <span className={styles.badge}>عيد سعيد</span>
                        <h1 className={styles.heroTitle}>تصميم تهنئة إلكترونية أنيقة</h1>
                    </div>
                    <p className={styles.subtitle}>
                        سجل الدخول واحصل على بطاقة تهنئة شخصية مليئة بالأنوار، النجوم، والألحان.
                    </p>
                </div>

                <section className={styles.panelArea}>
                    {!activeUser && !isLoading && (
                        <LoginCard onLogin={handleLogin} error={error} />
                    )}

                    {isLoading && (
                        <div className={styles.loaderPanel}>
                            <div className={styles.loaderRing} />
                            <p>جارِ تجهيز بطاقة عيد مبارك...</p>
                        </div>
                    )}

                    {activeUser && !isLoading && (
                        <GreetingCard user={activeUser} onLogout={handleLogout} />
                    )}
                </section>
            </div>

            {showConfetti && <ConfettiBurst />}
        </div>
    );
}

export default App;
