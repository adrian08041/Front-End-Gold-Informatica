declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;

    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    STRIP_WEBHOOK_SECRET_KEY: string;
    NEXTAUTH_SECRET: string;
    HOST_URL: string;
  }
}
