import { access, constants, writeFile } from 'node:fs/promises'
import { isAbsolute, join, resolve } from 'node:path'
import { ImapClient } from './ImapClient.js'

export async function fetchAndBackupEmail({ imapConfig, searchQuery, output }) {
  const client = new ImapClient(imapConfig)

  const messages = await client.fetch(searchQuery)
  for (const message of messages)
    await _saveIfNotExist(message, output)
}

async function _saveIfNotExist(mail, output) {
  const fileName = `${mail.title}.md`
  const filePath = join(output, `/${fileName}`)
  const absolutePath = isAbsolute(output) ? filePath : resolve(filePath)
  try {
    await access(absolutePath, constants.F_OK)
  }
  catch (e) {
    await writeFile(absolutePath, mail.text)
  }
}
