import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'

class ImapClient {
  #client

  constructor({ host, port, user, password }) {
    this.#client = new ImapFlow({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass: password,
      },
      logger: false,
    })
  }

  async fetch(searchQuery) {
    await this.#client.connect()
    const lock = await this.#client.getMailboxLock('INBOX')
    const messages = []
    try {
      for await (const message of this.#client.fetch(searchQuery, {
        source: true,
        headers: ['date', 'subject'],
      })) {
        const mail = await simpleParser(message.source)
        const title = `${mail.date.toISOString().split('T')[0]} - ${mail.subject}`
        messages.push({
          title,
          text: `# ${title}\n${mail.text}`,
        })
      }
    }
    finally {
      await lock.release()
    }
    await this.#client.logout()
    return messages
  }
}

export { ImapClient }
