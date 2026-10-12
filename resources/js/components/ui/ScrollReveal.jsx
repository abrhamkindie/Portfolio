

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 0.6,
    direction = 'up',
    once = true,
    ...props
}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay * 1000);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay, once]);

    const directionStyles = {
        up: { transform: 'translateY(40px)' },
        down: { transform: 'translateY(-40px)' },
        left: { transform: 'translateX(40px)' },
        right: { transform: 'translateX(-40px)' },
        scale: { transform: 'scale(0.9)' },
    };

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-700 ease-out',
                isVisible
                    ? 'opacity-100 transform-none'
                    : 'opacity-0',
                directionStyles[direction],
                className
            )}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
                ...props.style,
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
            {typeof children === 'function' ? children({ stagger }) : (
                React.Children.map(children, (child, index) => (
                    React.isValidElement(child) ? (
                        <ScrollReveal key={child.key || index} delay={index * stagger}>
                            {child}
                        </ScrollReveal>
                    ) : (
                        child
                    )
                ))
            )}
        </div>
    );
}

import React from 'react';