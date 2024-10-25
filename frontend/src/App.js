import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/routes';
import { DefaultLayout } from './components/layouts/layouts';
import { Fragment } from 'react';
import RouteIdentifier from './routes/routeIdentifier';

function App() {
    const routes = RouteIdentifier(publicRoutes, privateRoutes)

    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((publicRoute, index) => {
                        let Layout = publicRoute.layout;

                        if (Layout === null) {
                            Layout = Fragment;
                        } else if (!Layout) {
                            Layout = DefaultLayout;
                        }

                        const Page = publicRoute.component;
                        return (
                            <Route
                                key={index}
                                path={publicRoute.path}
                                element={
                                    <Layout currentPage={<Page />}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
