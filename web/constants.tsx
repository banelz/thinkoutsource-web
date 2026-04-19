import React from 'react';

export interface Service {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  longDescription: string;
  experience: string;
  whyUs: string[];
}

export const SERVICES: Service[] = [
  {
    title: "Customer Service Support",
    description: "Inbound and outbound assistance across voice, email, and chat channels.",
    tags: ["Omnichannel Support", "SLA-Driven Performance", "Brand Voice Alignment", "Customer Retention"],
    longDescription: "Our Customer Service Support is built on the philosophy that every interaction is an opportunity to build brand loyalty. We provide a seamless, omnichannel experience that allows your customers to reach you through their preferred medium—be it voice, email, or live chat.",
    experience: "Managing high-performance support desks for global clients, maintaining elite CSAT scores through rigorous training and quality checks.",
    whyUs: [
      "Skilled customer service teams",
      "Advanced workflow systems",
      "Process-driven operations",
      "Culture of accountability"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: "Lead Generation & Appointment Setting",
    description: "Value-driven outreach and qualification to help businesses increase conversions.",
    tags: ["Verified Lead Quality", "Outbound Sales Expertise", "B2B & B2C Strategy", "Pipeline Growth"],
    longDescription: "Value-driven outreach and qualification to help businesses increase conversions. We use advanced qualification frameworks to deliver high-intent prospects.",
    experience: "Scaling outbound campaigns for international partners seeking reliable African talent.",
    whyUs: [
      "Rigorous lead qualification",
      "High-performance outbound culture",
      "Data-driven targeting",
      "Transparent reporting"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Back-Office Operations",
    description: "Administrative, data processing, and operational support to relieve internal teams.",
    tags: ["Precision Data Entry", "Operational Efficiency", "Secure Processing", "Process Optimization"],
    longDescription: "Administrative, data processing, and operational support to relieve internal teams. We handle repetitive but critical tasks with meticulous attention to detail.",
    experience: "Expertise in high-accuracy data units across insurance, legal, and financial sectors.",
    whyUs: [
      "Strict data security",
      "Scalable infrastructure",
      "Process optimization",
      "Cost efficiency"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "International Campaign Outsourcing",
    description: "Cost-effective delivery for offshore partners seeking reliable African talent.",
    tags: ["Global Scalability", "Cost Arbitrage", "Neutral Accents", "Market Affinity"],
    longDescription: "Cost-effective delivery for offshore partners seeking reliable African talent. We help organizations reduce operational expenses without compromising quality.",
    experience: "Successfully delivering campaigns to South Africa, USA, UK, Australia, and Europe.",
    whyUs: [
      "High-quality talent",
      "Scalable staffing",
      "Consistent communication",
      "Accountability culture"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "ThinkDebt Solutions",
    description: "Holistic financial wellness, debt review removal, and administration order mediation.",
    tags: ["Debt Review Removal", "Debt Mediation", "Financial Monitoring", "Credit Life Protection"],
    longDescription: "ThinkDebt Solutions is our dedicated financial wellness arm. We provide expert interventions for individuals seeking to clear their credit scores, exit debt review, or mediate administration orders. We also provide access to premium financial lifestyle products like budgeting apps and credit life insurance.",
    experience: "Successfully acting as compliant intermediaries to help consumers navigate complex legal frameworks, restoring credit dignity and providing lifelong financial education.",
    whyUs: [
      "NCR Regulatory Compliant Partners",
      "Ethical transparent fee structures",
      "Complete life protection products",
      "End-to-end administrative management"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export const COMPANY_CONTENT = `
Think Outsource is a customer experience and business process outsourcing partner established in 2023. We help companies operate smarter, faster, and more cost-effectively by leveraging a strong operational foundation and rigorous compliance standards.

Our Mission: To empower businesses with intelligent outsourcing solutions that enhance service quality, operational efficiency, and customer satisfaction—while supporting scalable growth across global markets.

Our Vision: To become one of Africa’s leading BPO partners—recognized for consistency, innovation, and customer service excellence—while contributing to sustainable job creation and global market competitiveness.

Who We Are: Built for professional, flexible, and high-performance BPO services. Core principle: operational excellence. We combine skilled customer service teams, advanced workflow systems, process-driven operations, compliance-based management, and a culture of accountability.

What We Do:
- Customer Service Support (Voice, email, chat)
- Lead Generation & Appointment Setting
- Back-Office Operations
- International Campaign Outsourcing (African talent)

Why Businesses Choose Us: Operational Reliability, High-Quality Talent, Process-Driven Systems, Cost Efficiency, Scalable Infrastructure.
`;