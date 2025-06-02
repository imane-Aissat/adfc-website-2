import React, { useEffect, useState } from "react";
import '..//../style/ShiftsDemandView.css';
import DemandeChefDeBase from  '..//../components/DemandeCB';
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';

function ShiftDemandViewPage() {
    const [shiftDemands, setShiftDemands] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/shift-demands') 
          .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
          })
          .then(data => setShiftDemands(data))
          .catch(err => console.error("Fetch error:", err));
    }, []);

    return (
        <div id="demandes-view-chef-de-base">
            <div className="side-bar-space">
                <SidebarChefBase />
            </div>
            <div className="navigation-bar-header-space">
                <Header />
            </div>
            <div id="demandes-shifts-container-CB">
                {shiftDemands.map(demand => (
                    <DemandeChefDeBase
                        key={demand.id_change}
                        picture='/images/picture-login.jpg'
                        employeeName={`${demand.prenom} ${demand.nom}`}
                        employeeRole={demand.fonction}
                        demandContent={
                          `${demand.change_content}\n`
                        }
                        fromDate = {demand.from_date}
                        toDate= {demand.to_date}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShiftDemandViewPage;
