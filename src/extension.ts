import * as vscode from "vscode";
import { isValidCbor } from "./cbor";
import { CborTextDocumentContentProvider } from "./CborTextDocumentContentProvider";
import { getCbor } from "./utils";

export const activate = (context: vscode.ExtensionContext) => {
  const SCHEME = "cbor";
  const COMMAND_DIAGNOSE = `${SCHEME}.diagnose`;

  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(
      SCHEME,
      new CborTextDocumentContentProvider()
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_DIAGNOSE, async () => {
      let cbor = await getCbor();
      if (cbor && (await isValidCbor(cbor))) {
        let tabTitle = cbor.slice(0, 20);
        let uri = vscode.Uri.parse(`${SCHEME}:${cbor}/${tabTitle}`);
        let doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Beside,
        });
      } else {
        vscode.window.showErrorMessage("Invalid CBOR");
      }
    })
  );
};

export const deactivate = () => {};
