/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Use 'http' if your local development site is not using HTTPS
        hostname: "products20.wpenginepowered.com", // No trailing slash here
        port: "", // Keep port empty unless you're using a specific port
        pathname: "/wp-content/uploads/**", // Ensure pathname starts with '/'
      },
    ],
  },
};

export default nextConfig;
