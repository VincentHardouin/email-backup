import { argv, env } from 'node:process'
import dotenv from 'dotenv'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'

async function main() {
  const args = yargs(hideBin(argv))
    .option('from', { describe: 'Email address to search for' })
    .option('envPath', { describe: 'Environment path' })
    .parse()

  if (args.envPath)
    dotenv.config({ path: args.envPath })
  else
    dotenv.config()

  const imapConfig = {
    host: env.IMAP_HOST,
    port: env.IMAP_PORT,
    user: env.IMAP_USER,
    password: env.IMAP_PASSWORD,
  }

  await fetchAndBackupEmail({ imapConfig, searchQuery: { from: args.from } })
}

main().catch(console.error)
