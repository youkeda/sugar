import OSS from "ali-oss";


class ProjectService {
  client: OSS;

  init = () => {
    this.client = new OSS({
      region: process.env["OSS_REGION"],
      accessKeyId: process.env["OSS_ACCESSKEYID"],
      accessKeySecret: process.env["OSS_ACCESSKEYSECRET"],
      bucket: process.env["OSS_BUCKET"]
    });
  };

  put = ()=>{

  }
}

export const projectService = new ProjectService();
