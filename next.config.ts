import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "./src/lib/env/env";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
