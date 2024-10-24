"use client"
import { useState, useRef, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, X, User, Mail, Lock, Zap, Shield, Cloud, Clock, Database, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccount } from '@/app/actions/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    name: "Free",
    price: "$0",
    icon: Database,
    description: "Perfect for testing and small projects",
    features: [
      "100 requests / day",
      "Basic landmark info",
      "Standard support",
      "API key required",
    ],
    limitations: [
      "No advanced search",
      "Limited to 10 countries",
    ],
    cta: "Get Started",
    highlighted: false,
    gradient: "from-gray-600 to-gray-700",
    iconColor: "text-gray-400"
  },
  {
    name: "Pro",
    price: "$49",
    icon: Zap,
    period: "per month",
    description: "Ideal for growing applications",
    features: [
      "10,000 requests / day",
      "Advanced landmark details",
      "Priority support",
      "API key required",
      "Advanced search",
      "Access to all countries",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
    gradient: "from-blue-600 to-purple-600",
    iconColor: "text-blue-400"
  },
  {
    name: "Enterprise",
    price: "Custom",
    icon: HeartHandshake,
    description: "For large-scale applications",
    features: [
      "Unlimited requests",
      "Full landmark database access",
      "24/7 dedicated support",
      "Custom API integration",
      "Advanced analytics",
      "Service Level Agreement (SLA)",
    ],
    cta: "Contact Sales",
    highlighted: false,
    gradient: "from-purple-600 to-pink-600",
    iconColor: "text-purple-400"
  },
];

const PlanCard = ({ plan, index, onSelectPlan }: { plan: typeof plans[0], index: number, onSelectPlan: (planName: string) => void }) => {
  const Icon = plan.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div 
        className={`h-full flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
          plan.highlighted
            ? "bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/50 hover:border-blue-400"
            : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
        }`}
      >
        <div className="mb-6">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.gradient} mb-4`}>
            <Icon className={`w-6 h-6 ${plan.iconColor}`} />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white" >{plan.name}</h3>
          <div className="flex items-baseline mb-4 ">
            <span className="text-4xl font-bold text-white">{plan.price}</span>
            {plan.period && (
              <span className="ml-2 text-gray-400 text-sm">{plan.period}</span>
            )}
          </div>
          <p className="text-gray-400">{plan.description}</p>
        </div>

        <div className="flex-grow">
          <div className="space-y-4">
            {plan.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                className="flex items-center"
              >
                <div className="flex-shrink-0 w-5 h-5 mr-3">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
            {plan.limitations?.map((limitation, limitIndex) => (
              <motion.div
                key={limitIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + (plan.features.length + limitIndex) * 0.1 }}
                className="flex items-center"
              >
                <div className="flex-shrink-0 w-5 h-5 mr-3">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-gray-500">{limitation}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          className={`mt-8 w-full ${
            plan.highlighted
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => onSelectPlan(plan.name)}
        >
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  );
};

const SignUpModal = ({ 
  isOpen, 
  onClose, 
  selectedPlan,
  onSubmit,
  isLoading 
}: { 
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gray-900 text-white rounded-2xl p-8 max-w-md w-full border border-gray-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sign Up for {selectedPlan}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Sign Up'}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('plan', selectedPlan?.toLowerCase() || 'free');

    try {
      const result = await createAccount(formData);

      if (result.success) {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error('Stripe failed to initialize');
        }
        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });

        if (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error(result.message || 'An error occurred during account creation.');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = useCallback((planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black"
    >
      <motion.div 
        className="container mx-auto px-4"
        style={{ opacity, y }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start with our free tier and scale as you grow
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              index={index} 
              onSelectPlan={handleSelectPlan} 
            />
          ))}
        </div>

        {message && (
          <motion.div 
            className="mt-8 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.div>
        )}
      </motion.div>

      <SignUpModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </section>
  );
}