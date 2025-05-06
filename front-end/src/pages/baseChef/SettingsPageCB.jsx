import React from "react";
import SettingsPage from "../CDSettingsPage"
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';
import '..//../style/settingsCB.css';

function SettingsPageCB() {
    return <div id="demandes-view-chef-de-base">
    <div className="side-bar-space">
        <SidebarChefBase></SidebarChefBase>
    </div>
    <div className="navigation-bar-header-space">
        <Header></Header>
    </div>
    <div id="settings-page-content-CB">
        <SettingsPage/>
    </div>
</div>
}

export default SettingsPageCB;