#! /usr/bin/env node
import { argv } from "node:process";
import { FetchNewTypes } from "../main.js";
import type { FetchParameters } from "../types/index.js";

const args = argv.slice(2) as FetchParameters;
await FetchNewTypes(args);
