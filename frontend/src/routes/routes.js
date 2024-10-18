// Layout
import {
    HeaderOnlyLayout,
    LoginRegisterLayout,
} from '../components/layouts/layouts';

import Home from '../pages/Home/Home';
import Analysis from '../pages/Analysis/Analysis';
import Budget from '../pages/Budget/Budget';
import Wallet from '../pages/Wallet/Wallet';
import Setting from '../pages/Setting/Setting';
import Profile from '../pages/Profile/Profile';

import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const outerRoutes = [
    { path: '/login', component: Login, layout: LoginRegisterLayout },
    { path: '/register', component: Register, layout: LoginRegisterLayout },
];

const publicRoutes = [
    { path: '/login', component: Login, layout: LoginRegisterLayout },
    { path: '/register', component: Register, layout: LoginRegisterLayout },

    { path: '/', component: Home },
    { path: '/analysis', component: Analysis },
    { path: '/budget', component: Budget },
    { path: '/wallet', component: Wallet },
    { path: '/setting', component: Setting },
    { path: '/profile', component: Profile, layout: HeaderOnlyLayout },
];

const privateRoutes = [];

export { outerRoutes, publicRoutes, privateRoutes };
