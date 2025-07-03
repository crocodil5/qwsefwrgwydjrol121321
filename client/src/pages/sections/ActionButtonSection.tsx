import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ActionButtonSection = (): JSX.Element => {
  // Data for the payment acceptance card
  const paymentData = {
    title: "Jetzt Geld annehmen",
    amount: "1,00 €",
    sender: "Von Nina Pflaum",
    buttonText: "Zahlung akzeptieren",
    buttonLink: "https://www.paypal.com/signin",
  };

  return (
    <section className="flex flex-col items-center justify-center py-16 px-4 w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg">
        <Card className="w-full max-w-[560px] bg-wwwpaypalcomwhite border-none shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-10 px-6">
            <h2 className="font-normal text-2xl text-wwwpaypalcomblack text-center tracking-[-0.48px] leading-8 mb-6">
              {paymentData.title}
            </h2>

            <p className="font-www-paypal-com-semantic-heading-1 text-wwwpaypalcomblack text-[length:var(--www-paypal-com-semantic-heading-1-font-size)] text-center tracking-[var(--www-paypal-com-semantic-heading-1-letter-spacing)] leading-[var(--www-paypal-com-semantic-heading-1-line-height)] mb-6">
              {price}
            </p>

            <p className="font-www-paypal-com-semantic-heading-4 text-wwwpaypalcomblack text-[length:var(--www-paypal-com-semantic-heading-4-font-size)] text-center tracking-[var(--www-paypal-com-semantic-heading-4-letter-spacing)] leading-[var(--www-paypal-com-semantic-heading-4-line-height)] mb-8">
              {paymentData.sender}
            </p>

            <Button
              asChild
              className="bg-black text-wwwpaypalcomwhite rounded-full px-8 py-4 min-h-12 min-w-24 hover:bg-black/90"
            >
              <a
                href={paymentData.buttonLink}
                rel="noopener noreferrer"
                target="_blank"
                className="font-www-paypal-com-helvetica-neue-regular text-[length:var(--www-paypal-com-helvetica-neue-regular-font-size)] tracking-[var(--www-paypal-com-helvetica-neue-regular-letter-spacing)] leading-[var(--www-paypal-com-helvetica-neue-regular-line-height)]"
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
