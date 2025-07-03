import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const NavigationBarSection = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    {
      label: "Privat",
      hasDropdown: true,
      href: "#",
    },
    {
      label: "Geschäftlich",
      hasDropdown: true,
      href: "#",
    },
    {
      label: "Developer",
      hasDropdown: false,
      href: "https://developer.paypal.com/home/",
    },
  ];

  return (
    <header className="flex flex-col w-full h-[88px] items-start justify-center bg-wwwpaypalcomwhite border-b border-[#cccccc]">
      <div className="flex items-center justify-between w-full max-w-[1342px] h-full mx-auto px-12">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-12 h-12 mr-6">
            <img
              className="w-12 h-12"
              alt="PayPal Logo"
              src="/figmaAssets/component-2-3.svg"
            />
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="h-12">
            <NavigationMenuList className="flex items-center h-full bg-wwwpaypalcomwhite">
              {navItems.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  className="flex-col items-start pl-0 pr-1 py-0 inline-flex relative"
                >
                  {item.hasDropdown ? (
                    <NavigationMenuTrigger className="flex items-center px-3 py-[7px] rounded-[25px] gap-1 h-auto transition-all duration-200 hover:bg-gray-100 hover:scale-105">
                      <span className="[font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[15.4px] tracking-[0] leading-[25.6px]">
                        {item.label}
                      </span>
                    </NavigationMenuTrigger>
                  ) : (
                    <a
                      className="flex items-center px-3 py-[7px] rounded-[25px] [font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[15.4px] tracking-[0] leading-[25.6px] transition-all duration-200 hover:bg-gray-100 hover:scale-105"
                      href={item.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </a>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center">
          {/* Help link */}
          <a
            href="https://www.paypal.com/de/smarthelp/home"
            rel="noopener noreferrer"
            target="_blank"
            className="px-3 py-[7px] rounded-[25px] [font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[15.6px] tracking-[0] leading-[15.6px] mr-4 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
          >
            Hilfe
          </a>

          {/* Login button */}
          <Button
            asChild
            variant="outline"
            className="min-w-24 h-12 rounded-[32px] border-[3px] border-solid border-black px-[31.8px] py-0 mr-[9px] bg-white transition-all duration-200 hover:bg-gray-50 hover:scale-105 hover:shadow-md"
          >
            <a
              href="https://www.paypal.com/signin"
              rel="noopener noreferrer"
              target="_blank"
              className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomblack text-[17.4px] text-right tracking-[0] leading-[17.4px]"
            >
              Einloggen
            </a>
          </Button>

          {/* Sign up button */}
          <Button
            asChild
            className="min-w-24 h-12 rounded-[32px] border-[3px] border-solid border-black px-[31.8px] py-0 bg-black transition-all duration-200 hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
          >
            <a
              href="https://www.paypal.com/de/webapps/mpp/account-selection"
              rel="noopener noreferrer"
              target="_blank"
              className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomwhite text-[17.7px] text-right tracking-[0] leading-6"
            >
              Neu anmelden
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
