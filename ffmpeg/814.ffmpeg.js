!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.FFmpegWASM = t() : e.FFmpegWASM = t()
}(self, (() => (() => {
    var e = {
        454: e => {
            function t(e) {
                return Promise.resolve().then((() => {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND", t
                }))
            }

            t.keys = () => [], t.resolve = t, t.id = 454, e.exports = t
        }
    }, t = {};

    function r(o) {
        var s = t[o];
        if (void 0 !== s) return s.exports;
        var a = t[o] = {exports: {}};
        return e[o](a, a.exports, r), a.exports
    }

    return r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        const e = "https://unpkg.com/@ffmpeg/core@0.12.9/dist/umd/ffmpeg-core.js";
        var t;
        !function (e) {
            e.LOAD = "LOAD", e.EXEC = "EXEC", e.FFPROBE = "FFPROBE", e.WRITE_FILE = "WRITE_FILE", e.READ_FILE = "READ_FILE", e.DELETE_FILE = "DELETE_FILE", e.RENAME = "RENAME", e.CREATE_DIR = "CREATE_DIR", e.LIST_DIR = "LIST_DIR", e.DELETE_DIR = "DELETE_DIR", e.ERROR = "ERROR", e.DOWNLOAD = "DOWNLOAD", e.PROGRESS = "PROGRESS", e.LOG = "LOG", e.MOUNT = "MOUNT", e.UNMOUNT = "UNMOUNT"
        }(t || (t = {}));
        const o = new Error("unknown message type"),
            s = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"),
            a = (new Error("called FFmpeg.terminate()"), new Error("failed to import ffmpeg-core.js"));
        let n;
        self.onmessage = async ({data: {id: E, type: c, data: i}}) => {
            const p = [];
            let f;
            try {
                if (c !== t.LOAD && !n) throw s;
                switch (c) {
                    case t.LOAD:
                        f = await (async ({coreURL: o, wasmURL: s, workerURL: E}) => {
                            const c = !n;
                            try {
                                o || (o = e), importScripts(o)
                            } catch (e) {
                                console.error(e)
                                if (o && o !== e || (o = e.replace("/umd/", "/esm/")), self.createFFmpegCore = (await r(454)(o)).default, !self.createFFmpegCore) throw a
                            }
                            const i = o, p = s || o.replace(/.js$/g, ".wasm"),
                                f = E || o.replace(/.js$/g, ".worker.js");
                            return n = await self.createFFmpegCore({
                                mainScriptUrlOrBlob: `${i}#${btoa(JSON.stringify({
                                    wasmURL: p,
                                    workerURL: f
                                }))}`
                            }), n.setLogger((e => self.postMessage({
                                type: t.LOG,
                                data: e
                            }))), n.setProgress((e => self.postMessage({type: t.PROGRESS, data: e}))), c
                        })(i);
                        break;
                    case t.EXEC:
                        f = (({args: e, timeout: t = -1}) => {
                            n.setTimeout(t), n.exec(...e);
                            const r = n.ret;
                            return n.reset(), r
                        })(i);
                        break;
                    case t.FFPROBE:
                        f = (({args: e, timeout: t = -1}) => {
                            n.setTimeout(t), n.ffprobe(...e);
                            const r = n.ret;
                            return n.reset(), r
                        })(i);
                        break;
                    case t.WRITE_FILE:
                        f = (({path: e, data: t}) => (n.FS.writeFile(e, t), !0))(i);
                        break;
                    case t.READ_FILE:
                        f = (({path: e, encoding: t}) => n.FS.readFile(e, {encoding: t}))(i);
                        break;
                    case t.DELETE_FILE:
                        f = (({path: e}) => (n.FS.unlink(e), !0))(i);
                        break;
                    case t.RENAME:
                        f = (({oldPath: e, newPath: t}) => (n.FS.rename(e, t), !0))(i);
                        break;
                    case t.CREATE_DIR:
                        f = (({path: e}) => (n.FS.mkdir(e), !0))(i);
                        break;
                    case t.LIST_DIR:
                        f = (({path: e}) => {
                            const t = n.FS.readdir(e), r = [];
                            for (const o of t) {
                                const t = n.FS.stat(`${e}/${o}`), s = n.FS.isDir(t.mode);
                                r.push({name: o, isDir: s})
                            }
                            return r
                        })(i);
                        break;
                    case t.DELETE_DIR:
                        f = (({path: e}) => (n.FS.rmdir(e), !0))(i);
                        break;
                    case t.MOUNT:
                        f = (({fsType: e, options: t, mountPoint: r}) => {
                            const o = e, s = n.FS.filesystems[o];
                            return !!s && (n.FS.mount(s, t, r), !0)
                        })(i);
                        break;
                    case t.UNMOUNT:
                        f = (({mountPoint: e}) => (n.FS.unmount(e), !0))(i);
                        break;
                    default:
                        throw o
                }
            } catch (e) {
                return void self.postMessage({id: E, type: t.ERROR, data: e.toString()})
            }
            f instanceof Uint8Array && p.push(f.buffer), self.postMessage({id: E, type: c, data: f}, p)
        }
    })(), {}
})()));
//# sourceMappingURL=814.ffmpeg.js.map
