import OSS from "ali-oss";

const oss = new OSS({
  region: process.env["OSS_REGION"],
  accessKeyId: process.env["OSS_ACCESSKEYID"],
  accessKeySecret: process.env["OSS_ACCESSKEYSECRET"],
  bucket: process.env["OSS_BUCKET"]
});

export const put = () => {};
