import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/api/n8n-webhook',
        destination: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
      },
    ]
  },
  images: {
    // Allow remote product images uploaded to backend.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

export default withSerwist(nextConfig);
