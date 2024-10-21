import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            // Redirect to login if user is not present
            navigate('/login');
        }
    }, [user, navigate]);  // Add navigate to the dependency array

    if (!user) {
        // While waiting for redirection, render nothing (or you can show a loading spinner)
        return null;
    }
    
    return (
        <div>
            <h2>Home</h2>
            <h4>{user.firstName}</h4>
            <h4>${user.balance}</h4>
        </div>
    );
}

export default Home;