import { useState } from 'react';
import styles from '../styles/Form.module.css';

function LoginCard({ onLogin, error }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin({ username, password });
    };

    return (
        <div className={styles.glassCard}>
            <div className={styles.headline}>تسجيل الدخول</div>
            <p className={styles.prompt}>
                أدخل اسم المستخدم وكلمة المرور لفتح بطاقة التهنئة الخاصة بك.
            </p>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <label className={styles.fieldLabel}>
                    اسم المستخدم
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="اكتب اسم المستخدم"
                        type="text"
                        autoComplete="username"
                        className={styles.glassInput}
                    />
                </label>

                <label className={styles.fieldLabel}>
                    كلمة المرور
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="اكتب كلمة المرور"
                        type="password"
                        autoComplete="current-password"
                        className={styles.glassInput}
                    />
                </label>

                <button type="submit" className={styles.loginButton}>
                    دخول
                </button>

                {error && <div className={styles.errorMessage}>{error}</div>}
            </form>
        </div>
    );
}

export default LoginCard;
