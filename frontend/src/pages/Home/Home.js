import { useLocation, useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()
    const location = useLocation();
    const user = location.state?.user; 

    if (!user || !user.firstName) {
        navigate('/login');
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