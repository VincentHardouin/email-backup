#!/usr/bin/env node
import { argv, env } from 'node:process'
import dotenv from 'dotenv'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import { fetchAndBackupEmail } from './fetch-and-backup-email.js'

async function main() {
  const args = yargs(hideBin(argv))
    .option('envPath', { describe: 'Environment path' })
    .option('from', { describe: 'Email address to search for' })
    .option('output', { describe: 'Backup Dir path' })
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

  await fetchAndBackupEmail({ imapConfig, searchQuery: { from: args.from }, output: args.output })
}

main().catch(console.error)
