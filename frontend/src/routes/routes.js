// Layout
import {LoginRegisterLayout, LandingPageLayout } from '../components/layouts/layouts';

import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import LandingPage from '../pages/LandingPage/LandingPage';

import Home from '../pages/Home/Home';
import Analysis from '../pages/Analysis/Analysis';
import Budget from '../pages/Budget/Budget';

import Wallet from '../pages/Wallet/Wallet';
import WalletInfo from '../pages/Wallet/WalletInfo/WalletInfo';


import Setting from '../pages/Setting/Setting';
import Profile from '../pages/Profile/Profile';

const publicRoutes = [
    { path: '/', component: LandingPage, layout: LandingPageLayout },
    { path: '/login', component: Login, layout: LoginRegisterLayout },
    { path: '/register', component: Register, layout: LoginRegisterLayout },
];

const privateRoutes = [
    { path: '/home', component: Home },
    { path: '/analysis', component: Analysis },

    { path: '/budget', component: Budget },

    { path: '/wallet', component: Wallet },
    { path: '/wallet/:walletName', component: WalletInfo },

    { path: '/setting', component: Setting },
    { path: '/profile', component: Profile },
];

export { publicRoutes, privateRoutes };
