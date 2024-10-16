/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      {
        source: "/winter-formal",
        destination: "https://forms.gle/Re18uLHvQtgnHdEb8",
        basePath: false,
        permanent: true,
      },
      {
        source: "/join",
        destination: "https://forms.gle/wrYqp8s67dr9Mf8c9",
        basePath: false,
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/nu66PUUs7N",
        basePath: false,
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/yorkengsoc",
        basePath: false,
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/YorkEngSoc",
        basePath: false,
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/company/yorkengsoc/",
        basePath: false,
        permanent: true,
      },
      {
        source: "/yorksu",
        destination: "https://yorksu.org/activities/view/28",
        basePath: false,
        permanent: true,
      },
      {
        source: "/pcb",
        destination: "https://github.com/YorkEngSoc/intro-to-kicad",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
