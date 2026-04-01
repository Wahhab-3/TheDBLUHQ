# Directive 01: Secrets Management

## Objective
To safely handle API keys, passwords, and sensitive information provided by the user using the Encrypted Vault script instead of plaintext `.env` files. 

## The Rule
As an orchestration agent, **you must never write sensitive keys into your chat history or random `.txt` files on disk.** When a user hands you a new API Key (e.g. Hostinger, ElevenLabs, OpenAI), you must immediately store it in the encrypted vault.

## The Tool: `execution/vault.py`
This deterministic Python script uses macOS built-in OpenSSL (AES-256) to encrypt and decrypt values. It requires NO pip dependencies to operate. The encrypted file is saved to `.secrets.vault` in the workspace root.

## Execution Steps

### 1. Storing a Secret
To save a secret, call the `vault.py` script and pass the vault master password in your environment string.
**(Ask the user for their preferred vault master password if one has not been established yet in your memory).**

```bash
ASTRO_VAULT_KEY="<master_password>" python3 execution/vault.py set <system_key> "<api_secret_value>"
```
Example:
```bash
ASTRO_VAULT_KEY="MySuperSecret123" python3 execution/vault.py set HOSTINGER_API "TsoaEW7JYK..."
```

### 2. Retrieving a Secret for Active Use
When you need to perform an API call (e.g. running a cURL command or deploying a Python script), you should dynamically load the secret into an environment variable or retrieve it on the fly.

```bash
ASTRO_VAULT_KEY="<master_password>" python3 execution/vault.py get HOSTINGER_API
```

### 3. Deleting a Secret
If a key is rotated out or no longer needed:
```bash
ASTRO_VAULT_KEY="<master_password>" python3 execution/vault.py delete HOSTINGER_API
```

## Error Handling
If `vault.py` returns an "Incorrect master password or corrupted file" error, DO NOT attempt to brute force it. Notify the user immediately and ask them to verify their master key.

This deterministic approach ensures the user's secrets are safe at rest.
