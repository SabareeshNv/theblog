import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { filterPosts } from "@utils/helpers";

export async function GET(context) {
  const blog = await getCollection("blog");
  const filteredPosts = filterPosts(blog);
  return rss({
    title: "The Lone Voice",
    description: "Welcome to my humble blog!",
    site: context.site,
    items: filteredPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    stylesheet: "/rss/styles.xsl",
  });
}
