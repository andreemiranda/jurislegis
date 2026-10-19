import { z } from 'zod';

export const renderedStringSchema = z
  .object({
    rendered: z.string().default(''),
    protected: z.boolean().optional(),
  })
  .passthrough();

export const wpMediaDetailsSchema = z
  .object({
    width: z.number().optional(),
    height: z.number().optional(),
    file: z.string().optional(),
    sizes: z
      .record(
        z.string(),
        z
          .object({
            file: z.string().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            mime_type: z.string().optional(),
            source_url: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
  })
  .passthrough();

export const wpMediaSchema = z
  .object({
    id: z.number(),
    date: z.string().optional(),
    slug: z.string().default(''),
    link: z.string().default(''),
    title: renderedStringSchema.optional(),
    caption: renderedStringSchema.optional(),
    alt_text: z.string().optional().default(''),
    media_type: z.string().optional(),
    mime_type: z.string().optional(),
    source_url: z.string().default(''),
    media_details: wpMediaDetailsSchema.optional(),
  })
  .passthrough();

export const wpCategorySchema = z
  .object({
    id: z.number(),
    count: z.number().default(0),
    description: z.string().default(''),
    link: z.string().default(''),
    name: z.string().default(''),
    slug: z.string().default(''),
    parent: z.number().default(0),
  })
  .passthrough();

export const wpTagSchema = z
  .object({
    id: z.number(),
    count: z.number().default(0),
    description: z.string().default(''),
    link: z.string().default(''),
    name: z.string().default(''),
    slug: z.string().default(''),
  })
  .passthrough();

export const wpUserSchema = z
  .object({
    id: z.number(),
    name: z.string().default(''),
    url: z.string().default(''),
    description: z.string().default(''),
    link: z.string().default(''),
    slug: z.string().default(''),
    avatar_urls: z.record(z.string(), z.string()).optional(),
  })
  .passthrough();

export const wpEmbeddedSchema = z
  .object({
    author: z.array(wpUserSchema).optional(),
    'wp:featuredmedia': z.array(wpMediaSchema).optional(),
    'wp:term': z.array(z.array(z.any())).optional(),
  })
  .passthrough();

export const wpPostSchema = z
  .object({
    id: z.number(),
    date: z.string().default(''),
    date_gmt: z.string().optional(),
    modified: z.string().optional(),
    slug: z.string().default(''),
    status: z.string().default('publish'),
    type: z.string().default('post'),
    link: z.string().default(''),
    title: renderedStringSchema,
    content: renderedStringSchema,
    excerpt: renderedStringSchema.optional(),
    author: z.number().optional(),
    featured_media: z.number().optional(),
    categories: z.array(z.number()).optional().default([]),
    tags: z.array(z.number()).optional().default([]),
    _embedded: wpEmbeddedSchema.optional(),
    yoast_head_json: z.record(z.string(), z.any()).optional(),
  })
  .passthrough();

export const wpPageSchema = z
  .object({
    id: z.number(),
    date: z.string().default(''),
    modified: z.string().optional(),
    slug: z.string().default(''),
    status: z.string().default('publish'),
    type: z.string().default('page'),
    link: z.string().default(''),
    title: renderedStringSchema,
    content: renderedStringSchema,
    excerpt: renderedStringSchema.optional(),
    parent: z.number().default(0),
    menu_order: z.number().default(0),
    featured_media: z.number().optional(),
    _embedded: wpEmbeddedSchema.optional(),
    yoast_head_json: z.record(z.string(), z.any()).optional(),
  })
  .passthrough();

export const wpVereadorSchema = z
  .object({
    id: z.number(),
    slug: z.string().default(''),
    link: z.string().default(''),
    title: renderedStringSchema,
    content: renderedStringSchema.optional(),
    featured_media: z.number().optional(),
    _embedded: wpEmbeddedSchema.optional(),
  })
  .passthrough();

export const wpVideoSchema = z
  .object({
    id: z.number(),
    slug: z.string().default(''),
    link: z.string().default(''),
    title: renderedStringSchema,
    content: renderedStringSchema.optional(),
    featured_media: z.number().optional(),
    _embedded: wpEmbeddedSchema.optional(),
  })
  .passthrough();

export const wpSearchResultSchema = z
  .object({
    id: z.number(),
    title: z.string().default(''),
    url: z.string().default(''),
    type: z.string().default('post'),
    subtype: z.string().default('post'),
    _links: z.record(z.string(), z.any()).optional(),
  })
  .passthrough();

export const wpSiteInfoSchema = z
  .object({
    name: z.string().default('Câmara Municipal de Paraíso do Tocantins'),
    description: z.string().default(''),
    url: z.string().default(''),
    home: z.string().optional(),
    gmt_offset: z.number().optional(),
    timezone_string: z.string().optional(),
  })
  .passthrough();

export type WpPost = z.infer<typeof wpPostSchema>;
export type WpPage = z.infer<typeof wpPageSchema>;
export type WpMedia = z.infer<typeof wpMediaSchema>;
export type WpCategory = z.infer<typeof wpCategorySchema>;
export type WpTag = z.infer<typeof wpTagSchema>;
export type WpUser = z.infer<typeof wpUserSchema>;
export type WpSearchResult = z.infer<typeof wpSearchResultSchema>;
export type WpVereador = z.infer<typeof wpVereadorSchema>;
export type WpVideo = z.infer<typeof wpVideoSchema>;
export type WpSiteInfo = z.infer<typeof wpSiteInfoSchema>;
