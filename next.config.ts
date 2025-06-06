import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "./src/core/env";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    taint: true,
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/core/i18n/request.ts",
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
