// Layout
import { HeaderOnlyLayout, LoginRegisterLayout } from '../components/layouts'

import Home from "../pages/Home";
import Analysis from "../pages/Analysis";
import Budget from "../pages/Budget";
import Wallet from "../pages/Wallet";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";

import Login from '../pages/Login';
import Register from '../pages/Register';

const outerRoutes = [
    { path: '/login', component: Login, layout: LoginRegisterLayout },
    { path: '/register', component: Register, layout: LoginRegisterLayout },
]

const publicRoutes = [
    { path: '/login', component: Login, layout: LoginRegisterLayout },
    { path: '/register', component: Register, layout: LoginRegisterLayout },
    
    { path: '/', component: Home },
    { path: '/analysis', component: Analysis },
    { path: '/budget', component: Budget },
    { path: '/wallet', component: Wallet },
    { path: '/setting', component: Setting },
    { path: '/profile', component: Profile, layout: HeaderOnlyLayout },
]

const privateRoutes = [

]

export { outerRoutes, publicRoutes, privateRoutes }