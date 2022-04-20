import * as vscode from "vscode";
import { diagnose, comment } from "./cbor";

export class CborTextDocumentContentProvider
  implements vscode.TextDocumentContentProvider
{
  async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
    const [_scheme, cbor, _tabTitle] = uri.toString().split(/[:\/]/);

    const size = cbor.length / 2;
    const diganostic = await diagnose(cbor);
    const commented = await comment(cbor);

    return `Size: ${size} Bytes\n${cbor}\n\nDiagnostic:\n${diganostic}\n\nCommented:\n${commented}`;
  }
}
