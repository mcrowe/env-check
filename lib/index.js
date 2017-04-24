"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function run() {
    const schema = loadSchema();
    let isValid = true;
    for (let name in schema.required) {
        if (!process.env[name] || process.env[name].length == 0) {
            const description = schema.required[name];
            console.error(`Missing required environment variable "${name}": ${description}`);
            isValid = false;
        }
    }
    if (!isValid) {
        process.exit();
    }
}
exports.default = { run };
function loadSchema() {
    const schema = JSON.parse(fs.readFileSync('package.json', 'utf-8')).env;
    if (!schema) {
        console.error('Missing "env" key in package.json');
        process.exit();
    }
    if (!schema.required && !schema.optional) {
        console.error('"env" key in package.json must have a "required" or "optional" section');
        process.exit();
    }
    if (!schema.required) {
        schema.required = {};
    }
    if (!schema.optional) {
        schema.optional = {};
    }
    return schema;
}
