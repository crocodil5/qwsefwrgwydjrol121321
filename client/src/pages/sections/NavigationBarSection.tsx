import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

export const NavigationBarSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu items data
  const navItems = [
    {
      label: "Privat",
      hasDropdown: false,
      href: "https://www.paypal.com/de/digital-wallet/how-paypal-works",
    },
    {
      label: "Geschäftlich",
      hasDropdown: false,
      href: "https://www.paypal.com/de/business",
    },
    {
      label: "Developer",
      hasDropdown: false,
      href: "https://developer.paypal.com/home/",
    },
  ];

  return (
    <header className="flex flex-col w-full min-h-[88px] items-start justify-center bg-wwwpaypalcomwhite border-b border-[#cccccc]">
      <div className="flex items-center justify-between w-full max-w-[1342px] h-full mx-auto px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 mr-4 sm:mr-6">
            <img
              className="w-full h-full"
              alt="PayPal Logo"
              src="/figmaAssets/component-2-3.svg"
            />
          </div>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden md:flex h-12">
            <NavigationMenuList className="flex items-center h-full bg-wwwpaypalcomwhite">
              {navItems.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  className="flex-col items-start pl-0 pr-1 py-0 inline-flex relative"
                >
                  <a
                    className="flex items-center px-3 py-[7px] rounded-[25px] [font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[15.4px] tracking-[0] leading-[25.6px] transition-all duration-200 hover:bg-gray-100 hover:scale-105"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center">
          {/* Help link - Hidden on mobile */}
          <a
            href="https://www.paypal.com/de/smarthelp/home"
            rel="noopener noreferrer"
            target="_blank"
            className="hidden md:flex items-center px-3 py-[7px] rounded-[25px] [font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[15.6px] tracking-[0] leading-[15.6px] mr-4 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
          >
            Hilfe
          </a>

          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center">
            {/* Login button */}
            <Button
              asChild
              variant="outline"
              className="min-w-20 lg:min-w-24 h-10 lg:h-12 rounded-[32px] border-2 lg:border-[3px] border-solid border-black px-4 lg:px-[31.8px] py-0 mr-2 lg:mr-[9px] bg-white transition-all duration-200 hover:bg-gray-50 hover:scale-105 hover:shadow-md text-sm lg:text-base"
            >
              <a
                href="https://www.paypal.com/signin"
                rel="noopener noreferrer"
                target="_blank"
                className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomblack text-[14px] lg:text-[17.4px] text-right tracking-[0] leading-[17.4px]"
              >
                Einloggen
              </a>
            </Button>

            {/* Sign up button */}
            <Button
              asChild
              className="min-w-20 lg:min-w-24 h-10 lg:h-12 rounded-[32px] border-2 lg:border-[3px] border-solid border-black px-4 lg:px-[31.8px] py-0 bg-black transition-all duration-200 hover:bg-gray-800 hover:scale-105 hover:shadow-lg text-sm lg:text-base"
            >
              <a
                href="https://www.paypal.com/de/webapps/mpp/account-selection"
                rel="noopener noreferrer"
                target="_blank"
                className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomwhite text-[14px] lg:text-[17.7px] text-right tracking-[0] leading-6"
              >
                Anmelden
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden ml-2 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden w-full bg-wwwpaypalcomwhite border-t border-[#cccccc]">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
                className="block px-4 py-3 rounded-lg [font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[16px] tracking-[0] leading-[24px] transition-all duration-200 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Help link for mobile */}
            <a
              href="https://www.paypal.com/de/smarthelp/home"
              rel="noopener noreferrer"
              target="_blank"
              className="block px-4 py-3 rounded-lg [font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-wwwpaypalcomblack text-[16px] tracking-[0] leading-[24px] transition-all duration-200 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hilfe
            </a>

            {/* Mobile Login/Signup buttons */}
            <div className="pt-4 space-y-3">
              <Button
                asChild
                variant="outline"
                className="w-full h-12 rounded-[32px] border-2 border-solid border-black bg-white transition-all duration-200 hover:bg-gray-50"
              >
                <a
                  href="https://www.paypal.com/signin"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomblack text-[16px] tracking-[0] leading-[16px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Einloggen
                </a>
              </Button>

              <Button
                asChild
                className="w-full h-12 rounded-[32px] border-2 border-solid border-black bg-black transition-all duration-200 hover:bg-gray-800"
              >
                <a
                  href="https://www.paypal.com/de/webapps/mpp/account-selection"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomwhite text-[16px] tracking-[0] leading-[16px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Neu anmelden
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
