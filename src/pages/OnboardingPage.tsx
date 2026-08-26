import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Occupation, IncomeRange, IncomePattern, Language } from '../types';
import { Shield, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { LanguageSelector } from '../components/features/LanguageSelector';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile, setLanguage, user } = useApp();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(user.name || 'Surya Akhil');
  const [occupation, setOccupation] = useState<Occupation>('Construction');
  const [incomeRange, setIncomeRange] = useState<IncomeRange>('₹10,000–₹15,000');
  const [incomePattern, setIncomePattern] = useState<IncomePattern>('Highly irregular');
  const [emergencyTarget, setEmergencyTarget] = useState<number>(5000);
  const [savingPreference, setSavingPreference] = useState<number>(50);

  const totalSteps = 7;

  const handleFinish = () => {
    updateUserProfile({
      name,
      occupation,
      incomeRange,
      incomePattern,
      emergencyTarget,
      savingPreference,
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Step Header Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-ivory-dark mb-2">
          <span className="font-bold text-gold uppercase tracking-wider">
            Onboarding Step {step} of {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-dark-card overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Card Content Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl space-y-6">
        {/* STEP 1: Welcome & Name */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ivory">Let's build your financial safety net.</h2>
              <p className="text-xs text-ivory-dark mt-1">
                Ghada helps you save small amounts around your income schedule.
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-dark mb-1">
                What should we call you?
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-sm font-semibold focus:outline-none focus:border-gold"
                placeholder="Your Name (e.g. Raju)"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Language Selection */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-ivory">Choose your preferred language</h2>
              <p className="text-xs text-ivory-dark mt-1">
                Our app and AI Coach speak your language.
              </p>
            </div>
            <LanguageSelector compact={false} />
          </div>
        )}

        {/* STEP 3: Occupation */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-ivory">What is your primary work?</h2>
              <p className="text-xs text-ivory-dark mt-1">
                This helps us adapt savings suggestions to your daily reality.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Construction',
                'Agriculture',
                'Driving',
                'Small Business',
                'Domestic Work',
                'Other',
              ].map(occ => (
                <button
                  key={occ}
                  onClick={() => setOccupation(occ as Occupation)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                    occupation === occ
                      ? 'bg-gold/15 border-gold text-gold shadow-gold-sm'
                      : 'bg-dark-elevated border-dark-border text-ivory hover:border-gold/40'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Income Range */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-ivory">Approximate monthly earnings</h2>
              <p className="text-xs text-ivory-dark mt-1">
                Select a rough estimate. We never require exact payslips.
              </p>
            </div>
            <div className="space-y-2">
              {['Under ₹10,000', '₹10,000–₹15,000', '₹15,000–₹25,000', '₹25,000+'].map(range => (
                <button
                  key={range}
                  onClick={() => setIncomeRange(range as IncomeRange)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-semibold flex items-center justify-between transition-all ${
                    incomeRange === range
                      ? 'bg-gold/15 border-gold text-gold shadow-gold-sm'
                      : 'bg-dark-elevated border-dark-border text-ivory hover:border-gold/40'
                  }`}
                >
                  <span>{range}</span>
                  {incomeRange === range && <span className="font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Income Pattern */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-ivory">How consistent is your income?</h2>
              <p className="text-xs text-ivory-dark mt-1">
                We adjust your daily suggestions so you never feel pressurized.
              </p>
            </div>
            <div className="space-y-2.5">
              {[
                { id: 'Mostly regular', desc: 'Earnings arrive on fixed days' },
                { id: 'Sometimes changes', desc: 'Slight month-to-month variation' },
                { id: 'Highly irregular', desc: 'Varies daily/weekly depending on work' },
              ].map(pat => (
                <button
                  key={pat.id}
                  onClick={() => setIncomePattern(pat.id as IncomePattern)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    incomePattern === pat.id
                      ? 'bg-gold/15 border-gold text-ivory shadow-gold-sm'
                      : 'bg-dark-elevated border-dark-border text-ivory-dark hover:border-gold/40'
                  }`}
                >
                  <div className="font-bold text-sm text-ivory">{pat.id}</div>
                  <div className="text-xs text-ivory-dark mt-0.5">{pat.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Emergency Goal */}
        {step === 6 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-ivory">Set your first emergency goal</h2>
              <p className="text-xs text-ivory-dark mt-1">
                We recommend starting with ₹5,000 for basic medical/work safety.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-elevated border border-gold/30 text-center space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-ivory-dark">
                Recommended Goal
              </span>
              <div className="text-4xl font-extrabold text-gold">
                ₹{emergencyTarget.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex gap-2">
              {[3000, 5000, 10000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setEmergencyTarget(amt)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    emergencyTarget === amt
                      ? 'bg-gold text-dark-bg border-gold'
                      : 'bg-dark-elevated border-dark-border text-ivory'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Micro-Savings Preference */}
        {step === 7 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-ivory">Comfortable saving amount</h2>
              <p className="text-xs text-ivory-dark mt-1">
                How much can you comfortably save at a time?
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[20, 50, 100, 200].map(amt => (
                <button
                  key={amt}
                  onClick={() => setSavingPreference(amt)}
                  className={`py-3.5 rounded-xl border font-extrabold text-sm transition-all ${
                    savingPreference === amt
                      ? 'bg-gold text-dark-bg border-gold shadow-gold-sm'
                      : 'bg-dark-elevated border-dark-border text-ivory hover:border-gold/40'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Consistency matters more than the starting amount.</strong> Even saving ₹20 a day builds an iron-clad safety net.
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-dark-border pt-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl bg-dark-elevated border border-dark-border text-ivory text-xs font-bold flex items-center gap-1.5 hover:bg-dark-border/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-extrabold text-xs flex items-center gap-1.5 shadow-gold-sm hover:brightness-110"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold-dark text-dark-bg font-extrabold text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2"
            >
              <span>Start My Safety Journey</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
