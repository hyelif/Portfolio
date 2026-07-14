---
title: Claude Ollama Gateway (On-Going)
description: "Reverse proxy that translates Anthropic Messages API format into Ollama API calls: lets Claude-compatible clients talk to local LLMs."
tags:
  - Python
  - FastAPI
  - Ollama
  - LLM
  - API Gateway
  - SSE
  - Streaming
techStack:
  - Python
  - FastAPI
  - JSON
  - Linux
  - Postman
---

## Overview

**Claude Ollama Gateway** is a lightweight reverse-proxy that translates the Anthropic (Claude) Messages API format into Ollama API calls. Any Claude-compatible client (Claude Code, Claude Desktop) can talk to locally-running Ollama models instead of the official Anthropic API.

## Key Features

### API Compatibility
- Single endpoint: `POST /v1/messages`: same path and schema as Anthropic
- Supports both streaming (SSE) and non-streaming responses
- Translates tool definitions and responses between formats

### Intelligent Model Routing
Routes requests based on four signals:
- **Keyword matching**: complex keywords (implement, refactor, debug) route to heavy model
- **Message length**: messages over 500 chars go to heavy model
- **Tool presence**: requests with tool definitions use heavy model
- **Conversation depth**: conversations over 10 turns use heavy model

### Automatic Fallback
If the heavy model fails (timeout or error), the gateway automatically falls back to the default model.

### Conversation Memory
Thread persistence via JSON files with configurable pruning (default 200 messages).

### Input Compression
Lossless compression modes:
- **Safe**: JSON minification, whitespace normalization, tool schema deduplication
- **Aggressive**: all of safe, plus message merging and long content trimming

### Caveman Mode
Injects system prompts for concise, filler-free responses: useful for technical work.

## Status

Production-ready. Used daily with Claude Code for local LLM development.
