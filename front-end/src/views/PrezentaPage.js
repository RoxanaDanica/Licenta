import React from 'react';
import PrezentaProfesor from '../components/PrezentaProfesor.js';
import PrezentaStudent from '../components/PrezentaStudent.js';
import { Layout } from '../components/Layout.jsx';
 
export const PrezentaPage = ({ user }) => {
  if (!user) {
    return <p>Trebuie să fii autentificat pentru a vedea această pagină.</p>;
  }

  if (user.role === 'profesor') {
    return (
      <Layout user={user}>
        <PrezentaProfesor profesor={user} />;
      </Layout>
    );
  }

  if (user.role === 'student') {
    return (
      <Layout user={user}>
      <PrezentaStudent student={user} />;
    </Layout>
    );
  }

  return <p>Rol necunoscut.</p>;
};

export default PrezentaPage;
