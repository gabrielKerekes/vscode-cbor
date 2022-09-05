import * as CBOR from "cbor";

export const diagnose = async (
  cbor: string,
  beautify: boolean = true
): Promise<string> => {
  const diagnostic = await CBOR.diagnose(cbor);
  return beautify ? _beautifyDiagnostic(diagnostic) : diagnostic;
};

export const comment = CBOR.comment;

export const isValidCbor = async (cbor: string): Promise<boolean> => {
  try {
    await CBOR.decode(cbor);
    return true;
  } catch {
    return false;
  }
};

const _beautifyDiagnostic = (diagnostic: string) => {
  const _indent = (
    result: [number, string[]],
    line: string
  ): [number, string[]] => {
    let [depth, lines] = result;

    if (line.includes("]") || line.includes("}")) {
      depth -= 1;
    }

    const tabs = Array(depth).fill("\t").join("");
    lines.push(`${tabs}${line}`);

    if (line.includes("[") || line.includes("{")) {
      depth += 1;
    }

    return [depth, lines];
  };

  return diagnostic
    .toString()
    .replaceAll(",", ",\n")
    .replaceAll("[", "[\n")
    .replaceAll("]", "\n]")
    .replaceAll("{", "{\n")
    .replaceAll("}", "\n}")
    .replaceAll("_ ", "")
    .split("\n")
    .map((line: string) => line.trim())
    .reduce(_indent, [0, []])[1]
    .join("\n");
};
