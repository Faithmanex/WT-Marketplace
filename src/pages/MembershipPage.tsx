import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Shield, Zap, Award, Users } from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const benefits = [
    { icon: <Shield size={20} className="text-purple-600" />, title: "Exclusive Content Archives", description: "Unlimited access to all previous lecture series, premium podcasts, and digital templates." },
    { icon: <Zap size={20} className="text-purple-600" />, title: "Bi-Weekly Advisory Circles", description: "Small-group ethics consultation calls and workshops moderated by Dr. Triplett." },
    { icon: <Users size={20} className="text-purple-600" />, title: "Scholarly Practitioner Community", description: "A highly curated network workspace facilitating collaborative continuous growth." },
    { icon: <Award size={20} className="text-purple-600" />, title: "Course Subsidies", description: "Significant 30%+ discounting on core masterclasses, audit proposals, and strategic audits." },
  ];

  const plans = [
    {
      title: "Monthly Regular",
      price: "$59",
      period: "month",
      description: "Ideal for individual practitioners and directors seeking continuous support guidance.",
      features: [
        "Full access to the support materials",
        "Bi-weekly live office hours",
        "Continuous online discussion forums",
        "Member-only apparel updates",
        "Cancel anytime"
      ],
      buttonText: "Join Monthly Collective",
      featured: false
    },
    {
      title: "Yearly Premium",
      price: "$599",
      period: "year",
      description: "Best for leaders executing transformational change programs seeking the best value.",
      features: [
        "Everything in the Monthly Regular plan",
        "Save $109 annually (2 months free)",
        "Priority live session Q&A scheduling",
        "1 complimentary short audit assessment per year",
        "Certificate of professional ethical standing"
      ],
      buttonText: "Join Annual Collective",
      featured: true
    }
  ];

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      {/* Premium Gradient Hero */}
      <div className="relative bg-slate-900 px-6 pt-24 pb-44 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-blue-900/10" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold uppercase tracking-widest mb-6">
            Core Membership
          </span>
          <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight mb-6">
            Leadership & <span className="font-semibold">Ethics Collective</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            A continuous ecosystem supporting ethical practitioners, executives, and directors navigating corporate transformation challenges today.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
            className={`rounded-3xl p-8 sm:p-12 flex flex-col h-full backdrop-blur-md transition-all ${
              plan.featured 
                ? 'bg-slate-900 text-white border border-purple-500/30 shadow-2xl shadow-purple-950/20' 
                : 'bg-white border border-slate-100 text-slate-900 shadow-xl shadow-slate-200/50'
            }`}
          >
            {plan.featured && (
              <span className="self-start px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-[11px] font-bold uppercase tracking-wider mb-4">
                Best Value
              </span>
            )}
            <h2 className="text-2xl font-semibold mb-2">{plan.title}</h2>
            <p className={`${plan.featured ? 'text-slate-400' : 'text-slate-500'} font-light mb-8`}>{plan.description}</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
              <span className={plan.featured ? 'text-slate-400' : 'text-slate-500'}>/ {plan.period}</span>
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map(feat => (
                <li key={feat} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1 flex items-center justify-center ${plan.featured ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className={`text-sm ${plan.featured ? 'text-slate-300' : 'text-slate-600'} font-light`}>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 group transition-all ${
              plan.featured 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 shadow-lg shadow-purple-600/20' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}>
              {plan.buttonText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Benefits Detailed checklist */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-light text-slate-900 tracking-tight">Full Membership Perks</h2>
          <p className="text-slate-500 mt-2 font-light">What makes the Collective an essential hub for transformational leaders.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex-none w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
