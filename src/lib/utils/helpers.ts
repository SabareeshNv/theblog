import { number } from "astro/zod";

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

export function unslugify(slug: string): string {
  return slug
    .replace(/\-/g, " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
}

export function formatDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// This function will return an object with name and its sluggified form
// To make typescript happy ( The shape of data is defined here)
interface nameSlug {
  name: string;
  slug: string;
}
export function generateTagData(tags: string[]): nameSlug[] {
  let tagData: nameSlug[] = [];
  tags.forEach((tag) => {
    tagData.push({
      name: tag,
      slug: `${slugify(tag)}`,
    });
  });
  return tagData;
}

// This function filter out the posts according
// to conditions in the parameters specified.
export function filterPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined, // default is nolimit; if need, pass a number eg: 5
  } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { pubDate, draft } = post.data;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(pubDate) > new Date()) return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate)
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
