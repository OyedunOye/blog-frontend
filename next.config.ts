// next.config.ts

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-backend-u8d7.onrender.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*", // Allow images from all domains
      },
    ],
  },
};

export default nextConfig;
