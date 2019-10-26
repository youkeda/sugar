import {
  Workspace,
  WorkspaceService,
  WorkspaceLanguage,
  File,
  TemplateService,
  TemplateWorkspace
} from "ykd-base/workspaces";

export {
  Workspace,
  WorkspaceService,
  WorkspaceLanguage,
  File,
  TemplateService,
  TemplateWorkspace
};

import { findOneWorkspace, saveWorkspace } from "../dao/WorkspaceDAO";

class WorkspaceServiceImpl implements WorkspaceService {
  init(
    workspaceId: string,
    language: WorkspaceLanguage,
    accountId: string,
    templateId: string
  ): Promise<Workspace> {
    return new Promise(async (resolve, reject) => {
      let workspace = <Workspace>{
        workspaceId,
        accountId
      };
      let result = await findOneWorkspace(workspace);
      if (result) {
        resolve(result);
        return;
      }
    });
  }
  save(workspace: Workspace): Promise<void> {
    throw new Error("Method not implemented.");
  }
  saveFile(workspaceId: string, file: File): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteFile(workspaceId: string, fileId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(workspaceId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  query(accountId: string): Promise<Workspace[]> {
    throw new Error("Method not implemented.");
  }
  get(workspaceId: string): Promise<Workspace> {
    throw new Error("Method not implemented.");
  }
}

class TemplateServiceImpl implements TemplateService {
  get(templateId: string): Promise<TemplateWorkspace> {
    throw new Error("Method not implemented.");
  }
  save(workspace: Workspace): Promise<TemplateWorkspace> {
    throw new Error("Method not implemented.");
  }
}

export const workspaceService = new WorkspaceServiceImpl();
