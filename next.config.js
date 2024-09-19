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
        source: "/calendar",
        destination:
          "https://calendar.google.com/calendar/u/5?cid=Y181YzM0ZGYwMDUyMWE5MWQ3ZjJlYjgwMWQ2MTRlYmUyODM1YTE4NmM4YTE3ZmVkZTZhZDMyOTliMGU1ZTAyZDI1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
