/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: "jinoafndjdcrghrvtslx.supabase.co",
        protocol: "https",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/qfactor",
        destination:
          "https://www.eventbrite.co.uk/e/q-factor-2024-tickets-875864072017?aff=ebdsshcopyurl&utm-source=cp&utm-term=listing&utm-campaign=social&utm-medium=discovery&utm-content=attendeeshare",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
