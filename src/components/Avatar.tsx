"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

export default function Avatar({
    image,
    className,
}: {
    image: ImageField;
    className?: string;
}) {
    const component = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(
                ".avatar",
                {
                    opacity: 0,
                    scale: 1.4,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.3,
                    ease: "power3.inOut",
                },
            );

            window.onmousemove = (e) => {
                if (!component.current) return; // no component, no animation!
                const componentRect = (
                    component.current as HTMLElement
                ).getBoundingClientRect();
                const componentCenterX = componentRect.left + componentRect.width / 2;

                let componentPercent = {
                    x: (e.clientX - componentCenterX) / componentRect.width / 2,
                };

                let distFromCenterX = 1 - Math.abs(componentPercent.x);

                gsap
                    .timeline({
                        defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
                    })
                    .to(
                        ".avatar",
                        {
                            rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
                            duration: 0.5,
                        },
                        0,
                    )
                    .to(
                        ".highlight",
                        {
                            opacity: distFromCenterX - 0.7,
                            x: -10 + 20 * componentPercent.x,
                            duration: 0.5,
                        },
                        0,
                    );
            };
        }, component);
        return () => ctx.revert(); // cleanup!
    }, []);

    return (
        <div ref={component} className={clsx("relative h-full w-full", className)}>
            <div
                className="avatar aspect-square overflow-hidden rounded-3xl opacity-0"
                style={{ perspective: "500px", perspectiveOrigin: "100% 100%" }}
            >
                <PrismicNextImage
                    field={image}
                    className="avatar-image h-full w-full object-fill"
                    imgixParams={{ q: 90 }}
                />
            </div>
        </div>
    );
}
