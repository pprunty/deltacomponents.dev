import { z } from "zod"

// Registry item types
export const registryItemTypeSchema = z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:theme",
    "registry:style",
    "registry:item",
    "registry:example",
    "registry:internal",
])

// Registry item file schema
export const registryItemFileSchema = z.discriminatedUnion("type", [
    z.object({
        path: z.string(),
        content: z.string().optional(),
        type: z.enum(["registry:file", "registry:page"]),
        target: z.string(),
    }),
    z.object({
        path: z.string(),
        content: z.string().optional(),
        type: registryItemTypeSchema.exclude(["registry:file", "registry:page"]),
        target: z.string().optional(),
    }),
])

// Main registry item schema
export const registryItemSchema = z.object({
    $schema: z.string().optional(),
    extends: z.string().optional(),
    name: z.string(),
    type: registryItemTypeSchema,
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(registryItemFileSchema).optional(),
    tailwind: z
        .object({
            config: z
                .object({
                    content: z.array(z.string()).optional(),
                    theme: z.record(z.string(), z.any()).optional(),
                    plugins: z.array(z.string()).optional(),
                })
                .optional(),
        })
        .optional(),
    cssVars: z
        .object({
            theme: z.record(z.string(), z.string()).optional(),
            light: z.record(z.string(), z.string()).optional(),
            dark: z.record(z.string(), z.string()).optional(),
        })
        .optional(),
    css: z.record(z.string(), z.any()).optional(),
    envVars: z.record(z.string(), z.string()).optional(),
    meta: z.record(z.string(), z.any()).optional(),
    docs: z.string().optional(),
    categories: z.array(z.string()).optional(),
    subcategory: z.string().optional(),
})

export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryItemFile = z.infer<typeof registryItemFileSchema>
export type RegistryItemType = z.infer<typeof registryItemTypeSchema>

// Registry schema
export const registrySchema = z.object({
    name: z.string(),
    homepage: z.string(),
    items: z.array(registryItemSchema),
})

export type Registry = z.infer<typeof registrySchema>

