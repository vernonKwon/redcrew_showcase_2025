/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path'
import { fileURLToPath } from "url"; 

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `
      @import "@/styles/variables";
      @import "@/styles/mixins";
    `
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/cssinjs',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
    'rc-tooltip',
    'rc-dropdown',
    'rc-menu',
    'rc-tabs',
    'rc-dialog',
    'rc-drawer',
    'rc-motion',
    'rc-steps',
    'rc-field-form',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-notification',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-switch',
    'rc-textarea',
    'rc-upload',
    'rc-virtual-list',
    'rc-image',
    'rc-tour',
    'rc-tree-select',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-trigger'
  ],
};

export default bundleAnalyzer(nextConfig)
