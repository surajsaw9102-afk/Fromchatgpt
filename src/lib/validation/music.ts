import { z } from "zod";

export const searchSchema = z.object({
  q: z.string().trim().max(120).default(""),
  genre: z.string().trim().max(80).optional(),
  type: z.enum(["all", "songs", "albums", "artists", "playlists"]).default("all")
});

export const playlistSchema = z.object({
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(500).default(""),
  cover: z.string().url().optional(),
  isPublic: z.boolean().default(true),
  songIds: z.array(z.string().min(1)).default([])
});
