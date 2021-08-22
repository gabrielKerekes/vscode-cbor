import * as vscode from "vscode";
import { isValidCbor } from "./cbor";

export const getCbor = async (): Promise<string | undefined> => {
  const selectedText = getSelectedCbor();

  if (selectedText) {
    return selectedText;
  } else {
    return await vscode.window.showInputBox({
      placeHolder: "777673636F64652D63626F7220697320617765736F6D6521",
    });
  }
};

export const getSelectedCbor = (): string => {
  if (
    vscode.window.activeTextEditor &&
    vscode.window.activeTextEditor.selection
  ) {
    const { anchor, end } = vscode.window.activeTextEditor.selection;
    const selectedText = vscode.window.activeTextEditor.document.getText(
      new vscode.Range(anchor, end)
    );
    if (selectedText && isValidCbor(selectedText)) {
      return selectedText;
    }
  }
  return "";
};
