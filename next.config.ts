import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.mp4$/,
  //     type: 'asset/resource',
  //   })
  //   return config
  // },

  // experimental: {
  //   turbo: {
  //     resolveExtensions: ['.mp4']
  //   }
  // }
};

export default withNextVideo(nextConfig);