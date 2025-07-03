import React from "react";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { ActionButtonSection } from "./sections/ActionButtonSection";
import { MainContentSection } from "./sections/MainContentSection";

export const ClaimMoneyPage = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen w-full items-start relative bg-background">
      <NavigationBarSection />
      
      <main className="flex-1 flex flex-col w-full pt-[88px]">
        <ActionButtonSection />
        <MainContentSection />
      </main>
    </div>
  );
};