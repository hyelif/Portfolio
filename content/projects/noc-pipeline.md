---
title: AI-NOC Ingestion Gateway (On-Going)
description: "REST-to-Kafka bridge for NOC alarm ingestion = validates, structures, and publishes network alerts for downstream AI analysis."
tags:
  - Python
  - FastAPI
  - Kafka
  - Pydantic
  - Docker
  - NOC
  - Data Pipeline
techStack:
  - Python
  - FastAPI
  - Kafka
  - Docker
  - Docker Compose
  - JSON
  - Linux
  - Postman
---

## Overview

**AI-NOC Ingestion Gateway** is a lightweight, single-service data ingestion pipeline for a Network Operations Center (NOC). It acts as a REST-to-Kafka bridge: external monitoring systems (Zabbix, NTT, Prometheus) send alarm webhooks via HTTP POST, and the gateway validates, structures, and publishes them into a Kafka topic for downstream processing or AI-assisted analysis.

## Key Features

### REST API Endpoint
- `POST /api/v1/alerts` (accepts structured JSON payloads)
- Returns HTTP 202 (Accepted) on success
- Returns HTTP 500 on internal failure

### Schema Validation
Pydantic model enforces:
- `incident_id`: unique alarm identifier
- `source`: monitoring system name (Zabbix, NTT, Prometheus)
- `host`: affected network device
- `severity`: alarm severity level
- `message`: human-readable description
- `timestamp`: optional, defaults to current UTC time

### Kafka Producer
- Confluent Kafka Python client with `acks=1` acknowledgment
- Messages keyed by `host` for ordered delivery per partition
- Delivery report callback for success/failure tracking
- Graceful shutdown with buffer flush

### Infrastructure
- Single-node Kafka in KRaft mode (no Zookeeper)
- Kafdrop UI for topic inspection (port 9000)
- Docker Compose orchestration for Kafka + Kafdrop

## Status

Development phase. Core ingestion pipeline is functional; downstream consumers and AI analysis layer are planned.
