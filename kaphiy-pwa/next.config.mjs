/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/n8n-webhook',
        destination: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
      },
    ]
  },
}

export default nextConfig
