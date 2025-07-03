import React from "react";
import { Separator } from "@/components/ui/separator";

export const MainContentSection = (): JSX.Element => {
  // Top navigation links data
  const topNavLinks = [
    { text: "Hilfe", href: "https://www.paypal.com/de/cshelp/personal" },
    { text: "Kontakt", href: "https://www.paypal.com/de/smarthelp/contact-us" },
    {
      text: "Gebühren",
      href: "https://www.paypal.com/de/webapps/mpp/paypal-fees",
    },
    { text: "Sicherheit", href: "https://www.paypal.com/de/security" },
    { text: "Apps", href: "https://www.paypal.com/de/webapps/mpp/mobile-apps" },
    { text: "Angebote", href: "https://www.paypal.com/de/webapps/mpp/offers" },
    {
      text: "EU Digital Services Act",
      href: "https://www.paypalobjects.com/marketing/web/complaince/EU-Digital-Services-Act-at-PayPal.pdf",
    },
  ];

  // Bottom left links data
  const bottomLeftLinks = [
    {
      text: "Über PayPal",
      href: "https://www.paypal.com/de/webapps/mpp/about",
    },
    { text: "Newsroom", href: "https://newsroom.deatch.paypal-corp.com/" },
    { text: "Jobs", href: "https://careers.pypl.com/home/" },
  ];

  // Bottom right links data
  const bottomRightLinks = [
    {
      text: "Barrierefreiheit",
      href: "https://www.paypal.com/de/webapps/mpp/accessibility",
    },
    {
      text: "Impressum",
      href: "https://www.paypal.com/de/webapps/mpp/imprint",
    },
    {
      text: "Datenschutz",
      href: "https://www.paypal.com/myaccount/privacy/privacyhub",
    },
    {
      text: "Cookies",
      href: "https://www.paypal.com/myaccount/privacy/cookiePrefs",
    },
    {
      text: "AGB",
      href: "https://www.paypal.com/de/webapps/mpp/ua/legalhub-full",
    },
    {
      text: "Beschwerden",
      href: "https://www.paypal.com/de/cshelp/complaints",
    },
  ];

  return (
    <div className="flex flex-col items-start w-full bg-wwwpaypalcomwhite">
      <footer className="flex flex-col w-full items-start justify-center py-[76.8px] px-4 md:px-8 lg:px-[289px] bg-transparent max-w-[1920px] mx-auto">
        <div className="w-full">
          {/* PayPal Logo */}
          <div className="flex items-start mb-[38px]">
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start justify-center">
                <img
                  className="w-[146px] h-[51.91px]"
                  alt="PayPal Logo"
                  src="/figmaAssets/component-2.svg"
                />
              </div>
            </div>
          </div>

          {/* Top Navigation Links */}
          <div className="flex flex-wrap items-center justify-between w-full">
            <div className="flex flex-wrap items-start">
              {topNavLinks.map((link, index) => (
                <div
                  key={index}
                  className="inline-flex flex-col items-start justify-center pr-6 pb-5"
                >
                  <div className="inline-flex flex-col h-5 items-start">
                    <div className="inline-flex items-start">
                      <a
                        className="mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomblack text-sm tracking-[0.35px] leading-5 whitespace-nowrap"
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {link.text}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Language/Region Selector */}
            <div className="flex-wrap items-start pb-5">
              <div className="items-center self-stretch inline-flex">
                <div className="relative w-8 h-[18px]">
                  <img 
                    src="/de-flag.png" 
                    alt="German flag" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <Separator className="my-4 bg-[#cccccc]" />

          {/* Bottom Links */}
          <div className="flex flex-wrap items-center justify-between w-full">
            {/* Bottom Left Links */}
            <div className="flex items-start gap-6 pt-[19.75px] pb-[0.25px]">
              {bottomLeftLinks.map((link, index) => (
                <div key={index} className="inline-flex items-start">
                  <a
                    className="mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomblack text-sm tracking-[0.05px] leading-5"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.text}
                  </a>
                </div>
              ))}
            </div>

            {/* Bottom Right Links */}
            <div className="flex items-center gap-6 pt-[19.75px] pb-[0.25px] flex-wrap">
              <div className="mt-[-1.00px] font-www-paypal-com-semantic-item font-[number:var(--www-paypal-com-semantic-item-font-weight)] text-wwwpaypalcomdove-gray text-[length:var(--www-paypal-com-semantic-item-font-size)] tracking-[var(--www-paypal-com-semantic-item-letter-spacing)] leading-[var(--www-paypal-com-semantic-item-line-height)] whitespace-nowrap [font-style:var(--www-paypal-com-semantic-item-font-style)]">
                ©1999–2025 PayPal. Alle Rechte vorbehalten.
              </div>

              {bottomRightLinks.map((link, index) => (
                <div key={index} className="inline-flex items-start">
                  <a
                    className="mt-[-1.00px] [font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomblack text-sm tracking-[0.05px] leading-5"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
