# Email Backup

## Description

This script is used to back up emails from a mail server to a local directory.
It uses the IMAP protocol to connect to the mail server and download the emails. The emails are stored in Markdown
format.

## Usage

The script can be run with the following command:

```bash
npx email-backup --envFile <path to env file> --from <expeditor> --output <output directory>
```