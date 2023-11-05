import { access, constants, writeFile } from 'node:fs/promises'
import { ImapClient } from './ImapClient.js'

export async function fetchAndBackupEmail({ imapConfig, searchQuery }) {
  const client = new ImapClient(imapConfig)

  const messages = await client.fetch(searchQuery)
  for (const message of messages)
    await _saveIfNotExist(message)
}

async function _saveIfNotExist(mail) {
  const filePath = `${mail.title}.md`
  try {
    await access(filePath, constants.F_OK)
  }
  catch (e) {
    await writeFile(filePath, mail.text)
  }
}
