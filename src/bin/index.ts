#! /usr/bin/env node
import { argv } from "node:process";
import { FetchNewTypes } from "../main.js";
import type { FetchParameters } from "../types/index.js";

const args = argv.slice(2);

const opts: FetchParameters = {}

if(args.includes("hardTypes")) {
  opts.hardTypes = true;
}

if(args.includes("includeDBName")) {
  opts.includeDBName = true;
}

if(args.includes("outDir")) {
  const outDirIndex = args.indexOf("outDir");
  opts.outDir = args[outDirIndex + 1];
}

await FetchNewTypes(opts);
