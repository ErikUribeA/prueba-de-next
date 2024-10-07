import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface Credentials {
  username: string;
  password: string;
}

interface IUser {
  _id: string;
  email: string;
  username: string;
  name: string;
  phone: string;
  __v: number;
}

interface UserAuthenticate {
  id: string; // Agregar id aquí
  access_token?: string;
  user: IUser;
}

interface SessionAuthenticate extends Session {
  access_token: string;
  user: IUser;
}

interface JWTAuthenticate extends JWT {
  access_token: string;
  user: IUser;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<UserAuthenticate | null> {
        if (!credentials) return null;

        const res: Response = await fetch(
          `http://192.168.88.39:7000/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          return null;
        }

        const data: UserAuthenticate = await res.json();
        if (data.access_token && data.user) {
          return {
            id: data.user._id, // Asegúrate de incluir el _id como id
            access_token: data.access_token,
            user: data.user,
          };
        } else {
          return null;
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWTAuthenticate; user: UserAuthenticate | null }) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: SessionAuthenticate; token: JWT }) {
      session.access_token = token.accessToken as string;
      return session;
    },
  },
};

// Exporta solo las funciones GET y POST usando el handler de NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
