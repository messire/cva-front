import {Navigate, Route, Routes} from "react-router-dom";

import ProfilesCatalogPage from "../features/catalog/ui/pages/ProfilesCatalogPage.jsx";
import ProfilePage from "../features/profile/ui/pages/ProfilePage.jsx";
import ProfileCreatePage from "../features/profile/ui/pages/ProfileCreatePage.jsx";
import ProfileRedirectPage from "../features/profile/ui/pages/ProfileRedirectPage.jsx";
import AuthCallbackPage from "../features/auth/ui/pages/AuthCallbackPage.jsx";

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<ProfilesCatalogPage/>}/>
        <Route path="/u/:id" element={<ProfilePage/>}/>
        <Route path="/profile/create" element={<ProfileCreatePage/>}/>
        <Route path="/profile" element={<ProfileRedirectPage/>}/>
        <Route path="/auth/callback" element={<AuthCallbackPage/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
);
