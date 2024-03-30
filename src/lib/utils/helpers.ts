import { getCollection, type CollectionEntry } from "astro:content";

/*  This function return a text in its slugified form  */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

/*  This function return a text in its Un-Slugified form  */
export function unslugify(slug: string): string {
    return slug
        .replace(/\-/g, " ")
        .replace(
            /\w\S*/g,
            (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        );
}

/*  This function will return an array of objects 
    with name and its sluggified form               */
export function generateTagData(
    tags: string[]
): { name: string; slug: string }[] {
    return tags.map((tag) => ({ name: tag, slug: slugify(tag) }));
}

/*  This function filter out the posts according
    to conditions in the parameters specified.      */
interface FilterOptions {
    filterOutDrafts?: boolean;
    filterOutFuturePosts?: boolean;
    sortByDate?: boolean;
    limit?: number;
}

export function filterPosts(
    posts: CollectionEntry<"blog">[],
    options: FilterOptions = {}
): CollectionEntry<"blog">[] {
    const {
        filterOutDrafts = true,
        filterOutFuturePosts = true,
        sortByDate = true,
        limit,
    } = options;

    const filteredPosts: CollectionEntry<"blog">[] = posts.filter((post) => {
        //Filter out drafts
        if (filterOutDrafts && post.data.draft) return false;
        // Filter out future posts ,ie date that exceeds todays date
        if (filterOutFuturePosts && new Date(post.data.pubDate) > new Date())
            return false;

        return true;
    });

    if (sortByDate) {
        filteredPosts.sort(
            (a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate)
        );
    } else {
        filteredPosts.sort(() => Math.random() - 0.5);
    }

    if (limit !== undefined) {
        return filteredPosts.slice(0, limit);
    }

    return filteredPosts;
}

export async function fetchAndFilterPosts() {
    return (filterPosts(await getCollection("blog")));
}
