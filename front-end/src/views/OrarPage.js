import React, { useEffect, useState } from 'react';
import { Orar } from '../components/Orar';
import { axiosInstance } from '../api/axios';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';

export function OrarPage({ user, setUser }) {
    const [orar, setOrar] = useState([]);

    useEffect(() => {
        axiosInstance.get('/orar').then(response => {
            setOrar(response.data);
            console.log('orarPage',response.data);
        });
    }, []);

    return (  
        <>
            <Layout user={user} setUser={setUser}>
                <Orar orar={orar} user={user} setOrar={setOrar} />
            </Layout>
        </>
    );
} 
