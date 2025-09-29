import * as React from 'react';
import * as LucideIcons from 'lucide-react';
import * as LucideLabIcons from '@lucide/lab';
import { createLucideIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaBrands from '@fortawesome/free-brands-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';

export type IconVariant = 'default' | 'circle' | 'circleFilled';
export type IconKit = 'lucide' | 'lucide-lab' | 'fa-brands';

export interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  name: string;
  kit?: IconKit;
  size?: number;
  strokeWidth?: number;
  /** Optional expliziter Rahmen (Border) für circle Varianten; überschreibt Auto-Berechnung */
  circleBorderWidth?: number;
  color?: string;
  variant?: IconVariant;
  className?: string;
  iconClassName?: string;
  /** Accessible text label. If provided, wrapper will get role="img" & aria-label. */
  ariaLabel?: string;
  /** Mark icon as decorative; adds aria-hidden unless ariaLabel is provided. */
  decorative?: boolean;
  /** Fallback content when icon name cannot be resolved */
  fallback?: React.ReactNode;
  circleColor?: string;
  circleFilledColor?: string;
  animation?: 'spin' | 'pulse' | 'bounce' | 'wiggle' | 'float' | 'draw' | 'scale' | 'lift';
  hoverAnimation?: 'scale' | 'lift' | 'rotate' | 'wiggle' | 'pulse';
  repeat?: number | 'infinite';
  animationDuration?: number;
  animationDelay?: number;
  ease?: any;
  draw?: boolean;
  drawDuration?: number;
  drawDelay?: number;
  drawEasing?: string;
  disableAnimations?: boolean;
  debugAnimations?: boolean;
  respectReducedMotion?: boolean;
  forceAnimations?: boolean;
  /** Optional external trigger ID: animation only runs while any element with data-icon-trigger=triggerId is hovered */
  triggerId?: string;
}

function normalize(name: string) {
  return name
    .replace(/[-_ ]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(.)/, (c) => c.toUpperCase());
}

const labCache = new Map<string, React.ComponentType<any>>();

function resolveLucide(name: string, lab = false) {
  const normalizedPascal = normalize(name);
  if (!lab) {
    return (LucideIcons as Record<string, any>)[normalizedPascal] ?? null;
  }
  const attempts: string[] = [];
  const pushUnique = (k: string) => { if (!attempts.includes(k)) attempts.push(k); };
  pushUnique(normalizedPascal);
  pushUnique(normalizedPascal.charAt(0).toLowerCase() + normalizedPascal.slice(1));
  pushUnique(name);
  pushUnique(name.toLowerCase());
  pushUnique(name.replace(/[-_ ]+/g, ''));
  for (let i = 0; i < attempts.length; i++) {
    const key = attempts[i];
    if (labCache.has(key)) return labCache.get(key)!;
    const raw = (LucideLabIcons as Record<string, any>)[key];
    if (!raw) continue;
    const iconNode = Array.isArray(raw) ? raw : raw.iconNode;
    if (!iconNode) continue;
    const Comp = createLucideIcon(normalizedPascal, iconNode as any);
    labCache.set(key, Comp);
    return Comp;
  }
  return null;
}

function resolveFaBrands(name: string) {
  const pascal = normalize(name);
  const key = `fa${pascal}`;
  return (FaBrands as Record<string, any>)[key] ?? null;
}

