import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles, Sliders, TrendingUp, Play } from 'lucide-react';
import { PortfolioCarouselVideo } from '../data/portfolioData';

interface CircularPortraitOrbitProps {
  videos: PortfolioCarouselVideo[];
  onSelectProject: (showcaseId: string) => void;
  orbitSpeed?: number; // cards per second
  direction?: 1 | -1;
  compact?: boolean;
  aspectRatio?: '9:16' | '16:9';
  mode?: 'arc' | 'ring';
}

function PortraitVideoPlayer({
  video,
  isPlaying,
  isZoomed,
}: {
  video: PortfolioCarouselVideo;
  isPlaying: boolean;
  isZoomed: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;

    if (!isPlaying) {
      player.pause();
      return;
    }

    void player.play().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.warn(`Unable to play portfolio video "${player.currentSrc}".`, error);
      }
    });
  }, [isPlaying, video.src]);

  return (
    <video
      ref={videoRef}
      src={video.src}
      poster={video.poster || undefined}
      muted
      loop
      playsInline
      preload={isPlaying ? 'auto' : 'metadata'}
      style={{
        transform: isZoomed ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        transformOrigin: 'center',
      }}
      className={`w-full h-full ${
        video.fit === 'contain' ? 'object-contain' : 'object-cover'
      } pointer-events-none select-none`}
    />
  );
}

/**
 * Continuous 3D circular video-card orbit, used with portrait and landscape cards.
 * - Preserves the selected card aspect ratio without changing the video source.
 * - Continuously orbits around the center via GPU-accelerated 3D transforms in requestAnimationFrame.
 * - Hovering a portrait card smoothly zooms both the card and its video without
 *   stopping the overall circular orbit animation.
 * - Supports mobile/tablet tap interaction.
 */
