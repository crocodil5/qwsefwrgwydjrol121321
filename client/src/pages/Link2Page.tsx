import React from "react";
import { NavigationBarSection } from "./sections/NavigationBarSection";

export const Link2Page = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-center bg-wwwpaypalcomwhite">
      <NavigationBarSection />
      <div className="pt-[88px] w-full">
        <div className="flex flex-col items-center justify-center py-16 px-4 w-full">
          <h1 className="text-4xl font-bold text-center mb-8">Link2 Page</h1>
          <p className="text-lg text-center max-w-2xl">
            Пожалуйста, опишите дизайн из Figma, который нужно реализовать на этой странице. 
            Я создам компоненты на основе вашего описания.
          </p>
        </div>
      </div>
    </div>
  );
};