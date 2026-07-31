import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { verifyPassword } from "@/lib/security/password";

const credentialsSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(12)
});

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/sign-in" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(rawCredentials) {
        const credentials = credentialsSchema.safeParse(rawCredentials);
        if (!credentials.success) return null;
        const user = await db.user.findUnique({ where: { email: credentials.data.email } });
        if (!user?.passwordHash) return null;
        const valid = await verifyPassword(credentials.data.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, name: user.name, email: user.email, image: user.image, role: user.role };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "LISTENER";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = String(token.role ?? "LISTENER");
      }
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
