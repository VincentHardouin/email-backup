import 'dotenv/config'
import { existsSync, writeFileSync } from 'node:fs'
import { argv, env } from 'node:process'
import { ImapClient } from './ImapClient.js'

async function main() {
  const config = {
    host: env.IMAP_HOST,
    port: env.IMAP_PORT,
    user: env.IMAP_USER,
    password: env.IMAP_PASSWORD,
  }

  const client = new ImapClient(config)

  const searchQuery = { from: argv[2] }
  const messages = await client.fetch(searchQuery)
  for (const { title, text } of messages) {
    const filePath = `${title}.md`
    if (!existsSync(filePath))
      writeFileSync(filePath, text)
  }
}

main().catch(console.error)
