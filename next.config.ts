import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "./src/lib/env/env";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    taint: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
