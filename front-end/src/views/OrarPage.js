import React, { useEffect, useState } from 'react';
import { Orar } from '../components/Orar';
import { axiosInstance } from '../api/axios';

export function OrarPage({ user }) {
    const [orar, setOrar] = useState([]);

    useEffect(() => {
        axiosInstance.get('/orar').then(response => {
            setOrar(response.data);
        });
    }, []);

    return ( 
        <>
            <Orar orar={orar} user={user} setOrar={setOrar} />
        </>
    );
} 
