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
          "https://calendar.google.com/calendar/embed?src=c_5c34df00521a91d7f2eb801d614ebe2835a186c8a17fede6ad3299b0e5e02d25%40group.calendar.google.com&ctz=Europe%2FLondon&mode=AGENDA&hl=en_GB&showNav=0&showDate=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0&color=%233F51B5&bgcolor=%233F51B5",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
