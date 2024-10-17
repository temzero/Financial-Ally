// Layout
import { HeaderOnlyLayout } from '../components/layout'

import Home from "../pages/Home";
import Analysis from "../pages/Analysis";
import Budget from "../pages/Budget";
import Wallet from "../pages/Wallet";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/analysis', component: Analysis },
    { path: '/budget', component: Budget },
    { path: '/wallet', component: Wallet },
    { path: '/setting', component: Setting, layout: null },
    { path: '/profile', component: Profile, layout: HeaderOnlyLayout },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }