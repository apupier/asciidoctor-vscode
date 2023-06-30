import { CancellationToken, Event, InlayHint, InlayHintKind, InlayHintsProvider, Position, ProviderResult, Range, TextDocument } from 'vscode'
import { AsciidocParser } from '../asciidocParser'
//import { AsciidocParser } from '../asciidocParser'

export class AttributeInlayHintProvider implements InlayHintsProvider {
  onDidChangeInlayHints?: Event<void>
  provideInlayHints (textDocument: TextDocument, range: Range, _token: CancellationToken): ProviderResult<InlayHint[]> {
    const inlayHints: InlayHint[] = []
    const startLine = range.start.line
    const endLine = range.end.line
    const document = AsciidocParser.load(textDocument)
    for (let index = startLine; index < endLine; index++) {
      const lineText = textDocument.lineAt(index).text
      console.log(lineText)
      const matches = /{[\w-]+}.*/.exec(lineText)
      if (matches !== null) {
        matches.forEach((value, index, array) => {
          console.log('###' + value + index + array)
          inlayHints.push(new InlayHint(new Position(index, lineText.indexOf(value) + value.length - 1), document.getAttribute(value)))
        })
      }
    }
    return inlayHints
  }

  resolveInlayHint? (hint: InlayHint, _token: CancellationToken): ProviderResult<InlayHint> {
    return hint
  }
}
