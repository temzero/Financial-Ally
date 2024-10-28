// import { publicRoutes, privateRoutes } from './routes';
import { useSelector } from 'react-redux';

function RouteIdentifier(publicRoutes, privateRoutes) {
    const user = useSelector((state) => state.user);

    // If the user is not logged in, redirect to the login page
    if (!user) {
        
        return publicRoutes;
    }
    
    return privateRoutes;
}

export default RouteIdentifier;