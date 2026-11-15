import { Children, isValidElement, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const offsets = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
    scale: 'scale(0.9)',
};

export function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    once = true,
    style,
    ...props
}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
                    return () => clearTimeout(timer);
                }
                if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay, once]);

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all ease-out',
                isVisible ? 'opacity-100' : 'opacity-0',
                className
            )}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
                transform: isVisible ? 'none' : (offsets[direction] ?? offsets.up),
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export function StaggerContainer({ children, className, stagger = 0.1, ...props }) {
    return (
        <div className={cn('space-y-4', className)} {...props}>
            {typeof children === 'function'
                ? children({ stagger })
                : Children.map(children, (child, index) =>
                      isValidElement(child) ? (
                          <ScrollReveal key={child.key || index} delay={index * stagger}>
                              {child}
                          </ScrollReveal>
                      ) : (
                          child
                      )
                  )}
        </div>
    );
}
