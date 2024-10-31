# Leo's API Status
I'm building an  API that I can use across my websites & other apps to update what I'm doing!

# Planning!
## Getting the status (for use on my websites etc.)
- `GET` request to `https://status.wilkin.xyz/status` (no auth needed)
## Updating the status
- Authenticated `POST` with JSON `{ "status": "Your new status" }` with the header `x-api-key: supa-secret-key` to `https://status.wilkin.xyz/status`

e.g. with curl:

```bash
curl -X POST https://status.wilkin.xyz/status \
    -H "Content-Type: application/json" \
    -H "x-api-key: supa-secret-key" \
    -d '{"status": "Working on my status API"}'
```

doing inital setup in github codespaces cause nvm ain't ballin which is a pain