import React, { useState } from 'react';

export function Header() {
    const [role, setRole] = useState(null);

    const handleLogin = (role) => {
        setRole(role);
    };

    return (
        <header>
            <div className="logo">
                <h1>Logo</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => handleLogin('profesor')}>Login as Profesor</button>
                    </li>
                    <li>
                        <button onClick={() => handleLogin('student')}>Login as Student</button>
                    </li>
                    <li>
                        <button onClick={() => handleLogin('administrator')}>Login as Administrator</button>
                    </li>
                </ul>
            </nav>
            {role && <p>You are logged in as {role}</p>}
        </header>
    );
}
