import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Project`.
 */
export type ProjectProps = SliceComponentProps<Content.ProjectSlice>;

/**
 * Component for "Project" Slices.
 */
const Project = ({ slice }: ProjectProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="max-w-prose">
                <PrismicRichText field={slice.primary.description} />
            </div>
        </section>
    );
};

export default Project;
