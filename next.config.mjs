/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // SEO Configuration
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          // Security and SEO headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // Redirect old URLs to new ones (SEO-friendly redirects)
  redirects: async () => {
    return [
      // Add redirects here if needed (e.g., old product URLs)
      // {
      //   source: "/old-product/:slug",
      //   destination: "/products/view?slug=:slug",
      //   permanent: true, // 301 redirect for SEO
      // },
    ];
  },
};

export default nextConfig;
