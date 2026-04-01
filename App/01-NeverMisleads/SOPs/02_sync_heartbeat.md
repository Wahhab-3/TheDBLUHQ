# Heartbeat & Sync Protocol 

Since we are keeping everything local and bypassing Google Drive APIs, we need a mechanic to bridge the 24/7 VPS (Kaborya) and the sleeping Laptop (Astro & Gina).

Because laptops constantly change Wi-Fi networks and sleep, **the VPS cannot reliably pull from the laptop**. Instead, **the Laptop must initiate the heartbeat to the VPS.**

### The Mechanic: "The Astro Heartbeat"

1. **Kaborya's Queue (The VPS Side):**
   - When the laptop is asleep, Kaborya continues talking to clients via Telegram.
   - Every time Kaborya makes a change, writes a client brief, or saves a conversation, he saves those files into a local folder on his VPS called `/Kaborya/VPS_Queue/`.
   - Kaborya literally does nothing else. He just stacks files in his queue.

2. **The Heartbeat (The Laptop Side):**
   - When Wahhab opens his laptop, a background script (`heartbeat_sync.py`) activates.
   - **Step 1:** The script pings the VPS via SSH to say "Astro and Gina are awake."
   - **Step 2 (Pull):** It securely pulls down all the files from `/Kaborya/VPS_Queue/` on the server and drops them into `Kaborya/Kaborya/inbox/` on the local Mac so we can read them.
   - **Step 3 (Push):** It looks inside `Kaborya/Astro/outbox/` and `Kaborya/Gina/outbox/`, takes our completed work, and pushes it up to the VPS so Kaborya can text the clients.
   - **Step 4 (Clear):** It clears the queues so files aren't endlessly duplicated.

### Why this is foolproof:
- Kaborya never crashes trying to connect to a sleeping laptop. He just saves locally.
- The second the laptop opens, the heartbeat syncs the two brains perfectly.

---

### Implementation 

Astro will build the `heartbeat_sync.py` script. It will run locally on the Mac via an automated cron job every 5 minutes (or manual execution by Wahhab when he sits down to work).

It will require an SSH key pair so the laptop can talk to the VPS without Wahhab needing to type a password every 5 minutes.
