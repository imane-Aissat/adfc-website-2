import React from "react";
import '..//../style/ShiftsDemandView.css';
import DemandeChefDeBase from  '..//../components/DemandeCB';
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';

function ShiftDemandViewPage() {
    return <div id="demandes-view-chef-de-base">
        <div className="side-bar-space">
            <SidebarChefBase></SidebarChefBase>
        </div>
        <div className="navigation-bar-header-space">
            <Header></Header>
        </div>
        <div id="demandes-shifts-container-CB">
            <DemandeChefDeBase
                picture =  '/images/picture-login.jpg'
                employeeName= 'Imane aissat'
                employeeRole= 'Oil Engineer & Mud specialist'
                demandContent= "I would like to propose working an additional week this month, specifically the week of May 13th to 17th, to accumulate extra hours. My intention is to use this accumulated time to take a full week off in mid-June (preferably June 10th to 14th) for personal reasons. I am fully available and committed to covering any necessary shifts during the proposed week and will ensure a smooth handover before my planned time off."
            />
            <DemandeChefDeBase
                picture =  '/images/picture-login.jpg'
                employeeName= 'Imane aissat'
                employeeRole= 'Oil Engineer & Mud specialist'
                demandContent= "I would like to propose working an additional week this month, specifically the week of May 13th to 17th, to accumulate extra hours. My intention is to use this accumulated time to take a full week off in mid-June (preferably June 10th to 14th) for personal reasons. I am fully available and committed to covering any necessary shifts during the proposed week and will ensure a smooth handover before my planned time off."
            />
            <DemandeChefDeBase
                picture =  '/images/picture-login.jpg'
                employeeName= 'Imane aissat'
                employeeRole= 'Oil Engineer & Mud specialist'
                demandContent= "I would like to propose working an additional week this month, specifically the week of May 13th to 17th, to accumulate extra hours. My intention is to use this accumulated time to take a full week off in mid-June (preferably June 10th to 14th) for personal reasons. I am fully available and committed to covering any necessary shifts during the proposed week and will ensure a smooth handover before my planned time off."
            />
            <DemandeChefDeBase
                picture =  '/images/picture-login.jpg'
                employeeName= 'Imane aissat'
                employeeRole= 'Oil Engineer & Mud specialist'
                demandContent= "I would like to propose working an additional week this month, specifically the week of May 13th to 17th, to accumulate extra hours. My intention is to use this accumulated time to take a full week off in mid-June (preferably June 10th to 14th) for personal reasons. I am fully available and committed to covering any necessary shifts during the proposed week and will ensure a smooth handover before my planned time off."
            />
        </div >
    </div>
}

export default ShiftDemandViewPage;