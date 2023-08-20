import React from 'react';
import HeaderStats from '../../components/Headers/HeaderStats';

// components
// import CardLineChart from "../../components/Cards/CardLineChart";
// import CardBarChart from "../../components/Cards/CardBarChart";
// import CardPageVisits from "../../components/Cards/CardPageVisits";
// import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";

export default function Dashboard() {
  return (
    <>
      <HeaderStats />
      <div className="flex flex-wrap min-h-screen-75">
        {/*         <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
      </div>
    </>
  );
}
