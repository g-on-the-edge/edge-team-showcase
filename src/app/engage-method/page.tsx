'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================
type StepCategory = 'open' | 'narrow' | 'close' | 'gate';

interface Step {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  category: StepCategory;
  children?: React.ReactNode;
}

interface Phase {
  phase: number;
  title: string;
  subtitle: string;
  gradient: string;
  accentColor: string;
  steps: Step[];
}

interface GateStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

interface CompletedStep {
  id: string;
  title: string;
  category: StepCategory;
  phaseNumber: number; // 0 = gate
}

type TemplateState = 'phase1' | 'gate' | 'phase2' | 'phase3';

// ============================================================================
// SIMPLE SCROLL HOOK - Light, smooth, auto-floats to next page
// ============================================================================
function useSimpleScroll({
  onNext,
  onPrev,
  isActive,
  canGoNext = true,
  canGoPrev = true,
}: {
  onNext: () => void;
  onPrev: () => void;
  isActive: boolean;
  canGoNext?: boolean;
  canGoPrev?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const lastTouchYRef = useRef(0);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTransitionTimeRef = useRef(0);

  // Simple thresholds
  const SCROLL_THRESHOLD = 120; // Pixels of accumulated scroll before triggering (higher = more deliberate)
  const TOUCH_THRESHOLD = 80; // Pixels of touch drag before triggering (higher = more deliberate)
  const TRANSITION_DURATION = 700; // ms - how long the CSS transition takes (longer for smoother feel)
  const MIN_TRANSITION_INTERVAL = 1000; // Minimum time between transitions to prevent rapid firing

  // Handle wheel - accumulate scroll, trigger when threshold reached
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      
      // Block if we're transitioning or if not enough time has passed since last transition
      if (isTransitioningRef.current || (now - lastTransitionTimeRef.current < MIN_TRANSITION_INTERVAL)) {
        // Aggressively reset delta during cooldown to prevent accumulation
        accumulatedDeltaRef.current = 0;
        return;
      }

      // Accumulate scroll delta with clamping to prevent over-accumulation
      const deltaAdd = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50);
      accumulatedDeltaRef.current += deltaAdd;
      
      // Clamp accumulated delta to prevent excessive build-up
      accumulatedDeltaRef.current = Math.max(-SCROLL_THRESHOLD * 1.5, Math.min(SCROLL_THRESHOLD * 1.5, accumulatedDeltaRef.current));

      // Clear any existing reset timeout
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      // Check if we've scrolled enough to trigger
      if (accumulatedDeltaRef.current > SCROLL_THRESHOLD && canGoNext) {
        isTransitioningRef.current = true;
        lastTransitionTimeRef.current = now;
        accumulatedDeltaRef.current = 0;
        onNext();
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, TRANSITION_DURATION);
      } else if (accumulatedDeltaRef.current < -SCROLL_THRESHOLD && canGoPrev) {
        isTransitioningRef.current = true;
        lastTransitionTimeRef.current = now;
        accumulatedDeltaRef.current = 0;
        onPrev();
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, TRANSITION_DURATION);
      } else {
        // Reset accumulated delta after a pause in scrolling
        resetTimeoutRef.current = setTimeout(() => {
          accumulatedDeltaRef.current = 0;
        }, 150);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [isActive, canGoNext, canGoPrev, onNext, onPrev]);

  // Handle touch - simple swipe detection
  useEffect(() => {
    if (!isActive) return;

    const handleTouchStart = (e: TouchEvent) => {
      const now = Date.now();
      if (isTransitioningRef.current || (now - lastTransitionTimeRef.current < MIN_TRANSITION_INTERVAL)) {
        return;
      }
      lastTouchYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (isTransitioningRef.current || (now - lastTransitionTimeRef.current < MIN_TRANSITION_INTERVAL)) {
        return;
      }

      const endY = e.changedTouches[0].clientY;
      const deltaY = lastTouchYRef.current - endY;

      if (deltaY > TOUCH_THRESHOLD && canGoNext) {
        isTransitioningRef.current = true;
        lastTransitionTimeRef.current = now;
        onNext();
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, TRANSITION_DURATION);
      } else if (deltaY < -TOUCH_THRESHOLD && canGoPrev) {
        isTransitioningRef.current = true;
        lastTransitionTimeRef.current = now;
        onPrev();
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, TRANSITION_DURATION);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isActive, canGoNext, canGoPrev, onNext, onPrev]);

  // Reset state when becoming active OR inactive to prevent scroll bleed
  useEffect(() => {
    accumulatedDeltaRef.current = 0;
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    
    // When becoming active, add a startup delay to prevent immediate transitions
    if (isActive) {
      isTransitioningRef.current = true;
      lastTransitionTimeRef.current = Date.now();
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 600); // 600ms grace period when section becomes active
    } else {
      isTransitioningRef.current = false;
    }
  }, [isActive]);

  return {
    containerRef,
    dragOffset: 0, // No drag offset needed - CSS handles transitions
    isSnapping: false,
  };
}

// Gate steps data
const gateSteps: GateStep[] = [
  {
    id: 'G.1',
    title: 'Executive Overview & Approval',
    description: 'Leadership reviews Phase I outcomes and validates the direction. This critical checkpoint ensures executive alignment and secures resources for the journey ahead.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    children: (
      <div className="flex items-center gap-4 p-4 bg-teal-500/20 border border-teal-500/30 rounded-xl">
        <span className="text-3xl">✓</span>
        <span className="text-teal-300 font-medium">Executive Sponsorship Confirmed</span>
      </div>
    ),
  },
  {
    id: 'G.2',
    title: 'Key Stakeholder Overview',
    description: 'All key stakeholders are briefed and aligned. We ensure everyone understands the commitment, estimated timeline, and their role in the upcoming Assessment & Prioritization phase.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    children: (
      <div className="grid grid-cols-3 gap-3 mt-4">
        {['Leadership', 'Operations', 'Technical'].map((team, i) => (
          <div key={i} className="p-3 bg-teal-500/20 border border-teal-500/30 rounded-xl text-center">
            <span className="text-teal-300 text-sm font-medium">{team}</span>
          </div>
        ))}
      </div>
    ),
  },
];

