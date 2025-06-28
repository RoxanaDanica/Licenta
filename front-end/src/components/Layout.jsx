// components/Layout.jsx

import React from 'react';
import { HeaderProfesor } from './HeaderProfesor';
import { HeaderStudent } from './HeaderStudent';
import { HeaderAdministrator } from './HeaderAdministrator'
import { Header } from './Header'; 

export function Layout({ user, children, setUser }) {
    return (
        <div className="page">
            <header className="headerTop">
                <div className='topBar'>
                    {user?.username}
                </div>
            </header>

            <div className="mainContent">
                <aside className="navLeft">
                    {user?.role === 'profesor' && <HeaderProfesor setUser={setUser} />}
                    {user?.role === 'student' && <HeaderStudent setUser={setUser} />}
                    {user?.role === 'administrator' && <HeaderAdministrator setUser={setUser} />}
                </aside>

                <main className="contentPage">
                    {children}
                </main>
            </div>
        </div>
    );
}
