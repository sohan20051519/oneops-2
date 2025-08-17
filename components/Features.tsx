import React from 'react';
import { ZapIcon, ShieldCheckIcon, ChartBarIcon } from './icons/Icons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mt-6 text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <ZapIcon className="h-6 w-6" />,
      title: 'Instant Deployment',
      description: 'Auto-detect your stack and deploy in one click. No configuration needed.',
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: 'Built-in Security',
      description: 'Automated security scanning and compliance checks for every deployment.',
    },
    {
      icon: <ChartBarIcon className="h-6 w-6" />,
      title: 'Smart Monitoring',
      description: 'Real-time insights with AI-powered alerts and automatic scaling.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white rounded-2xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 shadow-inner-lg border border-gray-200/60">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Everything you need for modern deployments</h2>
        <p className="mt-4 text-lg text-gray-600">
          From code to production in minutes, with built-in monitoring and AI-powered assistance.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;