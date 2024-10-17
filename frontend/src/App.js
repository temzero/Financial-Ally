import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';
import { DefaultLayout } from './components/layout';
import { Fragment } from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Financial Ally</h1>
                <Routes>
                    {publicRoutes.map((publicRoute, index) => {
                        let Layout = publicRoute.layout

                        if(Layout === null) {
                            Layout = Fragment
                        } else if(!Layout) {
                            Layout = DefaultLayout
                        }

                        const Page = publicRoute.component;
                        return (
                            <Route
                                key={index}
                                path={publicRoute.path}
                                element={
                                    <Layout>
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
