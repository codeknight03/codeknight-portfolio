import { SliceZone } from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";
import Button from "./Button";

export default function ContentBody({
    page,
}: {
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
    const formattedDate = formatDate(page.data.date);

    // Check if page is of type ProjectDocument
    const isProjectDocument = (page as Content.ProjectDocument).tags !== undefined;

    return (
        <Bounded as="article">
            <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
                <Heading as="h1">{page.data.title}</Heading>
                <div className="flex justify-between mt-10">
                    <div className="flex gap-4 text-yellow-400 ">
                        {page.tags.map((tag, index) => (
                            <span key={index} className="text-xl font-bold">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* Check if page is of type ProjectDocument before accessing go_to_label */}
                    {isProjectDocument && isFilled.keyText(page.data.go_to_label) && isFilled.link(page.data.project_link) && (
                        <Button label={page.data.go_to_label} linkField={page.data.project_link} />
                    )}
                </div>
                <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
                    {formattedDate}
                </p>
                <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
                    <SliceZone slices={page.data.slices} components={components} />
                </div>
            </div>
        </Bounded>
    );
}