// ============================================================================
// PROCESS TEMPLATE COMPONENT - Phase-colored container with O-N-C sections
// ============================================================================
function ProcessTemplate({
  templateState,
  completedSteps,
  currentPhase,
  highlightBucket,
  previewMode = false,
  embedded = false,
}: {
  templateState: TemplateState;
  completedSteps: CompletedStep[];
  currentPhase: number;
  highlightBucket: StepCategory | null;
  previewMode?: boolean;
  embedded?: boolean;
}) {
  // In preview mode, show all phases; otherwise use templateState
  const showGate = previewMode || templateState !== 'phase1';
  const showPhase2 = previewMode || templateState === 'phase2' || templateState === 'phase3';
  const showPhase3 = previewMode || templateState === 'phase3';

  // Get steps for a phase
  const getPhaseSteps = (phaseNum: number) => completedSteps.filter(s => s.phaseNumber === phaseNum);
  const gateStepsCompleted = completedSteps.filter(s => s.phaseNumber === 0);
  const totalStepCount = getTotalStepCount();
  const progressPercent = totalStepCount > 0 ? Math.min(100, (completedSteps.length / totalStepCount) * 100) : 0;

  // Phase configurations
  const phaseConfigs = [
    {
      num: 1,
      label: 'Phase I',
      title: 'Defining Outcomes',
      gradient: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-500/50',
      bgColor: 'bg-blue-600/20',
      textColor: 'text-blue-400',
      isActive: currentPhase === 1
    },
    {
      num: 2,
      label: 'Phase II',
      title: 'Pains to Solutions',
      gradient: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-500/50',
      bgColor: 'bg-orange-500/20',
      textColor: 'text-orange-400',
      isActive: currentPhase === 2
    },
    {
      num: 3,
      label: 'Phase III',
      title: 'Execution & Tracking',
      gradient: 'from-rose-600 to-rose-700',
      borderColor: 'border-rose-500/50',
      bgColor: 'bg-rose-600/20',
      textColor: 'text-rose-400',
      isActive: currentPhase === 3
    },
  ];

  // Get active phase config
  const activePhaseConfig = currentPhase === 0
    ? { ...phaseConfigs[0], label: 'Gate', title: 'Exec Approval', gradient: 'from-teal-500 to-cyan-500', borderColor: 'border-teal-500/50', bgColor: 'bg-teal-500/20', textColor: 'text-teal-400' }
    : phaseConfigs[currentPhase - 1] || phaseConfigs[0];

  // Render O-N-C container for a phase
  const renderONCContainer = (phaseNum: number, config: typeof phaseConfigs[0]) => {
    const steps = getPhaseSteps(phaseNum);
    const openSteps = steps.filter(s => s.category === 'open');
    const narrowSteps = steps.filter(s => s.category === 'narrow');
    const closeSteps = steps.filter(s => s.category === 'close');

    const renderStepDots = (bucketSteps: CompletedStep[], dotColor: string) => (
      <div className="flex flex-wrap justify-center gap-0.5 min-h-[16px]">
        {bucketSteps.map((step) => (
          <div
            key={step.id}
            className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${dotColor} flex items-center justify-center shadow-sm animate-in zoom-in duration-300`}
            title={step.title}
          >
            <span className="text-[6px] md:text-[7px] font-bold text-white">{step.id}</span>
          </div>
        ))}
      </div>
    );

    const renderBucket = (label: string, color: string, bgColor: string, dotColor: string, bucketSteps: CompletedStep[], category: string) => {
      const isHighlighted = highlightBucket === category;
      return (
        <div className={`flex-1 rounded-md px-1 md:px-2 py-1 ${bgColor} ${isHighlighted ? 'ring-2 ring-white/50' : ''} transition-all duration-300`}>
          <div className={`text-[7px] md:text-[9px] font-bold ${color} text-center mb-0.5`}>{label}</div>
          {renderStepDots(bucketSteps, dotColor)}
        </div>
      );
    };

    return (
      <div className={`${config.bgColor} ${config.borderColor} border-x border-b rounded-b-lg p-1 md:p-1.5`}>
        <div className="flex gap-0.5 md:gap-1">
          {renderBucket('OPEN', 'text-orange-400', 'bg-orange-500/20', 'bg-orange-500', openSteps, 'open')}
          {renderBucket('NARROW', 'text-teal-400', 'bg-teal-500/20', 'bg-teal-500', narrowSteps, 'narrow')}
          {renderBucket('CLOSE', 'text-slate-300', 'bg-slate-500/20', 'bg-slate-500', closeSteps, 'close')}
        </div>
      </div>
    );
  };

  // Render phase box (compact version for the row)
  const renderPhaseBox = (config: typeof phaseConfigs[0], showONC: boolean = false) => {
    const steps = getPhaseSteps(config.num);
    const isActive = config.isActive && !embedded;

    return (
      <div className={`flex flex-col transition-all duration-500 ${isActive ? 'flex-[2]' : 'flex-1'}`}>
        {/* Phase header */}
        <div className={`bg-gradient-to-r ${config.gradient} rounded-t-lg px-2 py-1 md:py-1.5 text-center ${isActive ? 'ring-1 ring-white/30' : ''}`}>
          <div className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-wide">{config.label}</div>
          <div className="text-[6px] md:text-[8px] text-white/80">{config.title}</div>
        </div>
        {/* Spacer between header and O-N-C */}
        {showONC && <div className="h-6 md:h-8" />}
        {/* O-N-C container */}
        {showONC && renderONCContainer(config.num, config)}
        {!showONC && (
          <div className={`${config.bgColor} ${config.borderColor} border-x border-b rounded-b-lg p-1 md:p-1.5 min-h-[30px] md:min-h-[40px] flex items-center justify-center`}>
            <span className="text-[8px] text-white/40">{steps.length} steps</span>
          </div>
        )}
      </div>
    );
  };

  // Render Gate box
  const renderGateBox = () => {
    const isActive = currentPhase === 0 && !embedded;
    const hasSteps = gateStepsCompleted.length > 0;
    return (
      <div className={`flex flex-col ${isActive ? 'flex-[1.5]' : 'flex-1'} max-w-[80px] md:max-w-[100px]`}>
        <div className={`bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg px-1.5 py-1 md:py-1.5 text-center ${isActive ? 'ring-1 ring-white/30' : ''}`}>
          <div className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-wide">Gate</div>
          <div className="text-[6px] md:text-[8px] text-white/80">Exec Approval</div>
        </div>
        {/* Spacer when gate has steps */}
        {hasSteps && <div className="h-6 md:h-8" />}
        <div className="bg-teal-500/20 border-teal-500/50 border-x border-b rounded-b-lg p-1 min-h-[30px] md:min-h-[40px] flex items-center justify-center">
          <div className="flex gap-0.5">
            {gateStepsCompleted.map((step) => (
              <div key={step.id} className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-teal-500 flex items-center justify-center">
                <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ))}
            {gateStepsCompleted.length === 0 && <span className="text-[8px] text-white/40">0/2</span>}
          </div>
        </div>
      </div>
    );
  };

  // Check if we're on mobile (will be determined client-side)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile in preview mode, show compact version (no expanded O-N-C)
  const showExpandedONC = (phaseNum: number) => {
    if (previewMode && isMobile) {
      // On mobile preview, don't expand - just show compact with step counts
      return false;
    }
    if (phaseNum === 1 && templateState !== 'phase1') {
      return true;
    }
    return currentPhase === phaseNum || previewMode;
  };

  return (
    <div className={`${embedded ? 'relative' : 'fixed top-0 left-0 right-0'} z-40 transition-all duration-700 ease-out`}>
      <div className={`${embedded ? 'bg-white/5 border border-white/10' : 'bg-[#02030d]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'} rounded-xl relative`}>
        <div className="max-w-[100%] md:max-w-4xl mx-auto px-1 md:px-2 py-1.5 md:py-2">
          {/* Phase row */}
          <div className="flex items-start gap-0.5 md:gap-1">
            {/* Phase I - always show */}
            <div className="relative flex-1">
              {renderPhaseBox(phaseConfigs[0], showExpandedONC(1))}
            </div>

            {/* Arrow - aligned with phase header bottom */}
            {showGate && (
              <div className="flex items-center px-0.5 flex-shrink-0 pt-[13px] md:pt-[17px]">
                <svg className="w-2 h-2 md:w-3 md:h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}

            {/* Gate */}
            {showGate && renderGateBox()}

            {/* Arrow - aligned with phase header bottom */}
            {showPhase2 && (
              <div className="flex items-center px-0.5 flex-shrink-0 pt-[13px] md:pt-[17px]">
                <svg className="w-2 h-2 md:w-3 md:h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}

            {/* Phase II */}
            {showPhase2 && renderPhaseBox(phaseConfigs[1], showExpandedONC(2))}

            {/* Arrow - aligned with phase header bottom */}
            {showPhase3 && (
              <div className="flex items-center px-0.5 flex-shrink-0 pt-[13px] md:pt-[17px]">
                <svg className="w-2 h-2 md:w-3 md:h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}

            {/* Phase III */}
            {showPhase3 && renderPhaseBox(phaseConfigs[2], showExpandedONC(3))}
          </div>
          {/* Progress line - stays below the phase row to avoid overlapping cards */}
          {!embedded && (
            <div className="mt-3 h-[3px] rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCROLL-HIJACKED PHASE COMPONENT - Building Timeline Effect
// ============================================================================
function ScrollHijackedPhase({
  phase,
  onComplete,
  onScrollBack,
  isActive,
  onStepComplete,
  onStepRemove,
  showTemplate,
  onIntroExit,
}: {
  phase: Phase;
  onComplete: () => void;
  onScrollBack: () => void;
  isActive: boolean;
  onStepComplete: (step: CompletedStep) => void;
  onStepRemove: (stepId: string) => void;
  showTemplate: boolean;
  onIntroExit?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = intro, 0+ = steps
  const [introTransforming, setIntroTransforming] = useState(false); // For transformer animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const [flyingStep, setFlyingStep] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const accumulatedDelta = useRef(0);
  const touchStartY = useRef(0);
  // Touch event refs for mobile
  const touchStartYRef = useRef(0);
  const isSwipingRef = useRef(false);
  const lastTouchTimeRef = useRef(0);
  const skipIntroScrollRef = useRef(false);

  const totalSteps = phase.steps.length;

  // Threshold for triggering a step change - requires intentional scroll
  const SCROLL_THRESHOLD = 180;
  // Cooldown period after a transition (ms)
  const TRANSITION_COOLDOWN = 1400;
  // Animation duration (ms)
  const ANIMATION_DURATION = 800;

  // Handle scroll/wheel events with accumulated delta for smoother control
  const handleScroll = useCallback((deltaY: number) => {
    if (!isActive || isAnimating || !canScroll) {
      // Aggressively reset when blocked to prevent accumulation
      accumulatedDelta.current = 0;
      return;
    }

    // Accumulate scroll delta with clamping
    accumulatedDelta.current += deltaY;
    // Clamp to prevent excessive build-up during cooldown
    accumulatedDelta.current = Math.max(-SCROLL_THRESHOLD * 1.5, Math.min(SCROLL_THRESHOLD * 1.5, accumulatedDelta.current));

    // Only trigger when threshold is reached
    if (Math.abs(accumulatedDelta.current) < SCROLL_THRESHOLD) return;

    const direction = accumulatedDelta.current > 0 ? 'next' : 'prev';
    if (skipIntroScrollRef.current && currentStep === -1 && direction === 'next') {
      skipIntroScrollRef.current = false;
      accumulatedDelta.current = 0;
      return;
    }
    accumulatedDelta.current = 0; // Reset accumulated delta

    if (direction === 'next') {
      // Scrolling down - next step
      if (currentStep < totalSteps - 1) {
        setIsAnimating(true);
        setCanScroll(false);

        // If moving from intro, trigger the transformer animation
        if (currentStep === -1) {
          setIntroTransforming(true);
          // Notify parent to show template after delay
          setTimeout(() => {
            onIntroExit?.();
          }, 400);
        }

        // If moving from a step (not intro), mark it as complete
        if (currentStep >= 0) {
          const completingStep = phase.steps[currentStep];
          setFlyingStep(completingStep.id);

          // Report step completion after fly animation starts
          setTimeout(() => {
            onStepComplete({
              id: completingStep.id,
              title: completingStep.title,
              category: completingStep.category,
              phaseNumber: phase.phase,
            });
            setFlyingStep(null);
          }, 400);
        }

        setCurrentStep(prev => prev + 1);

        // Re-enable scrolling after animation + cooldown
        setTimeout(() => {
          setIsAnimating(false);
        }, ANIMATION_DURATION);

        setTimeout(() => {
          setCanScroll(true);
        }, TRANSITION_COOLDOWN);
      } else {
        // Last step - mark it complete then phase complete
        const lastStep = phase.steps[currentStep];
        setFlyingStep(lastStep.id);
        setCanScroll(false);

        setTimeout(() => {
          onStepComplete({
            id: lastStep.id,
            title: lastStep.title,
            category: lastStep.category,
            phaseNumber: phase.phase,
          });
          setFlyingStep(null);
        }, 400);

        setTimeout(() => {
          onComplete();
        }, 800);
      }
    } else if (direction === 'prev') {
      // Scrolling up - previous step
      if (currentStep > -1) {
        setIsAnimating(true);
        setCanScroll(false);

        // Remove the current step from completed list when going back
        const currentStepData = phase.steps[currentStep];
        onStepRemove(currentStepData.id);

        setCurrentStep(prev => prev - 1);

        setTimeout(() => {
          setIsAnimating(false);
        }, ANIMATION_DURATION);

        setTimeout(() => {
          setCanScroll(true);
        }, TRANSITION_COOLDOWN);
      } else if (currentStep === -1) {
        // At the intro screen and scrolling up - go back to previous section
        setCanScroll(false);
        setTimeout(() => {
          onScrollBack();
        }, 300);
      }
    }
  }, [isActive, isAnimating, canScroll, currentStep, totalSteps, phase.steps, onComplete, onScrollBack, onStepRemove, onIntroExit, onStepComplete, phase.phase]);

  // Wheel event listener
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Normalize scroll delta for different devices/browsers - limit to 40px per event
      const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 40);
      handleScroll(normalizedDelta);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isActive, handleScroll]);

  // Touch event listeners for mobile
  useEffect(() => {
    if (!isActive) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      isSwipingRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Always prevent native scroll while in scroll-hijacked section
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipingRef.current) return;
      isSwipingRef.current = false;

      // Debounce touch events - require at least 800ms between swipes
      const now = Date.now();
      if (now - lastTouchTimeRef.current < 800) {
        return;
      }

      // Check cooldown flags before processing
      if (!canScroll || isAnimating) {
        return;
      }

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      // Require intentional swipe (50px minimum)
      if (Math.abs(deltaY) > 50) {
        lastTouchTimeRef.current = now;
        // Reset accumulated delta before handling to ensure clean state
        accumulatedDelta.current = 0;
        // Pass threshold + extra to guarantee trigger
        const direction = deltaY > 0 ? SCROLL_THRESHOLD + 50 : -(SCROLL_THRESHOLD + 50);
        handleScroll(direction);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isActive, handleScroll, canScroll, isAnimating]);

  // Reset when becoming active OR inactive to prevent scroll bleed
  useEffect(() => {
    // Always reset accumulated delta on any active state change
    accumulatedDelta.current = 0;
    
    if (isActive) {
      skipIntroScrollRef.current = true;
      setCurrentStep(-1);
      setIntroTransforming(false);
      setIsAnimating(false);
      setCanScroll(true);
    }
    else {
      skipIntroScrollRef.current = false;
    }
  }, [isActive]);

  // Reset accumulated delta when scroll stops (for smoother feel)
  useEffect(() => {
    if (!isActive) return;

    const resetTimer = setInterval(() => {
      // Decay the accumulated delta over time
      accumulatedDelta.current *= 0.8;
      if (Math.abs(accumulatedDelta.current) < 10) {
        accumulatedDelta.current = 0;
      }
    }, 100);

    return () => clearInterval(resetTimer);
  }, [isActive]);

  // Get active step
  const activeStep = currentStep >= 0 ? phase.steps[currentStep] : null;

  // Calculate template offset for content positioning
  // Mobile: ~70px (compact with O>N>C row), Desktop: ~90px
  const templateHeight = showTemplate ? 75 : 0;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden flex flex-col"
      style={{ touchAction: 'none' }}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${phase.gradient}`}
        style={{
          opacity: currentStep >= 0 ? 0.1 : 0.2,
        }}
      />

      {/* Particle Field - using deterministic positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 5, top: 10 }, { left: 15, top: 30 }, { left: 25, top: 50 }, { left: 35, top: 70 },
          { left: 45, top: 20 }, { left: 55, top: 40 }, { left: 65, top: 60 }, { left: 75, top: 80 },
          { left: 85, top: 15 }, { left: 95, top: 35 }, { left: 10, top: 55 }, { left: 20, top: 75 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 transition-all duration-1000"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              opacity: isActive ? 0.2 : 0,
              animationName: isActive ? 'float' : 'none',
              animationDuration: `${3 + (i % 4)}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${(i % 5) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Phase Intro - card-style preview */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all ease-[cubic-bezier(0.32,0.72,0,1)] z-10 ${
          introTransforming
            ? 'duration-500 opacity-0 translate-y-6 pointer-events-none'
            : currentStep === -1
              ? 'duration-700 opacity-100 translate-y-0'
              : 'duration-400 opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="max-w-4xl w-full px-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-2xl backdrop-blur-2xl">
            <div className={`inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-bold text-white shadow-lg ${phase.gradient} mb-6`}>
              <span>PHASE {phase.phase === 1 ? 'I' : phase.phase === 2 ? 'II' : 'III'}</span>
              <span className="text-xs uppercase tracking-widest text-white/80">{phase.title}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{phase.title}</h1>
            <p className="text-sm md:text-lg text-gray-300 mb-6">{phase.subtitle}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {phase.steps.slice(0, 4).map((step) => (
                <div key={step.id} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">{step.subtitle}</span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full text-white ${step.gradient}`}>
                      {step.id}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white leading-tight">{step.title}</p>
                </div>
              ))}
            </div>
            {phase.steps.length > 4 && (
              <div className="mt-4 text-right text-xs text-gray-400">
                +{phase.steps.length - 4} more steps waiting as you scroll
              </div>
            )}
            <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-gray-400">
              <span>Scroll to explore</span>
              <span>Open • Narrow • Close</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Content Area - with offset for template */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          currentStep >= 0
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={{
          paddingTop: `${templateHeight}px`,
          paddingBottom: '15%', // Match the scroll prompt position
        }}
      >
        {/* Active Step Cards */}
        {phase.steps.map((s, index) => {
          // Determine animation state
          const isFlying = flyingStep === s.id;
          let animationClasses = 'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]';

          if (isFlying) {
            // Flying up to template
            animationClasses += ' opacity-0 scale-[0.15] -translate-y-[60vh] pointer-events-none';
          } else if (index === currentStep) {
            // Current/active step - fully visible and CENTERED
            animationClasses += ' opacity-100 scale-100 translate-y-0 translate-x-0';
          } else if (index < currentStep) {
            // Past steps - already in template
            animationClasses += ' opacity-0 scale-50 -translate-y-[40vh] pointer-events-none';
          } else {
            // Future steps - waiting off to the right
            animationClasses += ' opacity-0 scale-95 translate-x-[20%] pointer-events-none';
          }

          return (
            <div
              key={s.id}
              className={`absolute inset-0 flex items-center justify-center px-6 ${animationClasses}`}
            >
              <div className="max-w-3xl w-full">
                {/* Glass Card - Main focus */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-5 pt-8 md:p-12 relative overflow-hidden shadow-2xl">
                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-50"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${
                        s.accentColor.includes('orange') ? 'rgba(249, 115, 22, 0.2)' :
                        s.accentColor.includes('teal') ? 'rgba(20, 184, 166, 0.2)' :
                        s.accentColor.includes('slate') ? 'rgba(100, 116, 139, 0.2)' :
                        s.accentColor.includes('rose') ? 'rgba(244, 63, 94, 0.2)' :
                        'rgba(20, 184, 166, 0.2)'
                      }, transparent 70%)`,
                    }}
                  />

                  {/* Step Number Badge */}
                  <div className={`absolute -top-3 -left-3 md:-top-4 md:-left-4 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${s.gradient} flex items-center justify-center shadow-2xl`}>
                    <span className="text-white font-bold text-base md:text-xl">{s.id}</span>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${s.gradient} shadow-xl mb-4 md:mb-5`}>
                      {s.icon}
                    </div>

                    {/* Subtitle */}
                    <p
                      className="text-xs md:text-sm font-bold tracking-widest mb-2 uppercase"
                      style={{
                        color: s.accentColor.includes('orange') ? '#f97316' :
                               s.accentColor.includes('teal') ? '#14b8a6' :
                               s.accentColor.includes('slate') ? '#94a3b8' :
                               s.accentColor.includes('rose') ? '#f43f5e' : '#14b8a6',
                      }}
                    >
                      {s.subtitle}
                    </p>

                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                      {s.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                      {s.description}
                    </p>

                    {/* Children */}
                    {s.children && (
                      <div className="mt-4 md:mt-6">
                        {s.children}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Progress Indicator - Right side */}
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 md:gap-2 z-20">
        <div
          className={`w-1.5 md:w-2 h-5 md:h-6 rounded-full transition-all duration-300 ${
            currentStep === -1 ? phase.gradient : 'bg-white/20'
          }`}
        />
        {phase.steps.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 md:w-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? phase.gradient + ' h-3 md:h-4'
                : index < currentStep
                  ? 'bg-green-500/50 h-1.5 md:h-2'
                  : 'bg-white/20 h-1.5 md:h-2'
            }`}
          />
        ))}
      </div>

      {/* Scroll Prompt - positioned higher, closer to the card */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-20">
        <span className="text-xs tracking-widest uppercase">
          {currentStep === -1
            ? 'Scroll to begin'
            : currentStep === totalSteps - 1
              ? 'Scroll to continue'
              : `Step ${currentStep + 1} of ${totalSteps}`
          }
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-500/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Progress Bar for Phase */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className={`h-full ${phase.gradient} transition-all duration-500`}
          style={{
            width: `${((currentStep + 2) / (totalSteps + 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// EXECUTIVE GATE COMPONENT - Scroll hijacked with steps like phases
// ============================================================================
function ExecutiveGate({
  isActive,
  onComplete,
  onScrollBack,
  onStepComplete,
  onStepRemove,
  showTemplate,
  onIntroExit,
}: {
  isActive: boolean;
  onComplete: () => void;
  onScrollBack: () => void;
  onStepComplete: (step: CompletedStep) => void;
  onStepRemove: (stepId: string) => void;
  showTemplate: boolean;
  onIntroExit?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = intro, 0+ = steps
  const [introTransforming, setIntroTransforming] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const [flyingStep, setFlyingStep] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const accumulatedDelta = useRef(0);
  const touchStartY = useRef(0);
  // Touch event refs for mobile
  const touchStartYRef = useRef(0);
  const isSwipingRef = useRef(false);
  const lastTouchTimeRef = useRef(0);
  const skipIntroScrollRef = useRef(false);

  const totalSteps = gateSteps.length;
  const SCROLL_THRESHOLD = 150;
  const TRANSITION_COOLDOWN = 1200;

  // Handle scroll/step transitions
  const handleScroll = useCallback((direction: 'next' | 'prev') => {
    if (!isActive || isAnimating || !canScroll) return;

    accumulatedDelta.current = 0;
    if (skipIntroScrollRef.current && currentStep === -1 && direction === 'next') {
      skipIntroScrollRef.current = false;
      return;
    }

    if (direction === 'next') {
      if (currentStep < totalSteps - 1) {
        setIsAnimating(true);
        setCanScroll(false);

        // If moving from intro, trigger transformer animation
        if (currentStep === -1) {
          setIntroTransforming(true);
          setTimeout(() => {
            onIntroExit?.();
          }, 400);
        }

        // If moving from a step, mark it as complete
        if (currentStep >= 0) {
          const completingStep = gateSteps[currentStep];
          setFlyingStep(completingStep.id);

          setTimeout(() => {
            onStepComplete({
              id: completingStep.id,
              title: completingStep.title,
              category: 'gate',
              phaseNumber: 0, // Gate uses phaseNumber 0
            });
          }, 200);
        }

        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setFlyingStep(null);
          setIsAnimating(false);
          setTimeout(() => setCanScroll(true), TRANSITION_COOLDOWN);
        }, 700);
      } else if (currentStep === totalSteps - 1) {
        // At the last step - complete and move to next phase
        setIsAnimating(true);
        setCanScroll(false);

        // Mark last step as complete
        const completingStep = gateSteps[currentStep];
        setFlyingStep(completingStep.id);

        setTimeout(() => {
          onStepComplete({
            id: completingStep.id,
            title: completingStep.title,
            category: 'gate',
            phaseNumber: 0,
          });
        }, 200);

        setTimeout(() => {
          setFlyingStep(null);
          onComplete();
        }, 700);
      }
    } else {
      // Scrolling up - go back
      if (currentStep >= 0) {
        setIsAnimating(true);
        setCanScroll(false);

        // Remove step from template
        const removingStep = gateSteps[currentStep];
        onStepRemove(removingStep.id);

        setTimeout(() => {
          setCurrentStep(prev => prev - 1);
          setIsAnimating(false);
          setTimeout(() => setCanScroll(true), TRANSITION_COOLDOWN);
        }, 500);
      } else if (currentStep === -1) {
        // At intro, go back to Phase 1
        setCanScroll(false);
        setTimeout(() => {
          onScrollBack();
        }, 300);
      }
    }
  }, [isActive, isAnimating, canScroll, currentStep, totalSteps, onComplete, onScrollBack, onStepRemove, onIntroExit, onStepComplete]);

  // Wheel event listener
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 100);
      accumulatedDelta.current += normalizedDelta;

      if (accumulatedDelta.current > SCROLL_THRESHOLD) {
        handleScroll('next');
      } else if (accumulatedDelta.current < -SCROLL_THRESHOLD) {
        handleScroll('prev');
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isActive, handleScroll]);

  // Touch event listeners for mobile
  useEffect(() => {
    if (!isActive) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      isSwipingRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Always prevent native scroll while in scroll-hijacked section
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwipingRef.current) return;
      isSwipingRef.current = false;

      // Debounce touch events - require at least 800ms between swipes
      const now = Date.now();
      if (now - lastTouchTimeRef.current < 800) {
        return;
      }

      // Check cooldown flags before processing
      if (!canScroll || isAnimating) {
        return;
      }

      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      // Require intentional swipe (50px minimum)
      if (Math.abs(deltaY) > 50) {
        lastTouchTimeRef.current = now;
        // Reset accumulated delta before handling
        accumulatedDelta.current = 0;
        handleScroll(deltaY > 0 ? 'next' : 'prev');
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isActive, handleScroll, canScroll, isAnimating]);

  // Reset when becoming active OR inactive to prevent scroll bleed
  useEffect(() => {
    // Always reset accumulated delta on any active state change
    accumulatedDelta.current = 0;
    
    if (isActive) {
      skipIntroScrollRef.current = true;
      setCurrentStep(-1);
      setIntroTransforming(false);
      setIsAnimating(false);
      setCanScroll(true);
    }
    else {
      skipIntroScrollRef.current = false;
    }
  }, [isActive]);

  // Reset accumulated delta periodically
  useEffect(() => {
    if (!isActive) return;

    const resetTimer = setInterval(() => {
      accumulatedDelta.current *= 0.8;
      if (Math.abs(accumulatedDelta.current) < 10) {
        accumulatedDelta.current = 0;
      }
    }, 100);

    return () => clearInterval(resetTimer);
  }, [isActive]);

  const activeStep = currentStep >= 0 ? gateSteps[currentStep] : null;
  const templateHeight = showTemplate ? 90 : 0; // Compact template is ~80px tall

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden flex flex-col"
      style={{ touchAction: 'none' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[#02030d]">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
          }}
        />
        {/* Animated particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal-500/40"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 30}%`,
              animation: 'pulse 3s ease-in-out infinite',
              animationDelay: `${(i % 5) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Gate Intro - card-style preview */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all ease-[cubic-bezier(0.32,0.72,0,1)] z-10 ${
          introTransforming
            ? 'duration-500 opacity-0 translate-y-6 pointer-events-none'
            : currentStep === -1
              ? 'duration-700 opacity-100 translate-y-0'
              : 'duration-400 opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="max-w-4xl w-full px-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                EXECUTIVE GATE
                <span className="rounded-full border border-white/40 px-3 py-0.5 text-[10px] uppercase tracking-[0.4em] text-white/80">
                  Checkpoint
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Executive Checkpoint</h1>
              <p className="text-base md:text-lg text-gray-300">
                Executive alignment and stakeholder solidarity ensures we walk into Assessment & Prioritization with full sponsorship.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {gateSteps.map((step) => (
                  <div key={step.id} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{step.id}</div>
                      <p className="text-white text-lg font-semibold leading-tight">{step.title}</p>
                      <p className="text-xs text-gray-400 leading-snug mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-gray-400">
                <span>Scroll to unlock each gate card</span>
                <span>Align • Approve</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Content Area */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          currentStep >= 0
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        style={{
          paddingTop: `${templateHeight}px`,
          paddingBottom: '15%',
        }}
      >
        {/* Step Cards */}
        {gateSteps.map((step, index) => {
          const isFlying = flyingStep === step.id;
          let animationClasses = 'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]';

          if (isFlying) {
            animationClasses += ' scale-[0.15] -translate-y-[60vh] opacity-0';
          } else if (index === currentStep) {
            animationClasses += ' scale-100 translate-x-0 translate-y-0 opacity-100';
          } else if (index < currentStep) {
            animationClasses += ' scale-50 -translate-y-full opacity-0';
          } else {
            animationClasses += ' scale-95 translate-x-full opacity-0';
          }

          return (
            <div
              key={step.id}
              className={`absolute inset-0 flex items-center justify-center px-6 ${animationClasses}`}
              style={{
                paddingTop: `${templateHeight}px`,
                paddingBottom: '15%',
              }}
            >
              <div className="w-full max-w-3xl">
                <div className="bg-white/5 backdrop-blur-2xl border border-teal-500/30 rounded-2xl md:rounded-3xl p-5 pt-8 md:p-12 relative overflow-hidden shadow-2xl">
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
                    style={{
                      boxShadow: '0 0 60px rgba(20, 184, 166, 0.15), inset 0 0 60px rgba(20, 184, 166, 0.05)',
                    }}
                  />

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-base md:text-xl">{step.id}</span>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 shadow-xl mb-4 md:mb-5">
                      {step.icon}
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs md:text-sm font-bold tracking-widest mb-2 uppercase text-teal-400">
                      EXECUTIVE GATE
                    </p>

                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                      {step.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>

                    {/* Children */}
                    {step.children && (
                      <div className="mt-4 md:mt-6">
                        {step.children}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Progress Indicator */}
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 md:gap-2 z-20">
        <div
          className={`w-1.5 md:w-2 h-5 md:h-6 rounded-full transition-all duration-300 ${
            currentStep === -1 ? 'bg-gradient-to-r from-teal-500 to-cyan-600' : 'bg-white/20'
          }`}
        />
        {gateSteps.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 md:w-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-gradient-to-r from-teal-500 to-cyan-600 h-3 md:h-4'
                : index < currentStep
                  ? 'bg-green-500/50 h-1.5 md:h-2'
                  : 'bg-white/20 h-1.5 md:h-2'
            }`}
          />
        ))}
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-20">
        <span className="text-xs tracking-widest uppercase">
          {currentStep === -1
            ? 'Scroll to begin'
            : `Step ${currentStep + 1} of ${totalSteps}`
          }
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-500/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-500"
          style={{
            width: `${((currentStep + 2) / (totalSteps + 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// EXECUTION METHODS SECTION
// ============================================================================
function ExecutionMethodsSection({ isVisible }: { isVisible: boolean }) {
  const methods = [
    { name: 'Projects EPMO', icon: '📊', desc: 'Traditional project management' },
    { name: 'Agile & Scrum EPMO', icon: '🔄', desc: 'Iterative development cycles' },
    { name: 'Continuous Process Improvement', icon: '📈', desc: 'Ongoing optimization' },
    { name: 'Agile EPMO', icon: '⚡', desc: 'Flexible execution framework' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6 bg-[#02030d]">
      <div className="max-w-4xl w-full">
        <h2
          className={`text-4xl md:text-5xl font-bold text-white text-center mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Execution Methods
        </h2>
        <p
          className={`text-xl text-gray-400 text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          The roadmap is handed off to the appropriate execution method
        </p>

        <div className="grid grid-cols-2 gap-6">
          {methods.map((method, i) => (
            <div
              key={i}
              className={`bg-white/5 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-8 text-center transition-all duration-700 hover:border-teal-500/50 hover:bg-white/10 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
            >
              <span className="text-5xl mb-4 block">{method.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
              <p className="text-sm text-gray-400">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// OUTCOMES FINALE
// ============================================================================
function OutcomesFinale({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6 bg-[#02030d]">
      {/* Dramatic glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.2) 0%, transparent 70%)',
        }}
      />

      <div
        className={`relative z-10 max-w-3xl w-full transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
        }`}
      >
        <div className="bg-gradient-to-br from-rose-900/30 to-rose-800/20 backdrop-blur-2xl border border-rose-500/30 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-64 h-64 rounded-full border border-rose-500/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-96 h-96 rounded-full border border-rose-500/10 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
          </div>

          <div className="relative z-10">
            <div className="inline-block px-6 py-2 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold tracking-widest text-sm mb-8">
              BOLD FUTURE | ROI
            </div>

            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Outcomes Monitoring
            </h2>

            <p className="text-xl text-gray-300 mb-10">
              Track scorecards and monitor progress to ensure we&apos;re achieving the outcomes we set out to accomplish.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '100%', label: 'ROI Tracked' },
                { value: '✓', label: 'Goals Met' },
                { value: '→', label: 'Bold Future' },
              ].map((metric, i) => (
                <div
                  key={i}
                  className={`bg-white/10 rounded-xl p-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${800 + i * 150}ms` }}
                >
                  <div className="text-3xl font-bold text-rose-400">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE DATA
// ============================================================================
const phases: Phase[] = [
  {
    phase: 1,
    title: 'Outcomes | Guiding Principles',
    subtitle: 'What are the outcomes we want to achieve with the work?',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
    accentColor: 'bg-blue-500',
    steps: [
      {
        id: '1.1',
        subtitle: 'OPEN',
        title: 'Edge Engage Overview',
        description: 'We begin by providing a comprehensive overview of the Edge Engage Execution method. This sets the stage for what\'s possible and aligns everyone on the journey ahead.',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        accentColor: 'bg-orange-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
      },
      {
        id: '1.2',
        subtitle: 'OPEN',
        title: '• Define/Refine the Guiding Principles\n• Capture all potential Outcomes',
        description: 'Define the problem statement or outcome we\'re trying to achieve. What exactly are we solving? This is where we crystallize the challenge and ensure everyone understands the target.',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        accentColor: 'bg-orange-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
      },
      {
        id: '1.3',
        subtitle: 'NARROW',
        title: 'Prioritize & Align on Outcomes',
        description: 'Assess the feasibility and value of the idea. Is this worth pursuing? We validate that the concept has legs before committing resources and stakeholder time.',
        gradient: 'bg-gradient-to-r from-teal-600 to-teal-700',
        accentColor: 'bg-teal-500',
        category: 'narrow',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        ),
      },
      {
        id: '1.4',
        subtitle: 'CLOSE',
        title: 'Commitment',
        description: 'Phase 1 closes with commitment. Stakeholders commit to solving the problem with documented risks. We leave with solidarity on the path forward.',
        gradient: 'bg-gradient-to-r from-slate-600 to-slate-700',
        accentColor: 'bg-slate-500',
        category: 'close',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        children: (
          <div className="flex items-center gap-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
            <span className="text-3xl">✅</span>
            <span className="text-green-300 font-medium">Stakeholder Solidarity Achieved</span>
          </div>
        ),
      },
    ],
  },
  {
    phase: 2,
    title: 'Assess & Prioritize',
    subtitle: 'Discovery: Understanding the current state and possibilities',
    gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
    accentColor: 'bg-orange-500',
    steps: [
      {
        id: '2.1',
        subtitle: 'OPEN',
        title: 'Internal Assessment',
        description: 'We interview the people doing the work. What\'s working? What isn\'t? We gather data that tells the story of how they function today.',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        accentColor: 'bg-orange-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
        children: (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm text-gray-400">Stakeholder Interviews</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm text-gray-400">Data Analysis</div>
            </div>
          </div>
        ),
      },
      {
        id: '2.2',
        subtitle: 'OPEN',
        title: 'External Assessment',
        description: 'We look beyond our walls. Who\'s best in class? What new technologies are available? We learn from industry leaders and innovators.',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        accentColor: 'bg-orange-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        children: (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm text-gray-400">Best in Class Research</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">🔬</div>
              <div className="text-sm text-gray-400">New Technologies</div>
            </div>
          </div>
        ),
      },
      {
        id: '2.3',
        subtitle: 'OPEN',
        title: 'Define KPIs',
        description: 'Define the key performance indicators that will measure success. What metrics matter? How will we know when we\'ve achieved our outcomes?',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        accentColor: 'bg-orange-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
      {
        id: '2.4',
        subtitle: 'OPEN',
        title: 'Brainstorm Solutions',
        description: 'Armed with insights from internal and external assessments, we brainstorm solutions. Where should we steer the ship? Every voice matters.',
        gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        accentColor: 'bg-orange-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        children: (
          <div className="flex justify-center gap-4">
            {['💡', '🎯', '🚀', '⭐', '🔮'].map((emoji, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl animate-bounce"
                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
              >
                {emoji}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: '2.5',
        subtitle: 'NARROW',
        title: 'Assessment of Solutions',
        description: 'We assess and prioritize the solutions. Which ideas have the most potential? We begin testing and validation. The strongest solutions rise to the top.',
        gradient: 'bg-gradient-to-r from-teal-600 to-teal-700',
        accentColor: 'bg-teal-500',
        category: 'narrow',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        ),
      },
      {
        id: '2.6',
        subtitle: 'CLOSE',
        title: 'Prioritized Solutions & Roadmap',
        description: 'Phase 2 closes with a solidified roadmap. Whether it\'s a new business plan, care model, or major product—we have a clear path to our destination.',
        gradient: 'bg-gradient-to-r from-slate-600 to-slate-700',
        accentColor: 'bg-slate-500',
        category: 'close',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        id: '2.7',
        subtitle: 'CLOSE',
        title: 'Hand Off',
        description: 'Deliverables are packaged and ready. The work transitions to execution with clear ownership, timelines, and success metrics defined.',
        gradient: 'bg-gradient-to-r from-slate-600 to-slate-700',
        accentColor: 'bg-slate-500',
        category: 'close',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        ),
      },
    ],
  },
  {
    phase: 3,
    title: 'Solidarity',
    subtitle: 'Execution and outcomes monitoring',
    gradient: 'bg-gradient-to-r from-rose-600 to-rose-700',
    accentColor: 'bg-rose-500',
    steps: [
      {
        id: '3.1',
        subtitle: 'EXECUTION',
        title: 'Execution Methods',
        description: 'The roadmap is handed off to the appropriate execution method: Projects EPMO, Agile & Scrum EPMO, Continuous Process Improvement, or Agile EPMO.',
        gradient: 'bg-gradient-to-r from-rose-500 to-rose-600',
        accentColor: 'bg-rose-500',
        category: 'open',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        children: (
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Projects EPMO', icon: '📊' },
              { name: 'Agile & Scrum EPMO', icon: '🔄' },
              { name: 'Continuous Process Improvement', icon: '📈' },
              { name: 'Agile EPMO', icon: '⚡' },
            ].map((method) => (
              <div key={method.name} className="p-3 bg-white/5 rounded-xl text-center border border-rose-500/20">
                <span className="text-2xl block mb-1">{method.icon}</span>
                <span className="text-xs text-gray-300">{method.name}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: '3.2',
        subtitle: 'MONITORING',
        title: 'Outcomes Monitoring',
        description: 'Track scorecards and monitor progress to ensure we\'re achieving the outcomes we set out to accomplish. Bold Future | ROI.',
        gradient: 'bg-gradient-to-r from-rose-600 to-rose-700',
        accentColor: 'bg-rose-500',
        category: 'close',
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        children: (
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '100%', label: 'ROI Tracked' },
              { value: '✓', label: 'Goals Met' },
              { value: '→', label: 'Bold Future' },
            ].map((metric) => (
              <div key={metric.label} className="p-3 bg-white/10 rounded-xl text-center">
                <div className="text-2xl font-bold text-rose-400">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
];

function getTotalStepCount() {
  return gateSteps.length + phases.reduce((count, phase) => count + phase.steps.length, 0);
}

// ============================================================================
// SCROLL-HIJACKED HERO COMPONENT
// ============================================================================
function ScrollHijackedHero({
  isActive,
  onContinue,
}: {
  isActive: boolean;
  onContinue: () => void;
}) {
  // Simple scroll - can only go next (down), not prev (up)
  const { containerRef } = useSimpleScroll({
    onNext: onContinue,
    onPrev: () => {}, // No-op, can't go back from hero
    isActive,
    canGoNext: true,
    canGoPrev: false,
  });

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center relative overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 186, 167, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 186, 167, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <img
          src="/Gundersen_Edge_RGB_wht-ENGAGE_lockup.png"
          alt="Edge Engage"
          className="h-24 md:h-30 w-auto mx-auto mb-8"
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-teal-200 to-cyan-200 bg-clip-text text-transparent">
          Execution Method
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          A disruptive process to break down current biases, processes, procedures, policies, at all levels of perceived complexity to reinvent - Situation needs a breakthrough disruption. There is a fairly clear start and end point.
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-500 animate-bounce">
          <span>Scroll to begin the journey</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </div>
  );
}

// ============================================================================
// ONC FRAMEWORK INTRO (Open-Narrow-Close)
// ============================================================================
function FrameworkIntro({
  isActive,
  onContinue,
  onScrollBack,
}: {
  isActive: boolean;
  onContinue: () => void;
  onScrollBack: () => void;
}) {
  // Simple scroll
  const { containerRef } = useSimpleScroll({
    onNext: onContinue,
    onPrev: onScrollBack,
    isActive,
    canGoNext: true,
    canGoPrev: true,
  });

  // Animation state for staggered entrance
  const [animationStep, setAnimationStep] = useState(0);

  // Trigger animations when section becomes active
  useEffect(() => {
    if (isActive) {
      setAnimationStep(0);
      const timers = [
        setTimeout(() => setAnimationStep(1), 100),   // Title
        setTimeout(() => setAnimationStep(2), 400),   // Subtitle
        setTimeout(() => setAnimationStep(3), 700),   // O-N-C image
        setTimeout(() => setAnimationStep(4), 1000),  // OPEN card
        setTimeout(() => setAnimationStep(5), 1200),  // NARROW card
        setTimeout(() => setAnimationStep(6), 1400),  // CLOSE card
        setTimeout(() => setAnimationStep(7), 1700),  // Scroll prompt
      ];
      return () => timers.forEach(t => clearTimeout(t));
    } else {
      setAnimationStep(0);
    }
  }, [isActive]);

  // Animation classes helper
  const getAnimClass = (step: number, direction: 'up' | 'left' | 'right' | 'scale' = 'up') => {
    const base = 'transition-all duration-700 ease-out';
    const hidden = direction === 'up'
      ? 'opacity-0 translate-y-8'
      : direction === 'left'
      ? 'opacity-0 -translate-x-12'
      : direction === 'right'
      ? 'opacity-0 translate-x-12'
      : 'opacity-0 scale-75';
    const visible = 'opacity-100 translate-y-0 translate-x-0 scale-100';
    return `${base} ${animationStep >= step ? visible : hidden}`;
  };

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-col relative overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-[#02030d] to-[#02030d] pointer-events-none" />

      {/* Subtle animated particles/grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 186, 167, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center flex-1"
      >
        {/* Title */}
        <h2 className={`text-3xl md:text-6xl font-bold mb-2 md:mb-3 text-white ${getAnimClass(1)}`}>
          Our Framework
        </h2>

        {/* Subtitle */}
        <p className={`text-sm md:text-xl text-gray-400 mb-4 md:mb-8 max-w-2xl mx-auto ${getAnimClass(2)}`}>
          Each phase follows the Open-Narrow-Close methodology
        </p>

        {/* Open-Narrow-Close Visual - animates in with scale */}
        <div className={`flex items-center justify-center mb-4 md:mb-8 ${getAnimClass(3, 'scale')}`}>
          <img
            src="/Open Narrow close.png"
            alt="Open - Narrow - Close Framework"
            className="w-full max-w-[240px] md:max-w-lg h-auto drop-shadow-2xl"
          />
        </div>

        {/* O-N-C Cards - staggered animation */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto mb-4 md:mb-8 w-full">
          {/* OPEN Card */}
          <div className={`${getAnimClass(4, 'left')} bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-3 md:p-5 backdrop-blur-sm`}>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mb-2 shadow-lg shadow-cyan-500/50" />
            <h3 className="text-cyan-400 font-bold text-sm md:text-xl mb-1">OPEN</h3>
            <p className="text-cyan-300/80 text-[10px] md:text-sm uppercase tracking-wider font-medium mb-1 md:mb-2">Comfortable</p>
            <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed">
              Ideas & opinions shared through brainstorming
            </p>
          </div>

          {/* NARROW Card */}
          <div className={`${getAnimClass(5, 'up')} bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-3 md:p-5 backdrop-blur-sm`}>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 mx-auto mb-2 shadow-lg shadow-orange-500/50" />
            <h3 className="text-orange-400 font-bold text-sm md:text-xl mb-1">NARROW</h3>
            <p className="text-orange-300/80 text-[10px] md:text-sm uppercase tracking-wider font-medium mb-1 md:mb-2">More Focused</p>
            <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed">
              Organize & evaluate for better understanding
            </p>
          </div>

          {/* CLOSE Card */}
          <div className={`${getAnimClass(6, 'right')} bg-gradient-to-br from-slate-500/20 to-slate-600/10 border border-slate-500/30 rounded-xl p-3 md:p-5 backdrop-blur-sm`}>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-slate-400 to-gray-400 mx-auto mb-2 shadow-lg shadow-slate-500/50" />
            <h3 className="text-slate-300 font-bold text-sm md:text-xl mb-1">CLOSE</h3>
            <p className="text-slate-400/80 text-[10px] md:text-sm uppercase tracking-wider font-medium mb-1 md:mb-2">Consensus</p>
            <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed">
              Decision made, understood & agreed upon
            </p>
          </div>
        </div>

        {/* Scroll prompt - fades in last */}
        <div className={`flex items-center justify-center gap-2 text-teal-500 ${getAnimClass(7)}`}>
          <span className="text-sm md:text-base font-medium">Scroll to begin the journey</span>
          <div className="animate-bounce">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function EngageMethodPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]));
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);
  const [templateState, setTemplateState] = useState<TemplateState>('phase1');
  const [highlightBucket, setHighlightBucket] = useState<StepCategory | null>(null);
  const [templateVisible, setTemplateVisible] = useState(false); // Only show after scrolling from intro

  // Sections: Hero, Framework, Phase1, Gate, Phase2, Phase3, CTA
  const totalSections = 7;

  // Show template after user has scrolled from phase intro - keep visible through CTA section
  const showTemplate = templateVisible && currentSection >= 2;

  // Handle step completion - add to template
  const handleStepComplete = useCallback((step: CompletedStep) => {
    setCompletedSteps(prev => {
      // Don't add duplicates
      if (prev.some(s => s.id === step.id)) return prev;
      return [...prev, step];
    });

    // Highlight the bucket briefly
    setHighlightBucket(step.category);
    setTimeout(() => setHighlightBucket(null), 600);
  }, []);

  // Handle step removal - remove from template when scrolling back
  const handleStepRemove = useCallback((stepId: string) => {
    setCompletedSteps(prev => prev.filter(s => s.id !== stepId));
  }, []);

  // Handle full reset - go back to beginning and optionally reload the page
  const handleReset = useCallback((hardReset: boolean = false) => {
    if (hardReset) {
      // Full browser reload
      window.location.reload();
    } else {
      // Soft reset - just reset state
      setCurrentSection(0);
      setVisibleSections(new Set([0]));
      setCompletedSteps([]);
      setTemplateState('phase1');
      setHighlightBucket(null);
      setTemplateVisible(false);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Handle intro exit - show template after transformer animation
  const handleIntroExit = useCallback(() => {
    setTemplateVisible(true);
  }, []);

  // Handle Hero -> Framework transition
  const handleHeroContinue = useCallback(() => {
    setCurrentSection(1);
    setVisibleSections(prev => new Set([...prev, 1]));
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections[1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, []);

  // Handle Framework -> Phase 1 transition
  const handleFrameworkContinue = useCallback(() => {
    setCurrentSection(2);
    setVisibleSections(prev => new Set([...prev, 2]));
    setTemplateVisible(true); // Show template when entering Phase I
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections[2]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, []);

  const handlePhaseComplete = useCallback((phaseIndex: number) => {
    // Update template state based on which phase completed
    if (phaseIndex === 0) {
      // Phase 1 complete -> show gate in template
      setTemplateState('gate');
    } else if (phaseIndex === 1) {
      // Phase 2 complete -> show phase 3 in template
      setTemplateState('phase3');
    }

    // Keep template visible throughout - it tells the story of progress!

    // Move to next section (with Framework inserted at position 1)
    // phaseIndex 0 = Phase 1 (section 2) -> Gate (section 3)
    // phaseIndex 1 = Phase 2 (section 4) -> Phase 3 (section 5)
    // phaseIndex 2 = Phase 3 (section 5) -> CTA (section 6)
    const nextSection = phaseIndex === 0 ? 3 : phaseIndex === 1 ? 5 : 6;
    setCurrentSection(nextSection);
    setVisibleSections(prev => new Set([...prev, nextSection]));

    // Scroll to next section
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections[nextSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  // When entering Phase 2 from Gate, update template state
  const handleGateComplete = useCallback(() => {
    setTemplateState('phase2');
    // Keep template visible - it tells the story!
    setCurrentSection(4);
    setVisibleSections(prev => new Set([...prev, 4]));
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections[4]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleScrollBack = useCallback((sectionIndex: number) => {
    // Go back to previous section
    const prevSection = sectionIndex - 1;
    if (prevSection >= 0) {
      setCurrentSection(prevSection);
      setVisibleSections(prev => new Set([...prev, prevSection]));

      // Reset template state based on where we're going back to
      // Section layout: 0=Hero, 1=Framework, 2=Phase1, 3=Gate, 4=Phase2, 5=Phase3, 6=CTA
      if (prevSection === 0 || prevSection === 1) {
        // Going back to Hero or Framework - reset everything
        setCompletedSteps([]);
        setTemplateState('phase1');
        setTemplateVisible(false);
      } else if (prevSection === 2) {
        // Going back to Phase 1 from Gate - clear all steps and reset template
        setCompletedSteps([]);
        setTemplateState('phase1');
        setTemplateVisible(false); // Will re-show when they scroll from intro again
      } else if (prevSection === 3) {
        // Going back to Gate from Phase 2 - keep Phase 1 and Gate steps, reset to gate state
        setCompletedSteps(prev => prev.filter(s => s.phaseNumber === 1 || s.phaseNumber === 0));
        setTemplateState('gate');
      } else if (prevSection === 4) {
        // Going back to Phase 2 from Phase 3 - keep Phase 1, Gate, & 2 steps
        setCompletedSteps(prev => prev.filter(s => s.phaseNumber <= 2 || s.phaseNumber === 0));
        setTemplateState('phase2');
      }

      // Scroll to previous section
      setTimeout(() => {
        const sections = document.querySelectorAll('[data-section]');
        sections[prevSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  // Track scroll position ONLY for non-hijacked sections (Hero and CTA)
  // Scroll-hijacked sections (Framework, Phase 1, Gate, Phase 2, Phase 3) control their own transitions
  useEffect(() => {
    const handleScroll = () => {
      // Only detect transitions for Hero (0) and CTA (6)
      // All other sections are scroll-hijacked and control their own state
      const sections = document.querySelectorAll('[data-section]');

      // Check Hero section
      const heroRect = sections[0]?.getBoundingClientRect();
      if (heroRect && heroRect.top <= 100 && heroRect.top >= -100) {
        if (currentSection !== 0) {
          setCurrentSection(0);
          setVisibleSections(prev => new Set([...prev, 0]));
        }
      }

      // Check CTA section (only if we've completed all phases)
      const ctaRect = sections[6]?.getBoundingClientRect();
      if (ctaRect && ctaRect.top <= 100 && ctaRect.top >= -100) {
        if (currentSection !== 6) {
          setCurrentSection(6);
          setVisibleSections(prev => new Set([...prev, 6]));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  // Prevent native scroll/touch at document level when in scroll-hijacked sections
  useEffect(() => {
    const isHijacked = currentSection >= 0 && currentSection < 6;

    if (!isHijacked) return;

    // Prevent touchmove at document level
    const preventTouchScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    // Prevent wheel scroll at document level
    const preventWheelScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventTouchScroll, { passive: false });
    document.addEventListener('wheel', preventWheelScroll, { passive: false });

    // Also lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.removeEventListener('touchmove', preventTouchScroll);
      document.removeEventListener('wheel', preventWheelScroll);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [currentSection]);

  // Check if we're in a scroll-hijacked section (not CTA)
  const isScrollHijacked = currentSection >= 0 && currentSection < 6;

  return (
    <div
      className={`bg-[#02030d] text-white font-[family-name:var(--font-geist-sans)] ${isScrollHijacked ? 'overflow-hidden h-screen' : ''}`}
      style={isScrollHijacked ? { touchAction: 'none' } : undefined}
    >
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        html {
          scroll-behavior: smooth;
        }
        [data-section] {
          min-height: 100vh;
        }
      `}</style>

      {/* Process Template - Persistent Header */}
      {showTemplate && (
        <ProcessTemplate
          templateState={templateState}
          completedSteps={completedSteps}
          currentPhase={currentSection === 2 ? 1 : currentSection === 3 ? 0 : currentSection === 4 ? 2 : currentSection === 5 ? 3 : 3}
          highlightBucket={highlightBucket}
        />
      )}

      {/* Overall Progress - below template */}
      <div className="fixed top-0 left-0 right-0 h-0.5 md:h-1 bg-white/10 z-50" style={{ top: showTemplate ? '70px' : '0' }}>
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>

      {/* Reset Button - Always visible */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => handleReset(true)}
          className="group flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          title="Reset & start over"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-xs font-medium hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Section 0: Hero (Scroll Hijacked) */}
      <section data-section>
        <ScrollHijackedHero
          isActive={currentSection === 0}
          onContinue={handleHeroContinue}
        />
      </section>

      {/* Section 1: Framework Intro (Scroll Hijacked) */}
      <section data-section>
        <FrameworkIntro
          isActive={currentSection === 1}
          onContinue={handleFrameworkContinue}
          onScrollBack={() => handleScrollBack(1)}
        />
      </section>

      {/* Section 2: Phase 1 (Scroll Hijacked) */}
      <section data-section>
        <ScrollHijackedPhase
          phase={phases[0]}
          isActive={currentSection === 2}
          onComplete={() => handlePhaseComplete(0)}
          onScrollBack={() => handleScrollBack(2)}
          onStepComplete={handleStepComplete}
          onStepRemove={handleStepRemove}
          showTemplate={showTemplate}
          onIntroExit={handleIntroExit}
        />
      </section>

      {/* Section 3: Executive Gate (Scroll Hijacked with steps) */}
      <section data-section>
        <ExecutiveGate
          isActive={currentSection === 3}
          onComplete={handleGateComplete}
          onScrollBack={() => handleScrollBack(3)}
          onStepComplete={handleStepComplete}
          onStepRemove={handleStepRemove}
          showTemplate={showTemplate}
          onIntroExit={handleIntroExit}
        />
      </section>

      {/* Section 4: Phase 2 (Scroll Hijacked) */}
      <section data-section>
        <ScrollHijackedPhase
          phase={phases[1]}
          isActive={currentSection === 4}
          onComplete={() => handlePhaseComplete(1)}
          onScrollBack={() => handleScrollBack(4)}
          onStepComplete={handleStepComplete}
          onStepRemove={handleStepRemove}
          showTemplate={showTemplate}
          onIntroExit={handleIntroExit}
        />
      </section>

      {/* Section 5: Phase 3 (Scroll Hijacked) */}
      <section data-section>
        <ScrollHijackedPhase
          phase={phases[2]}
          isActive={currentSection === 5}
          onComplete={() => handlePhaseComplete(2)}
          onScrollBack={() => handleScrollBack(5)}
          onStepComplete={handleStepComplete}
          onStepRemove={handleStepRemove}
          showTemplate={showTemplate}
          onIntroExit={handleIntroExit}
        />
      </section>

      {/* Section 6: CTA */}
      <section data-section className="min-h-[60vh] flex items-center justify-center relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-[#02030d]">
        <div className="text-center max-w-3xl">
          <h2
            className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-700 ${
              visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Ready to Define Your Outcomes?
          </h2>
          <p
            className={`text-base md:text-xl text-gray-400 mb-8 md:mb-10 transition-all duration-700 ${
              visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            The Edge Engage Execution Method transforms ideas into measurable impact through systematic collaboration.
          </p>
          <button
            type="button"
            className={`px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-white font-semibold text-base md:text-lg hover:shadow-xl hover:shadow-teal-500/25 transition-all hover:scale-105 ${
              visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <div className="h-20 bg-[#02030d]" />
    </div>
  );
}
