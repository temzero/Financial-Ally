import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/routes';
import { DefaultLayout } from './components/layouts/layouts';
import RouteIdentifier from './routes/routeIdentifier';

function App() {
    const routes = RouteIdentifier(publicRoutes, privateRoutes)

    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, index) => {
                        let Layout = route.layout || DefaultLayout;

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Layout><Page /></Layout>}
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
