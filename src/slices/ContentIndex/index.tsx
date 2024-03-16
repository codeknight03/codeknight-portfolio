import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading"
import Bounded from "@/components/Bounded";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";


export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {
    const client = createClient();
    const projects = await client.getAllByType("project")
    const blogPosts = await client.getAllByType("project")

    const contentType = slice.primary.content_type || "Projects"

    const items = contentType === "Projects" ? projects : blogPosts

    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <Heading size="xl" className="mb-8">
                {slice.primary.heading}
            </Heading>
            {isFilled.richText(slice.primary.description) && (
                <div className="prose prose-xl prose-invert mb-10">
                    <PrismicRichText field={slice.primary.description} />
                </div>
            )}
            <ContentList items={items} contentType={contentType} fallbackItemImage={slice.primary.fallback_item_image} viewMoreText={slice.primary.view_more_text} />
        </Bounded>
    );
};

export default ContentIndex;
