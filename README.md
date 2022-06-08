# TORQ Discord Bot

[![Build & Publish Docker Image to Docker Hub](https://github.com/TORQDL/discord-bot/actions/workflows/deploy.yml/badge.svg?branch=production)](https://github.com/TORQDL/discord-bot/actions/workflows/deploy.yml)
[![Lint](https://github.com/TORQDL/discord-bot/actions/workflows/lint.yml/badge.svg?branch=master)](https://github.com/TORQDL/discord-bot/actions/workflows/lint.yml)
[![Docker Image Version](https://img.shields.io/docker/v/torqdl/discord-bot/latest)](https://hub.docker.com/r/torqdl/discord-bot)
[![Docker Pulls](https://img.shields.io/docker/pulls/torqdl/discord-bot)](https://hub.docker.com/r/torqdl/discord-bot)
[![Supported Platforms](https://img.shields.io/badge/platform-armv6%20%7C%20armv7%20%7C%20arm64%20%7C%20amd64-blue)](https://hub.docker.com/r/torqdl/discord-bot)

A command and control bot for the TORQ Digital Labs Discord server.

## Features

* Easy Installation
* Easy Configuration
* Simple to Use
* Docker Secrets Support

## Requirements

* A host with Docker installed.
* A host on a supported CPU architecture: `armv6`&nbsp;|&nbsp;`armv7`&nbsp;|&nbsp;`armv8`&nbsp;|&nbsp;`amd64`

## Commands

These commands can be issued by users on the server, and if the user is a member of a role with access to run that command, the command will be processed. Otherwise, an error will display, letting the user know that they aren't a member of the right role.

| Command | Option | Example | Description |
| - | - | - | - |
| `/avatar` | `target` | `/avatar target:@Tyrelius#0001` | Get the avatar URL of the selected user, or your own avatar. |
| `/beep` | - | `/beep` | Beep! |
| `/kick` | `target` | `/kick target:@Tyrelius#0001` | Select a member and kick them (but not really). |
| `/options-info` | `input` | `/options-info input:This is an example.` | Information about the options provided. |
| `/ping` | - | `/ping` | Replies with Pong! |
| `/prune` | `amount` | `/prune amount:10` | Prune up to 99 messages. |
| `/server` | - | `/server` | Display info about this server. |
| `/user-info` | - | `/user-info` | Display info about yourself. |

<!-- > 💡 If you change `WG_PORT`, make sure to also change the exposed port. -->

## Running the TORQ Discord Bot

If you haven't installed Docker yet, install it by running:

```bash
$ curl -sSL https://get.docker.com | sh
$ sudo usermod -aG docker $(whoami)
$ exit
```

Then log out and log back in again, or reboot.

To automatically install & run the TORQ Discord Bot, simply run:

```bash
$ docker run -d \
  --name=torq-discord-bot \
  -e DISCORD_BOT_TOKEN=your_discord_bot_token \
  -e DISCORD_BOT_CLIENTID=123456789012345678 \
  -e DISCORD_SERVER_GUILDID=876543210987654321 \
  -v ~/.torq-discord-bot:/usr/src/APP \
  --restart unless-stopped \
  torqdl/discord-bot
```

> 💡 Replace `your_discord_bot_token` with your Discord bot's token.
> 
> 💡 Replace `123456789012345678` with your Discord bot's OAuth2 client ID.
> 
> 💡 Replace `876543210987654321` with the Server ID of the server this Discord bot will run on.
>
> 💡 Your configuration file can be saved in `~/.torq-discord-bot`

## Docker Compose

If you'd like to add the TORQ Discord Bot to a docker-compose, you can begin with this example:

Add this to `/opt/compose/docker-compose.yaml` and run it with
```bash
$ docker-compose -f /opt/compose/docker-compose.yaml up -d
```

```yaml
version: '3.7'
services:
  torq-discord-bot:
    image: torqdl/discord-bot:latest
    container_name: discord-bot
    restart: unless-stopped
    environment:
      # ⚠️ Required if not using a config.json file in a volume:
      DISCORD_BOT_TOKEN: "your_discord_bot_token"
      DISCORD_BOT_CLIENTID: "123456789012345678"
      DISCORD_SERVER_GUILDID: "876543210987654321"
      # ⚠️ Highly recommended to use Docker secrets,
      # especially if you commit this code to a repo:
      DISCORD_BOT_TOKEN_FILE: /run/secrets/token
      DISCORD_BOT_CLIENTID_FILE: /run/secrets/clientId
      DISCORD_SERVER_GUILDID_FILE: /run/secrets/guildId
    volumes:
      # ⚠️ Required if not using environment variables,
      # so that you can enter your config.json file:
      - /opt/torq-discord-bot:/usr/src/APP
    secrets:
      - token
      - clientId
      - guildId
secrets:
  token:
    file: /opt/compose/.secrets/token.txt
  clientId:
    file: /opt/compose/.secrets/clientId.txt
  guildId:
    file: /opt/compose/.secrets/guildId.txt
```

## Configuration



## Updating

To update to the latest version, simply run:

```bash
$ docker stop torq-discord-bot
$ docker rm torq-discord-bot
$ docker pull torqdl/discord-bot
```
And then run the `docker run -d \ ...` command above again.

If you are using Docker Compose, you can update with:
```bash
$ docker-compose -f /opt/compose/docker-compose.yaml pull
$ docker-compose -f /opt/compose/docker-compose.yaml up -d
```

## Change Log

### 1.0.0

* Initial release of the TORQ Discord Bot.

## Releases

There are three main releases available from Docker Hub:
* `:latest` is the latest production release.
* `:nightly` is the latest build from the master branch, but may not be ready for production release.
* `:development` is the latest development build.

Additionally, you may pull individual versions from each branch.
* Production: `:1.1.0`
* Nightly: `:1.1.0-nightly`
* Development: `:1.1.0-dev`
