import React from "react";
import { FiPhone, FiHeadphones, FiMail, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full p-8 bg-white">
      <div className="container mx-auto flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
          <div className="text-zinc-800 text-xl font-semibold leading-6">
            যোগাযোগ করুন
          </div>

          <div className="inline-flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-4">
            <ContactItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C8.4201 17.5 6.9543 17.0115 5.74541 16.1773L3.18182 16.8182L3.8536 14.299C3.00058 13.0817 2.5 11.5993 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" fill="url(#paint0_linear_3067_643)"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 18.75C14.8325 18.75 18.75 14.8325 18.75 10C18.75 5.16751 14.8325 1.25 10 1.25C5.16751 1.25 1.25 5.16751 1.25 10C1.25 11.5693 1.66312 13.0421 2.38655 14.3156L1.25 18.75L5.82179 17.6899C7.06336 18.3659 8.48682 18.75 10 18.75ZM10 17.4038C14.089 17.4038 17.4038 14.089 17.4038 10C17.4038 5.91097 14.089 2.59615 10 2.59615C5.91097 2.59615 2.59615 5.91097 2.59615 10C2.59615 11.5788 3.09031 13.0422 3.9324 14.2439L3.26923 16.7308L5.79996 16.0981C6.99335 16.9216 8.44036 17.4038 10 17.4038Z" fill="#D7FFDD"/>
                  <path d="M7.81251 5.93737C7.60447 5.51951 7.28533 5.5565 6.96292 5.5565C6.38673 5.5565 5.48828 6.24668 5.48828 7.53116C5.48828 8.58386 5.95216 9.73621 7.51526 11.46C9.02378 13.1236 11.0059 13.9842 12.6514 13.9549C14.2969 13.9256 14.6354 12.5096 14.6354 12.0314C14.6354 11.8194 14.5039 11.7137 14.4133 11.685C13.8525 11.4158 12.8183 10.9144 12.583 10.8202C12.3477 10.726 12.2248 10.8534 12.1484 10.9227C11.935 11.1261 11.512 11.7254 11.3672 11.8602C11.2224 11.995 11.0064 11.9268 10.9166 11.8759C10.5859 11.7432 9.68933 11.3444 8.97467 10.6516C8.09083 9.7948 8.03896 9.50003 7.87244 9.23763C7.73922 9.02772 7.83698 8.89893 7.88576 8.84264C8.07619 8.62292 8.33913 8.28368 8.45705 8.1151C8.57496 7.94652 8.48135 7.69058 8.42518 7.53116C8.18361 6.84557 7.97895 6.27166 7.81251 5.93737Z" fill="white"/>
                  <defs>
                    <linearGradient id="paint0_linear_3067_643" x1="16.5625" y1="4.375" x2="2.5" y2="17.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5BD066"/>
                      <stop offset="1" stopColor="#27B43E"/>
                    </linearGradient>
                  </defs>
                </svg>
              }
              title="Customer Support"
              value="+88 01738 552 161"
              highlight
            />

            <Divider />

            <ContactItem
              icon={<FiHeadphones />}
              title="Helpline"
              value="+88 01304 516 677"
            />

            <Divider />
            <ContactItem
              icon={<FiMail />}
              title="Email us"
              value="contact@neocomerz.com"
            />

            <Divider />
            <ContactItem
              icon={<FiMapPin />}
              title="Address"
              value="23, Tropical Akhand Tower, Sector #11, Uttara, Dhaka - 1230"
              grow
            />
          </div>
        </div>
        <div className="inline-flex flex-col gap-4 xl:items-end">
          <div className="inline-flex flex-wrap gap-4 xl:justify-end">
            <FooterLink text="Terms of Service" />
            <FooterLink text="Privacy Policy" />
            <FooterLink text="Cookie Policy" />
          </div>
          <div className="text-zinc-600 text-base leading-5">
            © 2025 NeoComerz. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon,
  title,
  value,
  highlight,
  grow,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  highlight?: boolean;
  grow?: boolean;
}) {
  return (
    <div className={`flex items-start gap-2 ${grow ? "flex-1" : ""}`}>
      <div
        className={`flex h-5 w-5 items-center justify-center text-[16px] text-zinc-800 ${highlight
            ? "shadow-[0px_0px_0px_4px_rgba(156,219,79,0.20)] rounded"
            : ""
          }`}
      >
        {icon}
      </div>
      <div className="inline-flex flex-col justify-center items-start">
        <div className="text-zinc-800 text-base font-semibold leading-5">
          {title}
        </div>
        <div className="text-zinc-600 text-base leading-5">
          {value}
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden xl:block w-px self-stretch bg-neutral-200" />
  );
}
function FooterLink({ text }: { text: string }) {
  return (
    <span className="text-zinc-600 text-base underline cursor-pointer hover:text-zinc-800">
      {text}
    </span>
  );
}
