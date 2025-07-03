import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ActionButtonSection = (): JSX.Element => {
  // Get URL parameters
  const urlParams = useMemo(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  }, []);

  // Data for the payment acceptance card with dynamic values
  const paymentData = useMemo(() => {
    const priceParam = urlParams.get("price");
    const nameParam = urlParams.get("name");
    
    return {
      title: "Jetzt Geld annehmen",
      amount: priceParam || "1,00 €",
      sender: nameParam ? `Von ${nameParam}` : "Von Nina Pflaum",
      buttonText: "Zahlung akzeptieren",
      buttonLink: "https://www.paypal.com/signin",
    };
  }, [urlParams]);

  return (
    <section className="flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg">
        <Card className="w-full max-w-[560px] bg-wwwpaypalcomwhite border-none shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-6 sm:py-8 lg:py-10 px-4 sm:px-6">
            <h2 
              className="text-xl sm:text-2xl text-wwwpaypalcomblack text-center tracking-[-0.48px] leading-7 sm:leading-8 mb-4 sm:mb-6"
              style={{ 
                fontFamily: 'var(--www-paypal-com-button-font-family)',
                fontWeight: 'var(--www-paypal-com-button-font-weight)'
              }}
            >
              {paymentData.title}
            </h2>

            <p 
              className="text-wwwpaypalcomblack text-[length:var(--www-paypal-com-semantic-heading-1-font-size)] text-center tracking-[var(--www-paypal-com-semantic-heading-1-letter-spacing)] leading-[var(--www-paypal-com-semantic-heading-1-line-height)] mb-4 sm:mb-6"
              style={{ 
                fontFamily: 'var(--www-paypal-com-button-font-family)',
                fontWeight: 'var(--www-paypal-com-button-font-weight)'
              }}
            >
              {paymentData.amount}
            </p>

            <p className="font-www-paypal-com-semantic-heading-4 text-wwwpaypalcomblack text-[length:var(--www-paypal-com-semantic-heading-4-font-size)] text-center tracking-[var(--www-paypal-com-semantic-heading-4-letter-spacing)] leading-[var(--www-paypal-com-semantic-heading-4-line-height)] mb-6 sm:mb-8">
              {paymentData.sender}
            </p>

            <Button
              asChild
              className="bg-black text-wwwpaypalcomwhite rounded-full px-6 sm:px-8 py-3 sm:py-4 min-h-10 sm:min-h-12 min-w-20 sm:min-w-24 hover:bg-black/90 w-full sm:w-auto max-w-xs"
            >
              <a
                href={paymentData.buttonLink}
                rel="noopener noreferrer"
                target="_blank"
                className="text-[length:var(--www-paypal-com-button-font-size)] tracking-[var(--www-paypal-com-button-letter-spacing)] leading-[var(--www-paypal-com-button-line-height)] text-sm sm:text-base text-center"
                style={{ 
                  fontFamily: 'var(--www-paypal-com-button-font-family)',
                  fontWeight: 'var(--www-paypal-com-button-font-weight)'
                }}
              >
                {paymentData.buttonText}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
