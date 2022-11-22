import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from './nav/MainNavigation';
import './Main.css'


const Main = () => {
  


    return (
        <div className="main-container">  
            <MainNavigation />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Main;