export const Icon: React.FC<IconProps> = ({
  name,
  kit,
  size = 20,
  strokeWidth = 2,
  circleBorderWidth,
  color,
  variant = 'default',
  className,
  iconClassName,
  ariaLabel,
  decorative,
  fallback,
  circleColor,
  circleFilledColor,
  animation,
  hoverAnimation,
  repeat = 'infinite',
  animationDuration = 1.5,
  animationDelay = 0,
  ease = undefined,
  draw,
  drawDuration = 1.2,
  drawDelay = 0,
  drawEasing = 'ease',
  disableAnimations = false,
  debugAnimations = false,
  respectReducedMotion = true,
  forceAnimations = false,
  triggerId,
  style,
  ...rest
}) => {
  const IconComp = React.useMemo(() => {
    const effectiveKit: IconKit = kit || 'lucide';
    switch (effectiveKit) {
      case 'lucide':
        return resolveLucide(name, false);
      case 'lucide-lab':
        return resolveLucide(name, true);
      case 'fa-brands':
        return resolveFaBrands(name);
      default:
        return null;
    }
  }, [name, kit]);

  if (!IconComp) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] Unknown icon: name="${name}" kit="${kit || 'lucide'}"`);
    }
    if (fallback) {
      return (
        <span
          className={['elunar-icon', className].filter(Boolean).join(' ')}
          data-missing-icon={name}
          aria-hidden={decorative && !ariaLabel ? true : undefined}
          role={ariaLabel ? 'img' : undefined}
          aria-label={ariaLabel}
          {...rest}
        >{fallback}</span>
      );
    }
    return null;
  }

  // Stroke clamped for consistency across sizes
  const iconStroke = Math.min(3, Math.max(1, strokeWidth));
  const isCircleVariant = (variant === 'circle' || variant === 'circleFilled');
  const BASE_RING_PCT = 7;       // base ring thickness (% of diameter)
  const BASE_PADDING_PCT = 12;   // inner spacing between ring and icon box
  const BASE_CIRCLE_STROKE_REF = 2;
  let ringPct = circleBorderWidth != null
    ? (circleBorderWidth / (size || 1)) * 100
    : BASE_RING_PCT * (iconStroke / BASE_CIRCLE_STROKE_REF);
  ringPct = Math.max(4.5, Math.min(20, ringPct));
  const maxRingForContent = 50 - (BASE_PADDING_PCT + 4); // mind. Iconradius 4 erhalten
  ringPct = Math.min(ringPct, maxRingForContent);
  const innerRadius = 50 - ringPct; // Innenkante Ring

  // Gap between ring and icon scales with ring thickness + stroke
  const gapPct = (ringPct * 0.25) + (iconStroke * 0.35); // weiter reduziert
  const effectiveGapPct = Math.min(innerRadius, gapPct); // nicht größer als innerRadius

  function hexToLuma(hex?: string) {
    if (!hex) return 0;
    let h = hex.trim();
    if (h.startsWith('#')) h = h.slice(1);
    if (h.length === 3) {
      h = h.split('').map(c => c + c).join('');
    }
    if (h.length !== 6) return 0;
    const r = parseInt(h.slice(0,2),16);
    const g = parseInt(h.slice(2,4),16);
    const b = parseInt(h.slice(4,6),16);
    return 0.2126*r + 0.7152*g + 0.0722*b;
  }

  const effectiveFilledBg = circleFilledColor || color;
  const effectiveOutlineBorder = circleColor || color;

  const luma = hexToLuma(effectiveFilledBg || effectiveOutlineBorder);
  const needsDarkText = luma > 180;
  const effectiveIconColor = variant === 'circleFilled'
    ? (circleFilledColor
        ? (needsDarkText ? '#111' : '#fff')
        : (color || circleColor)
      )
    : (color || circleColor);

  const hasExplicitFilled = !!effectiveFilledBg;
  const circleBg = variant === 'circleFilled' && hasExplicitFilled ? effectiveFilledBg : undefined;
  const circleBorderColor = effectiveOutlineBorder || effectiveFilledBg || color;
  const circleTextColor = effectiveIconColor;

  const variantClasses: Record<IconVariant, string> = {
    default: '',
    circle: 'elunar-icon--circle',
    circleFilled: 'elunar-icon--circleFilled'
  };

  const outerSizeStyle = isCircleVariant ? { width: `${size}px`, height: `${size}px` } : {};
  const SCALE_FACTOR = 0.9;
  let innerSize = !isCircleVariant
    ? size
    : ((innerRadius - effectiveGapPct) / 50) * size * SCALE_FACTOR;
  // Verhindere Subpixel-Jitter: runde auf .5 Schritte
  innerSize = Math.max(4, Math.round(innerSize * 2) / 2);
  const pxInner = `${innerSize}px`;
  // (pxInner bereits oben berechnet)

  const prefersReducedMotion = useReducedMotion();
  const effectiveDisable = disableAnimations || (respectReducedMotion && prefersReducedMotion && !forceAnimations);
  const wantsDraw = (draw || animation === 'draw');
  const isDrawCapable = !effectiveDisable && wantsDraw;
  const enableBaseAnimation = !effectiveDisable && animation && animation !== 'draw';

  const motionProps: any = React.useMemo(() => {
    if (!enableBaseAnimation && !hoverAnimation && !isDrawCapable) return {};
    const mp: any = {};
    const rep = repeat === 'infinite' ? Infinity : repeat;
    const baseTransition = { repeat: rep, repeatType: 'loop' as const, delay: animationDelay };

    if (enableBaseAnimation) {
      switch (animation) {
        case 'spin':
          mp.initial = { rotate: 0 };
          mp.animate = { rotate: 360 };
          mp.transition = { ...baseTransition, ease: 'linear', duration: animationDuration };
          break;
        case 'pulse':
          mp.initial = { scale: 1 };
          mp.animate = { scale: [1, 1.08, 1] };
          mp.transition = { ...baseTransition, duration: animationDuration, ease: ease || 'easeInOut' };
          break;
        case 'bounce':
          mp.initial = { y: 0 };
          mp.animate = { y: [0, -6, 0] };
          mp.transition = { ...baseTransition, duration: animationDuration, ease: ease || 'easeInOut' };
          break;
        case 'wiggle':
          mp.initial = { rotate: 0 };
          mp.animate = { rotate: [0, -10, 10, -6, 6, -2, 2, 0] };
          mp.transition = { ...baseTransition, duration: animationDuration, ease: ease || 'easeInOut' };
          break;
        case 'float':
          mp.initial = { y: 0 };
          mp.animate = { y: [0, -4, 0, -2, 0] };
          mp.transition = { ...baseTransition, duration: animationDuration * 1.8, ease: ease || 'easeInOut' };
          break;
        case 'scale':
          mp.initial = { scale: 1 };
          mp.animate = { scale: [1, 1.1, 1] };
          mp.transition = { ...baseTransition, duration: animationDuration, ease: ease || 'easeInOut' };
          break;
        case 'lift':
          mp.initial = { y: 0, scale: 1 };
          mp.animate = { y: [0, -6, 0], scale: [1, 1.05, 1] };
          mp.transition = { ...baseTransition, duration: animationDuration, ease: ease || 'easeInOut' };
          break;
      }
    }

    if (!effectiveDisable && hoverAnimation) {
      const whileHover: any = {};
      if (hoverAnimation === 'scale') whileHover.scale = 1.1;
      if (hoverAnimation === 'lift') { whileHover.y = -4; whileHover.scale = 1.05; }
      if (hoverAnimation === 'rotate') whileHover.rotate = 12;
      if (hoverAnimation === 'wiggle') whileHover.rotate = [0, -10, 10, -6, 6, -2, 2, 0];
      if (hoverAnimation === 'pulse') whileHover.scale = [1, 1.08, 1];
      mp.whileHover = whileHover;
      mp.transition = mp.transition || { duration: 0.5 };
    }

    if (enableBaseAnimation) {
      mp.style = { willChange: 'transform' };
      if (animation === 'spin') {
        mp.animate = { rotate: 360 };
      }
    }
    return mp;
  }, [enableBaseAnimation, hoverAnimation, animation, repeat, animationDelay, animationDuration, ease, effectiveDisable, isDrawCapable]);

  const [triggerActive, setTriggerActive] = React.useState(false);

  // External trigger handling
  React.useEffect(() => {
    if (!triggerId) return;
    const selector = `[data-icon-trigger="${triggerId}"]`;
  const handleEnter = () => { setTriggerActive(true); };
  const handleLeave = () => { setTriggerActive(false); };
    const attach = () => {
      const nodes = document.querySelectorAll(selector);
      nodes.forEach(n => {
        n.addEventListener('mouseenter', handleEnter);
        n.addEventListener('focusin', handleEnter);
        n.addEventListener('mouseleave', handleLeave);
        n.addEventListener('focusout', handleLeave);
      });
      return nodes;
    };
    const nodes = attach();
    const mo = new MutationObserver(() => {
      // Re-attach in case DOM changed
      nodes.forEach(n => {
        n.removeEventListener('mouseenter', handleEnter);
        n.removeEventListener('focusin', handleEnter);
        n.removeEventListener('mouseleave', handleLeave);
        n.removeEventListener('focusout', handleLeave);
      });
      attach();
    });
    mo.observe(document.documentElement, { subtree: true, childList: true });
    return () => {
      mo.disconnect();
      const current = document.querySelectorAll(selector);
      current.forEach(n => {
        n.removeEventListener('mouseenter', handleEnter);
        n.removeEventListener('focusin', handleEnter);
        n.removeEventListener('mouseleave', handleLeave);
        n.removeEventListener('focusout', handleLeave);
      });
    };
  }, [triggerId]);

  const externallyControlled = !!triggerId;
  const activeAnimation = externallyControlled ? triggerActive : true;
  const runBase = activeAnimation && enableBaseAnimation;
  const runHover = activeAnimation && hoverAnimation;
  const runDraw = activeAnimation && isDrawCapable;
  const useMotion = (runBase || runHover || runDraw); // draw itself is manual stroke animation, not motion transforms
  const Wrapper: any = 'span'; // wrapper now always static layout
  const wrapperRef = React.useRef<HTMLSpanElement | null>(null);
  const Inner: any = useMotion ? motion.span : 'span';
  const wrapperKey = React.useMemo(() => `${name}-${animation || 'none'}-${hoverAnimation || 'nohover'}`, [name, animation, hoverAnimation]);

  // Draw animation effect (only when runDraw true). Ensure initial state is fully hidden (stroke not visible).
  React.useEffect(() => {
    if (!runDraw) return;
    if (kit === 'fa-brands') return;
    const el = wrapperRef.current;
    if (!el) return;
    const svgs = el.querySelectorAll('svg');
    svgs.forEach(svg => {
      const targets = svg.querySelectorAll('path, line, polyline, polygon, circle, rect, ellipse');
      targets.forEach((p: any, index) => {
        try {
          let length = 0;
          if (p.getTotalLength) {
            length = p.getTotalLength();
          } else {
            length = 100;
          }
          if (!isFinite(length) || length === 0) length = 100; // fallback
          p.style.strokeDasharray = length + 'px';
          p.style.strokeDashoffset = length + 'px';
          // Hide stroke completely before animation kicks in
          p.style.transition = 'none';
          p.style.strokeOpacity = '0';
          // Force a reflow to make sure transition applies after we set initial hidden state
          p.getBoundingClientRect();
          const totalDelay = (drawDelay * 1000) + (index * ((drawDuration * 1000) / (targets.length + 1)));
          setTimeout(() => {
            p.style.transition = `stroke-dashoffset ${drawDuration}s ${drawEasing}, stroke-opacity 0.2s linear`;
            p.style.strokeOpacity = '1';
            p.style.strokeDashoffset = '0px';
          }, totalDelay);
        } catch { /* ignore */ }
      });
    });
  }, [runDraw, kit, name, drawDuration, drawDelay, drawEasing]);

  // Reset stroke when draw deactivates so it can replay (and hide again)
  React.useEffect(() => {
    if (!wantsDraw) return;
    if (runDraw) return; // only reset when turned off
    const el = wrapperRef.current;
    if (!el) return;
    const svgs = el.querySelectorAll('svg');
    svgs.forEach(svg => {
      const targets = svg.querySelectorAll('path, line, polyline, polygon, circle, rect, ellipse');
      targets.forEach((p: any) => {
        try {
          if (p.getTotalLength) {
            const length = p.getTotalLength();
            p.style.strokeDasharray = length + 'px';
            p.style.strokeDashoffset = length + 'px';
            p.style.strokeOpacity = '0';
          }
        } catch { /* ignore */ }
      });
    });
  }, [runDraw, wantsDraw]);

  if (debugAnimations && typeof window !== 'undefined') {
  console.log('[Icon debug]', { name, animation, motionProps, enableBaseAnimation, runDraw, wantsDraw, effectiveDisable, prefersReducedMotion });
  }

  const accessibilityProps: any = {};
  if (ariaLabel) {
    accessibilityProps.role = 'img';
    accessibilityProps['aria-label'] = ariaLabel;
  } else if (decorative) {
    accessibilityProps['aria-hidden'] = true;
  }

  return (
    <Wrapper
      key={wrapperKey}
      ref={wrapperRef}
      data-variant={variant}
      className={[
        'elunar-icon',
        variantClasses[variant],
        className
      ].filter(Boolean).join(' ')}
      style={{
        // Inline fallback layout styles (so that missing CSS import still yields correct appearance)
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        ...outerSizeStyle,
        ...(isCircleVariant ? {
          position: 'relative',
          borderRadius: 9999,
          background: circleBg,
          color: circleTextColor,
          boxSizing: 'border-box'
        } : null),
        ...(style || {}), // user styles last for overriding
      }}
      {...accessibilityProps}
      {...rest}
    >
      {isCircleVariant && (
        <svg
          className="elunar-icon__ring"
          width={size}
          height={size}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0, display: 'block' }}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask id={`ik-ring-${name}`}> 
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <circle cx={50} cy={50} r={innerRadius} fill="black" />
            </mask>
          </defs>
          <circle cx={50} cy={50} r={50} fill={circleBorderColor} mask={`url(#ik-ring-${name})`} />
          {variant === 'circleFilled' && (
            <circle cx={50} cy={50} r={innerRadius} fill={circleBg || 'transparent'} />
          )}
        </svg>
      )}
      <Inner
        className={[
          'elunar-icon__inner',
          iconClassName
        ].filter(Boolean).join(' ')}
  data-trigger={triggerId || undefined}
  data-anim={runBase && animation ? animation : undefined}
  data-hover-anim={runHover ? hoverAnimation : undefined}
        style={{
          width: pxInner,
          height: pxInner,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: isCircleVariant ? 'relative' : undefined,
          ...(useMotion ? {} : {}),
        }}
        {...(useMotion ? motionProps : {})}
      >
        {kit === 'fa-brands' && IconComp ? (
          <FontAwesomeIcon
            icon={IconComp}
            className={['elunar-icon__svg'].join(' ')}
            style={{ width: '100%', height: '100%', fontSize: pxInner, color: circleTextColor ?? color }}
          />
        ) : IconComp ? (
          <IconComp
            className={['elunar-icon__svg'].filter(Boolean).join(' ')}
            width={pxInner}
            height={pxInner}
            strokeWidth={iconStroke}
            color={circleTextColor}
          />
        ) : null}
      </Inner>
    </Wrapper>
  );
};

Icon.displayName = 'Icon';
