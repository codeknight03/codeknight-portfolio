"use client"
import React, { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { gsap } from "gsap/gsap-core";

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps): JSX.Element => {
    const sliderRef = useRef<HTMLDivElement>(null);

    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Heading size="lg" as="h2" className="mb-6">
                {slice.primary.heading}
            </Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4 ml-6">
                {slice.items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 flex items-center justify-center rounded-md shadow-md slide-box"
                    >
                        <PrismicImage
                            field={item.techlogo}
                            className="w-full h-auto rounded-md"
                            style={{ minWidth: "100%", minHeight: "100%" }}
                        />
                    </div>
                ))}
            </div>
        </Bounded>
    );
};

export default TechList;

