import React, {lazy, Suspense, useEffect} from 'react'
import { Splitter } from "antd";

// Components
import DashboardRoutes from "./DashboardRoutes.jsx";
import Sidebar from "../../components/Sidebar/index.jsx";

function Dashboard() {
    return (
        <Splitter>
            <Splitter.Panel collapsible={true} defaultSize={300} min={'10%'} max={400}>
                <Sidebar />
            </Splitter.Panel>
            <Splitter.Panel>
                <DashboardRoutes />
            </Splitter.Panel>
        </Splitter>
    );
};

export default React.memo(Dashboard)