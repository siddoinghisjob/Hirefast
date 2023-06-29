import React from "react";
import Footer from "../footer";
import Header from "../header";

export default function Email() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="flex flex-col justify-center p-2 items-center w-full">
        <div className="gap-7 flex border-t-4 border-rose-500 flex-col justify-center w-fit p-5 items-center text-xl rounded-xl shadow-2xl bg-white font-semibold">
          <div className="flex flex-col">
            <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-pink-600 to-orange-600 flex md:flex-row flex-col items-center satisfy">
              Congrats! <img src="/assets/images/partypopperthing.svg" className="h-32 w-32" alt="party pooper"/>
            </span>
          </div>
          <span>
            Check your <u className=" underline">mail inbox</u> and verify your
            account by clicking on the activation link.
          </span>
          <span className="font-medium bg-cyan-50 rounded-lg p-2 py-1 text-cyan-800 border-2 border-cyan-800">
            If not found then check you spam folder.
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
