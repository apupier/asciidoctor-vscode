import 'mocha'
import * as vscode from 'vscode'
import assert from 'assert'
import { Position, Range } from 'vscode'
import { AttributeInlayHintProvider } from '../features/attributeInlayHintProvider'

let root

suite('Attribute Inlay Hint Provider', () => {
  let createdFiles: vscode.Uri[] = []
  setup(() => {
    root = vscode.workspace.workspaceFolders[0].uri.fsPath
  })
  teardown(async () => {
    for (const createdFile of createdFiles) {
      await vscode.workspace.fs.delete(createdFile)
    }
    createdFiles = []
  })
  test('Should return attribute value as inlay', async () => {
    const fileWithInlayHint = vscode.Uri.file(`${root}/fileWithAttributeValueToInlay.adoc`)
    await vscode.workspace.fs.writeFile(fileWithInlayHint, Buffer.from(`:my-attribute-to-inlay: value to inlay

{my-attribute-to-inlay}
    `))
    createdFiles.push(fileWithInlayHint)

    const file = await vscode.workspace.openTextDocument(fileWithInlayHint)
    new AttributeInlayHintProvider().provideInlayHints(file, new Range(new Position(2, 0), new Position(2, 24)), undefined)
  })
})
