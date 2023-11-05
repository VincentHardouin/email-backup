import { access, constants, writeFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import { join, resolve } from 'node:path'
import { ImapClient } from './ImapClient.js'

export async function fetchAndBackupEmail({ imapConfig, searchQuery, output }) {
  const client = new ImapClient(imapConfig)

  const messages = await client.fetch(searchQuery)
  for (const message of messages)
    await _saveIfNotExist(message, output)
}

async function _saveIfNotExist(mail, output) {
  const filePath = resolve(cwd(), join(output, `/${mail.title}.md`))
  try {
    await access(filePath, constants.F_OK)
  }
  catch (e) {
    await writeFile(filePath, mail.text)
  }
}
