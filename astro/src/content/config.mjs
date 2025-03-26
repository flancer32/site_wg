import {defineCollection, z} from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        image: z.string().optional(),
    }),
});

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.string().transform((str) => new Date(str)),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const docs = defineCollection({
    type: 'content',
    schema: undefined,
});

export const collections = {blog, posts, docs};
