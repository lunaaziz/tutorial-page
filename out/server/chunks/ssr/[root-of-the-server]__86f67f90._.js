module.exports = {

"[externals]/node:fs [external] (node:fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}}),
"[externals]/node:path [external] (node:path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}}),
"[externals]/node:os [external] (node:os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/node_modules/tinacms/dist/node-cache-5e8db9f0.mjs [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "NodeCache": (()=>NodeCache),
    "makeCacheDir": (()=>makeCacheDir)
});
const makeCacheDir = async (dir, fs, path, os)=>{
    const pathParts = dir.split(path.sep).filter(Boolean);
    const cacheHash = pathParts[pathParts.length - 1];
    const rootUser = pathParts[0];
    let cacheDir = dir;
    if (!fs.existsSync(path.join(path.sep, rootUser))) {
        cacheDir = path.join(os.tmpdir(), cacheHash);
    }
    try {
        fs.mkdirSync(cacheDir, {
            recursive: true
        });
    } catch (error) {
        throw new Error(`Failed to create cache directory: ${error.message}`);
    }
    return cacheDir;
};
const NodeCache = async (dir)=>{
    const fs = __turbopack_context__.r("[externals]/node:fs [external] (node:fs, cjs)");
    const path = __turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)");
    const os = __turbopack_context__.r("[externals]/node:os [external] (node:os, cjs)");
    const { createHash } = __turbopack_context__.r("[externals]/node:crypto [external] (node:crypto, cjs)");
    const cacheDir = await makeCacheDir(dir, fs, path, os);
    return {
        makeKey: (key)=>{
            const input = key && key instanceof Object ? JSON.stringify(key) : key || "";
            return createHash("sha256").update(input).digest("hex");
        },
        get: async (key)=>{
            let readValue;
            const cacheFilename = `${cacheDir}/${key}`;
            try {
                const data = await fs.promises.readFile(cacheFilename, "utf-8");
                readValue = JSON.parse(data);
            } catch (e) {
                if (e.code !== "ENOENT") {
                    console.error(`Failed to read cache file to ${cacheFilename}: ${e.message}`);
                }
            }
            return readValue;
        },
        set: async (key, value)=>{
            const cacheFilename = `${cacheDir}/${key}`;
            try {
                await fs.promises.writeFile(cacheFilename, JSON.stringify(value), {
                    encoding: "utf-8",
                    flag: "wx"
                });
            } catch (e) {
                if (e.code !== "EEXIST") {
                    console.error(`Failed to write cache file to ${cacheFilename}: ${e.message}`);
                }
            }
        }
    };
};
;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__86f67f90._.js.map