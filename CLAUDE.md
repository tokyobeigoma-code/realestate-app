# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository is currently empty — no code, framework, or build tooling has been added yet. The sections below (commands, architecture) are placeholders to be filled in as the project takes shape. Update this file as soon as a stack, build system, or test runner is chosen.

## Commands

_Not yet defined. Add build / lint / test / dev-server commands here once the tech stack is chosen._

## Architecture

_Not yet defined. Add a high-level description of the system's structure here once code exists._

## Git workflow

- This repo's remote is `origin` → https://github.com/tokyobeigoma-code/realestate-app.git
- **Every time code is changed, commit and push to GitHub.** Do not leave changes uncommitted/unpushed at the end of a work session.
- Typical flow after a change:
  ```bash
  git add <changed files>
  git commit -m "<concise message>"
  git push origin <branch>
  ```
- Prefer small, frequent commits over large batched ones so pushes stay incremental.