export function CircularPortraitOrbit({
  videos,
  onSelectProject,
  orbitSpeed = 0.22,
  direction = 1,
  compact = false,
  aspectRatio = '9:16',
  mode = 'arc',
}: CircularPortraitOrbitProps) {
  const total = videos.length;
  const isPortrait = aspectRatio === '9:16';
  const isRing = mode === 'ring';
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tappedId, setTappedId] = useState<number | null>(null);
  const [isVisibleInViewport, setIsVisibleInViewport] = useState<boolean>(false);
  const initialCenterIndex = Math.floor(total / 2) % total;
  const [autoPlayId, setAutoPlayId] = useState<number | null>(
    () => videos[initialCenterIndex]?.id ?? null
  );
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardOrbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef<number>(isRing ? 0 : total % 2 === 1 ? 0.5 : 0);
  const lastTimeRef = useRef<number | null>(null);
  const orbitTrackRef = useRef<HTMLDivElement | null>(null);
  const hoveredIdRef = useRef<number | null>(null);
  const tappedIdRef = useRef<number | null>(null);
  const autoPlayIdRef = useRef<number | null>(videos[initialCenterIndex]?.id ?? null);

  const activeFocusId = hoveredId ?? tappedId ?? autoPlayId;

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    tappedIdRef.current = tappedId;
  }, [tappedId]);

  // Pause offscreen video decoding only when scrolled completely out of view
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisibleInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisibleInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.02 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous 60fps GPU-accelerated circular orbit loop.
  // The orbit stays continuous while scrolling and pauses when out of view.
  useEffect(() => {
    let rafId: number;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateOrbitPositions = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      if (isVisibleInViewport && total > 0) {
        if (!motionPreference.matches) {
          const ringSpeed = isRing ? Math.min(orbitSpeed, 0.12) : orbitSpeed;
          phaseRef.current = (phaseRef.current + dt * ringSpeed * direction + total) % total;
        }

        const stageWidth = stageRef.current?.clientWidth || 1200;
        const isSmallScreen = stageWidth < 640;
        const isMediumScreen = stageWidth >= 640 && stageWidth < 1024;

        if (isRing) {
          if (orbitTrackRef.current) {
            orbitTrackRef.current.style.transform = `rotateY(${((phaseRef.current * 360) / total).toFixed(2)}deg)`;
          }

          const frontIndex = ((Math.round(initialCenterIndex - phaseRef.current) % total) + total) % total;
          const centerVideoId = videos[frontIndex]?.id ?? null;
          if (centerVideoId !== autoPlayIdRef.current) {
            autoPlayIdRef.current = centerVideoId;
            setAutoPlayId(centerVideoId);
          }

          const cardWidth = cardOrbitRefs.current[0]?.offsetWidth ?? Math.min(stageWidth * 0.82, 420);
          const radius = cardWidth / (2 * Math.tan(Math.PI / total)) * 1.08;
          const rotationDegrees = (phaseRef.current * 360) / total;

          for (let i = 0; i < total; i++) {
            const el = cardOrbitRefs.current[i];
            if (!el) continue;

            const angle = ((i - initialCenterIndex) * 360) / total;
            const frontness = Math.cos(((angle + rotationDegrees) * Math.PI) / 180);
            el.style.marginLeft = `${-el.offsetWidth / 2}px`;
            el.style.marginTop = `${-el.offsetHeight / 2}px`;
            el.style.transform = `rotateY(${angle.toFixed(2)}deg) translateZ(${radius.toFixed(2)}px)`;
            el.style.opacity = String(Math.max(0.35, 0.7 + frontness * 0.3));
            el.style.zIndex = String(Math.round(50 + frontness * 50));
            el.style.pointerEvents = frontness < -0.45 ? 'none' : 'auto';
          }
        } else {
        // Horizontal spacing along the circular arc
        const baseStepX = isPortrait
          ? isSmallScreen
            ? stageWidth * 0.34
            : isMediumScreen
              ? stageWidth * 0.19
              : Math.min(stageWidth * 0.145, 192)
          : isSmallScreen
            ? stageWidth * 0.58
            : isMediumScreen
              ? stageWidth * 0.31
              : Math.min(stageWidth * 0.29, 340);

        const halfN = total / 2;
        const centerIndex = Math.round(phaseRef.current + halfN) % total;
        const centerVideoId = videos[centerIndex]?.id ?? null;
        if (centerVideoId !== autoPlayIdRef.current) {
          autoPlayIdRef.current = centerVideoId;
          setAutoPlayId(centerVideoId);
        }

        for (let i = 0; i < total; i++) {
          const el = cardOrbitRefs.current[i];
          if (!el) continue;

          const videoId = videos[i].id;
          const isFocused =
            hoveredIdRef.current === videoId ||
            tappedIdRef.current === videoId ||
            autoPlayIdRef.current === videoId;

          // Continuous circular slot offset u in [-N/2, +N/2)
          const rawDiff = ((i - phaseRef.current) % total + total) % total;
          const u = rawDiff - halfN;
          const absU = Math.abs(u);

          // Panoramic concave 3D circular/cylindrical curve matching the reference video:
          // Outer cards curve forward and angle inward; center cards form the deep focal curve
          const x = isPortrait
            ? u * baseStepX + Math.sign(u) * Math.pow(absU, 1.75) * (isSmallScreen ? 4 : 9)
            : u * baseStepX + Math.sign(u) * Math.pow(absU, 1.65) * (isSmallScreen ? 3 : 7);
          const y = isPortrait
            ? isSmallScreen
              ? 10 - Math.pow(absU, 1.6) * 4
              : 24 - Math.pow(absU, 1.75) * 6.2
            : 8 - Math.pow(absU, 1.6) * (isSmallScreen ? 5 : 8);

          // Base scale along the 3D circular amphitheater arc
          const orbitScale = isPortrait
            ? isSmallScreen
              ? 0.84 + Math.pow(absU, 1.5) * 0.045
              : 0.76 + Math.pow(absU, 1.78) * 0.048
            : Math.max(0.58, 1.12 - Math.pow(absU, 1.12) * 0.18);

          // Depth (translateZ) and inward perspective rotation (rotateY)
          const z = isPortrait
            ? isSmallScreen
              ? -40 + Math.pow(absU, 1.6) * 14
              : -95 + Math.pow(absU, 1.8) * 24
            : 85 - Math.pow(absU, 1.4) * (isSmallScreen ? 82 : 100);

          // When hovered/focused, gently flatten rotation slightly for crisp viewing while keeping orbit position
          const rotateY = isPortrait
            ? isFocused
              ? -u * 4.5
              : -u * (isSmallScreen ? 8.5 : 10.8)
            : isFocused
              ? -u * 3.5
              : -u * (isSmallScreen ? 15 : 18);

          // Smooth wrap-around fade at the extreme outer boundaries of the circle
          const maxVisibleU = isPortrait
            ? isSmallScreen
              ? 2.2
              : 3.55
            : isSmallScreen
              ? 1.7
              : 2.4;
          let edgeOpacity = 1;
          if (absU > maxVisibleU) {
            edgeOpacity = Math.max(0, 1 - (absU - maxVisibleU) / 0.45);
          }

          // Proper depth z-index: hovered card is always highest (200), otherwise outer foreground wings stack naturally
          const computedZIndex = isFocused
            ? 200
            : isPortrait
              ? Math.round(40 + absU * 12)
              : Math.round(120 - absU * 20);

          el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale3d(${orbitScale.toFixed(4)}, ${orbitScale.toFixed(4)}, 1)`;
          el.style.opacity = edgeOpacity.toFixed(3);
          el.style.zIndex = String(computedZIndex);
          el.style.pointerEvents = edgeOpacity < 0.15 ? 'none' : 'auto';
        }
        }
      }

      if (isVisibleInViewport && !motionPreference.matches) {
        rafId = requestAnimationFrame(updateOrbitPositions);
      }
    };

    rafId = requestAnimationFrame(updateOrbitPositions);
    const handleMotionPreferenceChange = () => {
      if (!motionPreference.matches && isVisibleInViewport) {
        rafId = requestAnimationFrame(updateOrbitPositions);
      }
    };
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      cancelAnimationFrame(rafId);
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [isVisibleInViewport, total, orbitSpeed, direction, videos, isPortrait, isRing, initialCenterIndex]);

  return (
    <div
      ref={stageRef}
      onClick={() => {
        if (tappedId !== null) setTappedId(null);
      }}
      onMouseMove={(event) => {
        let hoveredVideoIndex = -1;
        let highestZIndex = Number.NEGATIVE_INFINITY;

        cardOrbitRefs.current.forEach((card, index) => {
          if (!card || card.style.pointerEvents === 'none') return;

          const bounds = card.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            return;
          }

          const zIndex = Number(card.style.zIndex) || 0;
          if (zIndex >= highestZIndex) {
            highestZIndex = zIndex;
            hoveredVideoIndex = index;
          }
        });

        const nextHoveredId =
          hoveredVideoIndex >= 0 ? videos[hoveredVideoIndex].id : null;
        setHoveredId((current) => (current === nextHoveredId ? current : nextHoveredId));
      }}
      onMouseLeave={() => setHoveredId(null)}
      className={`relative w-full overflow-visible flex items-center justify-center perspective-stage select-none ${
        isRing
          ? 'h-[360px] sm:h-[420px] lg:h-[480px]'
          : compact
          ? 'h-[360px] sm:h-[430px] lg:h-[480px]'
          : 'h-[370px] sm:h-[450px] md:h-[500px] lg:h-[540px]'
      }`}
    >
      {/* 3D Orbiting Track */}
      <div
        ref={orbitTrackRef}
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        style={isRing ? { transform: 'rotateY(0deg)' } : undefined}
      >
        {videos.map((video, index) => {
          const isFocused = activeFocusId === video.id;
          const isHovered = hoveredId === video.id || tappedId === video.id;
          const isDimmed = activeFocusId !== null && activeFocusId !== video.id;

          return (
            <div
              key={video.id}
              ref={(node) => {
                cardOrbitRefs.current[index] = node;
              }}
              style={{
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
                ...(isRing
                  ? {
                      left: '50%',
                      top: '50%',
                      backfaceVisibility: 'hidden' as const,
                    }
                  : {}),
              }}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => {
                setHoveredId((prev) => (prev === video.id ? null : prev));
              }}
              onClick={(e) => {
                e.stopPropagation();
                // On touch/mobile devices, first tap zooms in; second tap opens project inspector
                const isTouchDevice =
                  typeof window !== 'undefined' &&
                  window.matchMedia('(hover: none) and (pointer: coarse)').matches;
                if (isTouchDevice) {
                  if (tappedId === video.id) {
                    onSelectProject(video.showcaseId);
                  } else {
                    setTappedId(video.id);
                  }
                } else {
                  onSelectProject(video.showcaseId);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${video.title} - ${video.category} (${aspectRatio} video card)`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(video.showcaseId);
                }
              }}
              className={`absolute cursor-pointer ${
                isRing
                  ? 'w-[82vw] max-w-[420px] aspect-video'
                  : isPortrait
                  ? 'w-[142px] sm:w-[172px] md:w-[196px] lg:w-[214px] aspect-[9/16]'
                  : 'w-[82vw] max-w-[420px] aspect-video'
              }`}
            >
              {/* Inner card zoom and visual focus layer */}
              <div
                style={{
                  aspectRatio: isPortrait ? '9 / 16' : '16 / 9',
                  transform: isHovered
                    ? `scale3d(${isPortrait ? 1.12 : 1.08}, ${isPortrait ? 1.12 : 1.08}, 1) translate3d(0px, -10px, 45px)`
                    : 'scale3d(1, 1, 1) translate3d(0px, 0px, 0px)',
                  transition:
                    'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), filter 380ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 460ms cubic-bezier(0.22, 1, 0.36, 1), border-color 350ms ease',
                  filter: isDimmed
                    ? 'brightness(0.52) saturate(0.78)'
                    : isFocused
                      ? 'brightness(1.06) contrast(1.05)'
                      : 'brightness(0.95)',
                  willChange: 'transform, filter',
                }}
                className={`relative w-full h-full rounded-[22px] bg-[#151311] overflow-hidden ${
                  isFocused
                    ? 'border border-[#E4AE58]/75 shadow-[0_32px_80px_-12px_rgba(21, 19, 17,0.95),0_0_45px_-8px_rgba(228, 174, 88,0.42)]'
                    : 'border border-[#E4AE58]/[0.13] shadow-[0_22px_50px_-14px_rgba(21, 19, 17,0.88)]'
                }`}
              >
                {/* Preserve source framing when the card ratio differs from the video. */}
                <PortraitVideoPlayer
                  video={video}
                  isPlaying={isVisibleInViewport}
                  isZoomed={isPortrait && isHovered}
                />

                {/* Subtle Studio Specular Edge & Bottom Vignette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F2EEE6]/[0.08] via-transparent to-[#151311]/80"
                />

                {/* Top aspect-ratio badge on hover */}
                <div
                  className={`pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between transition-opacity duration-400 ${
                    isFocused ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded-full bg-[#332D26] text-[#F2EEE6] text-[10px] font-mono-tabular font-bold">
                    {aspectRatio}
                  </span>
                </div>

                {/* Bottom Card Info Overlay (Smoothly Revealed on Hover / Tap) */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 p-3.5 sm:p-4 bg-gradient-to-t from-[#151311]/95 via-[#151311]/70 to-transparent transition-all duration-400 ${
                    isFocused
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  <div className="text-[10px] font-mono-tabular text-[#C9BFAF] uppercase tracking-wider mb-0.5 truncate">
                    {video.category}
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-[#F2EEE6] leading-snug line-clamp-2 mb-2">
                    {video.title}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#E4AE58]">
                    <Play className="w-2.5 h-2.5 fill-[#E4AE58]" />
                    <span>INSPECT REEL</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface HeroVideoCarouselProps {
  videos: PortfolioCarouselVideo[];
  onSelectProject: (showcaseId: string) => void;
  onStartProject: () => void;
  onViewWork: () => void;
}

export default function HeroVideoCarousel({
  videos,
  onSelectProject,
  onStartProject,
  onViewWork,
}: HeroVideoCarouselProps) {
  return (
    <section
      className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 px-4 sm:px-6 select-none"
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
        const leftGlow = event.currentTarget.querySelector<HTMLElement>('.hero-parallax-glow-left');
        const rightGlow = event.currentTarget.querySelector<HTMLElement>('.hero-parallax-glow-right');
        const stage = event.currentTarget.querySelector<HTMLElement>('.hero-3d-stage');
        const leftX = (-pointerX * 24).toFixed(2);
        const leftY = (-pointerY * 20).toFixed(2);
        const rightX = (pointerX * 24).toFixed(2);
        const rightY = (pointerY * 20).toFixed(2);

        if (leftGlow) leftGlow.style.transform = `translate3d(${leftX}px, ${leftY}px, 0) rotate(-12deg)`;
        if (rightGlow) rightGlow.style.transform = `translate3d(${rightX}px, ${rightY}px, 0) rotate(12deg)`;
        if (stage) {
          stage.style.transform = `perspective(1400px) rotateX(${(pointerY * 1.2).toFixed(2)}deg) rotateY(${(-pointerX * 1.4).toFixed(2)}deg)`;
        }
      }}
      onPointerLeave={(event) => {
        event.currentTarget
          .querySelectorAll<HTMLElement>('.hero-parallax-glow-left, .hero-parallax-glow-right, .hero-3d-stage')
          .forEach((layer) => layer.style.removeProperty('transform'));
      }}
      style={{
        background: `
          radial-gradient(circle at 12% 8%, rgba(228, 174, 88, 0.12), transparent 34%),
          radial-gradient(circle at 88% 8%, rgba(228, 174, 88, 0.12), transparent 34%),
          radial-gradient(circle at 50% 45%, rgba(228, 174, 88, 0.07), transparent 48%),
          #151311
        `,
      }}
    >
      {/* Subtle Film Grain Overlay */}
      <div className="absolute inset-0 bg-film-grain pointer-events-none z-0" />

      {/* Top Left & Top Right Diagonal Warm Studio Light Streaks (From Reference Video) */}
      <div
        aria-hidden="true"
        className="hero-parallax-glow hero-parallax-glow-left pointer-events-none absolute -top-24 -left-24 w-[420px] h-[260px] rounded-full blur-[95px] bg-[#E4AE58]/12 z-0"
      />
      <div
        aria-hidden="true"
        className="hero-parallax-glow hero-parallax-glow-right pointer-events-none absolute -top-24 -right-24 w-[420px] h-[260px] rounded-full blur-[95px] bg-[#E4AE58]/12 z-0"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Hero Agency Typography & Dual Action Buttons */}
        <div className="text-center max-w-[860px] mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#C9BFAF] mb-4">
            <span>DEERGH HADIYAL</span>
            <span className="text-[#F2EEE6]/30">•</span>
            <span className="text-[#F2EEE6]">9:16 VERTICAL &amp; CINEMATIC STUDIO</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[66px] font-extrabold text-[#F2EEE6] tracking-[-0.035em] leading-[1.04] mb-5">
            VIDEO EDITING THAT
            <br />
            <span className="bg-gradient-to-r from-[#F2EEE6] via-[#F2EEE6] to-[#C9BFAF] bg-clip-text text-transparent">
              MAKES PEOPLE WATCH.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg font-medium text-[#C9BFAF] tracking-wide mb-3.5">
            Professional Video Editor • Creative Storyteller • Audience Growth Specialist
          </p>

          <p className="text-sm sm:text-base text-[#C9BFAF] font-normal leading-relaxed max-w-[640px] mx-auto mb-7">
            I transform raw footage into engaging visual experiences designed to capture attention,
            improve retention, and tell compelling stories.
          </p>

          {/* Reference Video Action Buttons: START A PROJECT & SEE OUR WORK / VIEW MY WORK */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-b from-[#E4AE58] to-[#C9BFAF] text-[#151311] rounded-xl hover:brightness-110 transition-all duration-350 hover:-translate-y-0.5 shadow-[0_10px_30px_-6px_rgba(228, 174, 88,0.55)] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={onViewWork}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#151311]/90 hover:bg-[#332D26] text-[#F2EEE6] hover:text-[#F2EEE6] border border-[#E4AE58]/15 hover:border-[#E4AE58]/50 rounded-xl backdrop-blur-md transition-all duration-350 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>VIEW MY WORK</span>
              <ArrowUpRight className="w-4 h-4 text-[#E4AE58]" />
            </button>
          </div>
        </div>

        {/* 9:16 PORTRAIT CONTINUOUS CIRCULAR ORBIT STAGE (Primary Visual Reference) */}
        <div className="hero-3d-stage">
          <CircularPortraitOrbit
            videos={videos}
            onSelectProject={onSelectProject}
            orbitSpeed={0.22}
            direction={1}
          />
        </div>

        {/* Bottom Feature Pill Bar from Reference Video: Short Video Editing • Content Strategy • Growth Optimization */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 sm:px-7 py-3 rounded-full bg-[#151311]/95 border border-[#E4AE58]/35 shadow-[0_12px_40px_-8px_rgba(228, 174, 88,0.22)] backdrop-blur-xl">
            <button
              type="button"
              onClick={onViewWork}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#F2EEE6] hover:text-[#F2EEE6] transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#E4AE58]" />
              <span>Short Video Editing</span>
            </button>

            <span className="w-1.5 h-1.5 rounded-full bg-[#E4AE58]" aria-hidden="true" />

            <button
              type="button"
              onClick={onViewWork}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#F2EEE6] hover:text-[#F2EEE6] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E4AE58]" />
              <span>Content Strategy</span>
            </button>

            <span className="w-1.5 h-1.5 rounded-full bg-[#E4AE58]" aria-hidden="true" />

            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#F2EEE6] hover:text-[#F2EEE6] transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#E4AE58]" />
              <span>Growth Optimization</span>
            </button>
          </div>

          <p className="text-[11px] font-mono-tabular text-[#C9BFAF]">
            Hover any 9:16 portrait reel for a smooth zoom • Circular orbit continues seamlessly • Click to inspect cuts
          </p>
        </div>
      </div>
    </section>
  );
}
