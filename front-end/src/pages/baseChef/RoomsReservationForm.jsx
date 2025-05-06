import React from 'react';
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';


function ReservationChambreForm() {
    return <div id="chambres-view-chef-de-base">
        <div className="side-bar-space">
            <SidebarChefBase></SidebarChefBase>
        </div>
        <div className="navigation-bar-header-space">
                <Header></Header>
        </div>
        <div id="content-rooms-view-page">
            <div id=''></div>
        </div>

    </div>
}

export default ReservationChambreForm;