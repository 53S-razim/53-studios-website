"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { submitQuoteForm } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/QuoteModalContext";

const projectTypes = [
  { id: "residential", label: "Residential", description: "Homes, apartments, villas" },
  { id: "commercial", label: "Commercial", description: "Offices, retail, restaurants" },
  { id: "hospitality", label: "Hospitality", description: "Hotels, resorts, lounges" },
  { id: "other", label: "Other", description: "Special projects" },
];

const services = [
  { id: "interior-design", label: "Interior Design" },
  { id: "architecture", label: "Architecture" },
  { id: "renovation", label: "Renovation" },
  { id: "consultation", label: "Consultation" },
];

const budgets = [
  { id: "5-10", label: "₹5-10 Lakhs" },
  { id: "10-25", label: "₹10-25 Lakhs" },
  { id: "25-50", label: "₹25-50 Lakhs" },
  { id: "50+", label: "₹50+ Lakhs" },
];

const timelines = [
  { id: "1-3", label: "1-3 months" },
  { id: "3-6", label: "3-6 months" },
  { id: "6-12", label: "6-12 months" },
  { id: "flexible", label: "Flexible" },
];

export function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    selectedFeatures: [] as string[],
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    projectDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalSteps = 4;

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter((f) => f !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.projectType;
      case 2:
        return formData.selectedFeatures.length > 0;
      case 3:
        return !!formData.budget && !!formData.timeline;
      case 4:
        return !!formData.name && !!formData.email && !!formData.phone;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await submitQuoteForm(formData);
      if (result.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStep(1);
      setSuccess(false);
      setFormData({
        projectType: "",
        selectedFeatures: [],
        budget: "",
        timeline: "",
        name: "",
        email: "",
        phone: "",
        projectDetails: "",
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-auto"
          >
            <GlassPanel className="p-8">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--surface)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">
                    Quote Request Submitted!
                  </h3>
                  <p className="text-[var(--foreground-secondary)] mb-6">
                    Thank you! Our team will review your requirements and get back
                    to you within 24 hours.
                  </p>
                  <Button onClick={handleClose}>Close</Button>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--foreground-muted)]">
                        Step {step} of {totalSteps}
                      </span>
                      <span className="text-sm text-[var(--foreground-muted)]">
                        {Math.round((step / totalSteps) * 100)}%
                      </span>
                    </div>
                    <div className="h-1 bg-[var(--surface)] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[var(--accent)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Step Content */}
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h2 className="text-xl font-medium text-[var(--foreground)] mb-2">
                          What type of project?
                        </h2>
                        <p className="text-[var(--foreground-secondary)] mb-6">
                          Select the category that best describes your project.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {projectTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() =>
                                setFormData({ ...formData, projectType: type.id })
                              }
                              className={cn(
                                "p-4 rounded-xl border text-left transition-all",
                                formData.projectType === type.id
                                  ? "border-[var(--accent)] bg-[var(--accent)]/5"
                                  : "border-[var(--border)] hover:border-[var(--border-strong)]"
                              )}
                            >
                              <h3 className="font-medium text-[var(--foreground)]">
                                {type.label}
                              </h3>
                              <p className="text-sm text-[var(--foreground-muted)]">
                                {type.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h2 className="text-xl font-medium text-[var(--foreground)] mb-2">
                          What services do you need?
                        </h2>
                        <p className="text-[var(--foreground-secondary)] mb-6">
                          Select all that apply.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => handleFeatureToggle(service.id)}
                              className={cn(
                                "p-4 rounded-xl border text-left transition-all",
                                formData.selectedFeatures.includes(service.id)
                                  ? "border-[var(--accent)] bg-[var(--accent)]/5"
                                  : "border-[var(--border)] hover:border-[var(--border-strong)]"
                              )}
                            >
                              <h3 className="font-medium text-[var(--foreground)]">
                                {service.label}
                              </h3>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h2 className="text-xl font-medium text-[var(--foreground)] mb-6">
                          Budget & Timeline
                        </h2>
                        <div className="space-y-6">
                          <div>
                            <p className="text-sm text-[var(--foreground-muted)] mb-3">
                              Estimated Budget
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {budgets.map((budget) => (
                                <button
                                  key={budget.id}
                                  onClick={() =>
                                    setFormData({ ...formData, budget: budget.id })
                                  }
                                  className={cn(
                                    "p-3 rounded-xl border text-center transition-all",
                                    formData.budget === budget.id
                                      ? "border-[var(--accent)] bg-[var(--accent)]/5"
                                      : "border-[var(--border)] hover:border-[var(--border-strong)]"
                                  )}
                                >
                                  {budget.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--foreground-muted)] mb-3">
                              Preferred Timeline
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {timelines.map((timeline) => (
                                <button
                                  key={timeline.id}
                                  onClick={() =>
                                    setFormData({ ...formData, timeline: timeline.id })
                                  }
                                  className={cn(
                                    "p-3 rounded-xl border text-center transition-all",
                                    formData.timeline === timeline.id
                                      ? "border-[var(--accent)] bg-[var(--accent)]/5"
                                      : "border-[var(--border)] hover:border-[var(--border-strong)]"
                                  )}
                                >
                                  {timeline.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h2 className="text-xl font-medium text-[var(--foreground)] mb-2">
                          Your Details
                        </h2>
                        <p className="text-[var(--foreground-secondary)] mb-6">
                          How can we reach you?
                        </p>
                        <div className="space-y-4">
                          <Input
                            id="quote-name"
                            label="Name"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                          <Input
                            id="quote-email"
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                          <Input
                            id="quote-phone"
                            label="Phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                          />
                          <Textarea
                            id="quote-details"
                            label="Project Details (Optional)"
                            placeholder="Tell us more about your project..."
                            rows={3}
                            value={formData.projectDetails}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                projectDetails: e.target.value,
                              })
                            }
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border)]">
                    {step > 1 ? (
                      <Button
                        variant="ghost"
                        onClick={() => setStep(step - 1)}
                        icon={<ArrowLeft className="w-4 h-4" />}
                      >
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}
                    {step < totalSteps ? (
                      <Button
                        onClick={() => setStep(step + 1)}
                        disabled={!canProceed()}
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canProceed()}
                        loading={loading}
                      >
                        Submit Quote Request
                      </Button>
                    )}
                  </div>
                </>
              )}
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
