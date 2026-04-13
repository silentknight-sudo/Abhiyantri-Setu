"use client";
import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl text-black font-semibold text-center mb-12">
          How It Works
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* CLIENT CARD */}
          <div className="bg-white rounded-xl p-8 shadow-sm border 
          hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] 
         hover:border-yellow-400 transition-all duration-300 ease-in-out group">
            <h3 className="text-yellow-500 font-semibold text-lg mb-6">
              For Clients
            </h3>

            <div className="space-y-5 text-black">
              {[
                {
                  title: "Post Your Requirements",
                  desc: "Share details about your construction project",
                },
                {
                  title: "Receive Quotes",
                  desc: "Get proposals from verified professionals",
                },
                {
                  title: "Track Progress",
                  desc: "Monitor your project in real-time",
                },
                {
                  title: "Secure Payment",
                  desc: "Pay safely through our platform",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start group/item transition">
                  <CheckCircle className="text-yellow-500 mt-1 transition-transform duration-300 group-hover/item:scale-110" size={20} />
                  <div>
                   <p className="font-medium transition group-hover/item:text-black">
                   {item.title}
                    </p>

                 <p className="text-gray-500 text-sm transition group-hover/item:text-gray-700">
                {item.desc}
</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROVIDER CARD */}
          <div className="bg-white rounded-xl p-8 shadow-sm border 
           hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] 
         hover:border-yellow-400 transition-all duration-300 ease-in-out group">
            <h3 className="text-yellow-500 font-semibold text-lg mb-6">
              For Service Providers
            </h3>

            <div className="space-y-5 text-black">
              {[
                {
                  title: "Create Your Profile",
                  desc: "Showcase your skills and experience",
                },
                {
                  title: "Get Verified",
                  desc: "Complete our verification process",
                },
                {
                  title: "Receive Leads",
                  desc: "Get matched with relevant projects",
                },
                {
                  title: "Grow Your Business",
                  desc: "Build reputation and get more clients",
                },
              ].map((item, i) => (
                 <div key={i} className="flex gap-3 items-start group/item transition">
                  <CheckCircle className="text-yellow-500 mt-1 transition-transform duration-300 group-hover/item:scale-110" size={20} />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}