import { FaCheck } from 'react-icons/fa';

export default function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "You already have this. You will always own this.",
      features: [
        "Access to all basic web tools",
        "Standard conversion speeds",
        "Up to 10MB file sizes",
        "Community support",
      ],
      buttonText: "Already Owned",
      buttonVariant: "outline",
      disabled: true,
      popular: false,
    },
    {
      name: "Pro",
      price: "$5",
      originalPrice: "$99",
      period: "/month",
      description: "For professionals who need power and scale.",
      features: [
        "Batch processing (100+ files)",
        "Developer API access",
        "Up to 5GB file uploads",
        "History sync across devices",
        "Priority email support",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "solid",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations.",
      features: [
        "Everything in Pro",
        "Custom deployment options",
        "Dedicated account manager",
        "SLA guaranteed uptime",
        "White-label possibilities",
      ],
      buttonText: "Contact Us",
      buttonVariant: "outline",
      href: "https://github.com/sajidhossain8272/",
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white border-t border-[#f0f2f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4da72a] mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d161c] mb-6">
            Go Pro. Unlock the full potential of Plzwork.
          </h2>
          <p className="text-lg text-[#5a6872]">
            Start with the tools you own forever, and upgrade for professional features and custom support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`relative bg-white rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full ${
                tier.popular 
                  ? 'border-2 border-[#4da72a] shadow-[0_20px_40px_-15px_rgba(77,167,42,0.2)] md:scale-105 z-10' 
                  : 'border border-[#e1e5df] shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4da72a] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Launch Promotion
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0d161c] mb-2">{tier.name}</h3>
                <p className="text-[#5a6872] text-sm h-10">{tier.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className={`${tier.price === 'Custom' ? 'text-4xl' : 'text-5xl'} font-extrabold text-[#0d161c]`}>{tier.price}</span>
                  {tier.originalPrice && (
                    <span className="text-xl text-[#8c9ba5] line-through font-medium">{tier.originalPrice}</span>
                  )}
                </div>
                <span className="text-[#5a6872] font-medium">{tier.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-[#26323a]">
                    <FaCheck className="text-[#4da72a] mt-1 mr-3 shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {tier.href ? (
                <a 
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all text-center ${
                    tier.buttonVariant === 'solid' 
                      ? 'bg-[#0d161c] text-white hover:bg-[#1d2a32] shadow-md' 
                      : 'bg-white text-[#0d161c] border-2 border-[#e1e5df] hover:border-[#4da72a] hover:text-[#4da72a]'
                  }`}
                >
                  {tier.buttonText}
                </a>
              ) : (
                <button 
                  disabled={tier.disabled}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all ${
                    tier.disabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' :
                    tier.buttonVariant === 'solid' 
                      ? 'bg-[#0d161c] text-white hover:bg-[#1d2a32] shadow-md' 
                      : 'bg-white text-[#0d161c] border-2 border-[#e1e5df] hover:border-[#4da72a] hover:text-[#4da72a]'
                  }`}
                >
                  {tier.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
