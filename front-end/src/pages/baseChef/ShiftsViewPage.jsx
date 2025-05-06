import React from 'react';
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';
import ShiftCalendar from '..//../components/ChefDepart/ShiftCalendar';
import '..//../style/ShiftsDemandView.css';

function ShiftsPageCB () {
  return <div id="demandes-view-chef-de-base">
        <div className="side-bar-space">
            <SidebarChefBase></SidebarChefBase>
        </div>
        <div className="navigation-bar-header-space">
            <Header></Header>
        </div>
        <div>
            
        </div>
    </div>
};

export default ShiftsPageCB;
