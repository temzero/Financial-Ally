// import { publicRoutes, privateRoutes } from './routes';
import { useSelector } from 'react-redux';

function RouteIdentifier(publicRoutes, privateRoutes) {
    const user = useSelector((state) => state.user);

    // If the user is not logged in, redirect to the login page
    if (!user) {
        
        console.log('Outside')
        return publicRoutes;
    }

    // If logged in, render the private route
    console.log(`You've logged in`, user.firstName)
    return privateRoutes;
}

export default RouteIdentifier;