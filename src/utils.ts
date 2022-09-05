import * as vscode from "vscode";
import { isValidCbor } from "./cbor";

export const getCbor = async (): Promise<string> => {
  const selectedCbor = await getSelectedCbor();
  if (selectedCbor !== null) {
    return selectedCbor;
  }

  const inputedText = await vscode.window.showInputBox({
    placeHolder: "777673636F64652D63626F7220697320617765736F6D6521",
  });

  if (!inputedText) {
    throw new Error("Something went wrong");
  }

  return cleanUpText(inputedText);
};

export const getSelectedCbor = async (): Promise<string | null> => {
  if (
    vscode.window.activeTextEditor &&
    vscode.window.activeTextEditor.selection
  ) {
    const { anchor, end } = vscode.window.activeTextEditor.selection;
    const selectedText = vscode.window.activeTextEditor.document.getText(
      new vscode.Range(anchor, end)
    );

    if (selectedText) {
      const cleanedUpSelectedText = cleanUpText(selectedText);
      if (await isValidCbor(cleanedUpSelectedText)) {
        return cleanedUpSelectedText;
      }
    }
  }

  return null;
};

export const cleanUpText = (text: string): string => text.replaceAll(" ", "");
