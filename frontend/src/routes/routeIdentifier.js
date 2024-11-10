// import { publicRoutes, privateRoutes } from './routes';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RouteIdentifier(publicRoutes, privateRoutes) {
    const user = useSelector((state) => state.user);

    if (!user) {
        return publicRoutes;
    }
    
    return privateRoutes.map((route) => ({
        ...route,
        element: <Navigate to="/login" replace />
    }));
}

export default RouteIdentifier;

