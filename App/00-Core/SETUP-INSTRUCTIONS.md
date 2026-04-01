# DBLU HQ — System Setup Instructions

## 1. GitHub Repo Setup (run in Terminal)

```bash
# Install gh if needed
brew install gh
gh auth login

# Create the private repo
gh repo create DBLU-Vault --private --description "The DBLU HQ Obsidian Vault"

# Init git inside vault
cd ~/THE\ DBLU\ HQ/The\ DBLU\ HQ
git init
git config user.name "Wahhab"
git config user.email "abddulwahhab@gmail.com"
git remote add origin https://github.com/YOUR_USERNAME/DBLU-Vault.git
git add .
git commit -m "init: DBLU HQ vault — Day 1"
git branch -M main
git push -u origin main
```

---

## 2. Obsidian Git Plugin

1. Open Obsidian → Settings → Community plugins → Browse
2. Search **"Obsidian Git"** → Install → Enable
3. Go to Obsidian Git settings:
   - **Auto pull interval**: 5 (minutes)
   - **Auto commit-and-sync interval**: 10 (minutes)
   - **Commit message**: `vault: auto-sync {{date}}`
   - **Pull updates on startup**: ON
   - **Push on commit**: ON

---

## 3. AlDente — Battery Cap

1. Download: https://github.com/davidwernhart/AlDente/releases (or `brew install --cask aldente`)
2. Open AlDente → set charge limit to **80%**
3. Enable **Sailing Mode** (prevents charging above cap even when plugged in)

---

## 4. macOS — Never Sleep

**Option A (System Settings):**
Settings → Battery → Options → "Prevent automatic sleeping when display is off" → ON
Also: Settings → Lock Screen → set "Turn display off" to **Never**

**Option B (Terminal — permanent):**
```bash
# Prevent sleep indefinitely (run once, persists across reboots via launchd)
sudo pmset -a sleep 0
sudo pmset -a disksleep 0
sudo pmset -a displaysleep 0
```

**Option C (while active session only):**
```bash
caffeinate -i &
```

---

## Vault Folder Structure

```
The DBLU HQ/
├── 00-Core/          ← soul.md, Wahhab.md, INSTRUCTIONS.md
├── 01-NeverMisleads/ ← Agency: clients, leads, SOPs, finance
├── 02-DBLU/          ← Music, brand, releases
├── 03-Learning/      ← School, courses, notes
├── 04-Projects/      ← Active projects
├── 05-Resources/     ← Reference material
├── 06-Archive/       ← Old stuff
├── _Inbox/           ← Capture zone (process weekly)
├── _Queue/           ← Tasks waiting to be assigned
└── _Templates/       ← Note templates
```
