import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

interface SecureRouteProps {
    component: React.FC;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ component: Component }) => {
    const { keycloak } = useKeycloak();

    return keycloak.authenticated ? (
        <Component />
    ) : (
        <Navigate to="/login" />
    );
};

export default SecureRoute;



