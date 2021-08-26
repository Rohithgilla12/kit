export {}

import {
  PromptData,
  Script,
  Choice,
  EditorConfig,
  TextareaConfig,
} from "kit-bridge/esm/type"
import { Mode, UI } from "kit-bridge/esm/enum"
import { AxiosInstance } from "axios"
import * as shelljs from "shelljs"
import * as child_process from "child_process"
import * as fsPromises from "fs/promises"
import * as fs from "fs"
import * as handlebars from "handlebars"
import * as uuidType from "uuid"
import * as clipboardy from "clipboardy"
import * as trashType from "trash"
import { LoDashStatic } from "lodash"
import { ChalkFunction } from "chalk"
import { CLI } from "./cli"
import { Main } from "./main"
import { Lib } from "./lib"
import { JSONFile, Low } from "lowdb"
import { NodeNotifier } from "node-notifier/index"

type Panel =
  | string
  | (() => string)
  | (() => Promise<string>)
  | ((input: string) => Promise<any>)

interface Arg {
  [key: string]: any
  <T = string>(
    placeholderOrConfig?: string | PromptConfig,
    choicesOrPanel?: Choices<T> | Panel
  ): Promise<T>
}

interface TextArea {
  (
    placeholderOrOptions?: string | TextareaConfig
  ): Promise<string>
}
interface Drop {
  (hint?: string): Promise<any>
}
interface Editor {
  (config?: EditorConfig): Promise<any>
}
interface Form {
  (html?: string, formData?: any): Promise<any>
}
interface Div {
  (html?: string, containerClass?: string): Promise<void>
}

interface KeyData {
  key: string
  command: boolean
  shift: boolean
  option: boolean
  control: boolean
  fn: boolean
  hyper: boolean
  os: boolean
  super: boolean
  win: boolean
  shortcut: string
}
interface Hotkey {
  (placeholder?: string): Promise<KeyData>
}

interface EnvConfig extends PromptConfig {
  reset?: boolean
}
interface Env {
  (
    envKey: string,
    promptConfig?: EnvConfig | (() => Promise<string>)
  ): Promise<string>
  [key: string]: any
}

interface Args extends Array<string> {}

interface UpdateArgs {
  (args: string[]): void
}

interface PathFn {
  (...pathParts: string[]): string
}

interface Inspect {
  (data: any, extension?: string): Promise<void>
}

interface CompileTemplate {
  (template: string, vars: any): Promise<string>
}

interface OnTab {
  (name: string, fn: () => void): void
}

interface Markdown {
  (markdown: string): string
}

interface AppleScript {
  (script: string, options?: any): Promise<string>
}

interface Send {
  (channel: string, data?: any): void
}

interface KitModuleLoader {
  (
    packageName: string,
    ...moduleArgs: string[]
  ): Promise<any>
}
interface CliModuleLoader {
  (
    packageName: keyof CLI,
    ...moduleArgs: string[]
  ): Promise<any>
}
interface LibModuleLoader {
  (
    packageName: keyof Lib,
    ...moduleArgs: string[]
  ): Promise<any>
}

interface MainModuleLoader {
  (
    packageName: keyof Main,
    ...moduleArgs: string[]
  ): Promise<any>
}

interface SetAppProp {
  (value: any): void
}
interface SetPanel {
  (html: string, containerClasses?: string): void
}

interface ShowAppWindow {
  (content: string, options?: any): void
}

interface Edit {
  (
    file: string,
    dir?: string,
    line?: string | number,
    col?: string | number
  ): Promise<void>
}

interface Wait {
  (time: number): Promise<void>
}

interface IsCheck {
  (file: string): Promise<boolean>
}

interface DB {
  (
    key: string,
    defaults?: any,
    forceReload?: boolean
  ): Promise<Low<any> | any>
}

interface GetScripts {
  (fromCache: boolean): Promise<Script[]>
}

type FlagsOptions =
  | {
      [key: string]:
        | {
            shortcut?: string
            name?: string
            description?: string
          }
        | undefined
    }
  | undefined

export type FlagFn = (flags: FlagsOptions) => void
type Flags = {
  [key: string]: boolean | string
}

interface SelectKitEditor {
  (reset: boolean): Promise<string>
}

interface KitApi {
  cd: typeof shelljs.cd
  cp: typeof shelljs.cp
  chmod: typeof shelljs.chmod
  echo: typeof shelljs.echo
  exec: typeof shelljs.exec
  exit: typeof shelljs.exit
  grep: typeof shelljs.grep
  ln: typeof shelljs.ln
  ls: typeof shelljs.ls
  mkdir: typeof shelljs.mkdir
  mv: typeof shelljs.mv
  sed: typeof shelljs.sed
  tempdir: typeof shelljs.tempdir
  test: typeof shelljs.test
  which: typeof shelljs.which
  spawn: typeof child_process.spawn
  spawnSync: typeof child_process.spawnSync
  fork: typeof child_process.fork
  get: AxiosInstance["get"]
  put: AxiosInstance["put"]
  post: AxiosInstance["post"]
  patch: AxiosInstance["patch"]
  fetch: typeof import("node-fetch")
  readFile: typeof fsPromises.readFile
  writeFile: typeof fsPromises.writeFile
  appendFile: typeof fsPromises.appendFile
  createReadStream: typeof fs.createReadStream
  createWriteStream: typeof fs.createWriteStream
  readdir: typeof fsPromises.readdir
  compile: typeof handlebars.compile

  cwd: typeof process.cwd
  pid: typeof process.pid
  stderr: typeof process.stderr
  stdin: typeof process.stdin
  stdout: typeof process.stdout
  uptime: typeof process.uptime

  path: typeof import("path")

  _: LoDashStatic

  uuid: typeof uuidType.v4
  chalk: ChalkFunction
  paste: typeof clipboardy.read
  copy: typeof clipboardy.write
  db: DB

  trash: typeof trashType
  rm: typeof trashType

  wait: Wait

  checkProcess: (processId: number) => string

  home: PathFn
  isFile: IsCheck
  isDir: IsCheck
  isBin: IsCheck

  //preload/kit.cjs
  arg: Arg
  textarea: TextArea
  drop: Drop
  editor: Editor
  form: Form
  div: Div
  hotkey: Hotkey
  env: Env
  argOpts: any

  kitPrompt: (promptConfig: PromptConfig) => Promise<any>

  kitPath: PathFn
  kenvPath: PathFn
  libPath: PathFn

  kitMenuCachePath: () => string

  tmp: PathFn
  inspect: Inspect

  compileTemplate: CompileTemplate

  onTab: OnTab
  md: Markdown

  applescript: AppleScript
  send: Send

  attemptImport: KitModuleLoader
  npm: KitModuleLoader
  main: MainModuleLoader
  lib: LibModuleLoader
  cli: CliModuleLoader
  setup: KitModuleLoader
  run: KitModuleLoader

  setPlaceholder: SetAppProp
  setPanel: SetPanel
  setLog: SetPanel
  setHint: SetAppProp
  setInput: SetAppProp
  setIgnoreBlur: SetAppProp

  show: ShowAppWindow
  showImage: ShowAppWindow

  edit: Edit

  args: Args
  updateArgs: UpdateArgs

  kitScript: string

  terminal: (script: string) => Promise<string>
  iterm: (iterm: string) => Promise<string>

  onTabs: {
    name: string
    fn: (input?: string) => void | Promise<any>
  }[]
  onTabIndex: number

  runSub: (
    scriptPath: string,
    ...runArgs: string[]
  ) => Promise<any>

  setMode: (mode: Mode) => void

  currentOnTab: any
  kitPrevChoices: Choices<any>

  setChoices: (
    choices: Choices<any>,
    className?: string
  ) => void
  getDataFromApp: (channel: string) => Promise<any>
  getBackgroundTasks: () => Promise<{
    channel: string
    tasks: Background[]
  }>
  getSchedule: () => Promise<{
    channel: string
    schedule: Schedule[]
  }>
  getScriptsState: () => Promise<{
    channel: string
    tasks: Background[]
    schedule: Schedule[]
  }>

  notify: Notify

  getScripts: GetScripts

  memoryMap: Map<string, any>

  selectKitEditor: SelectKitEditor

  $: typeof import("zx").$
  download: typeof import("download")
  degit: typeof import("degit")

  kit: Kit

  openLog: () => void

  hide: () => void
  flag: Flags
  setFlags: FlagFn
}

type GlobalKit = KitApi & typeof import("./api/lib")

declare global {
  type Choices<Value> =
    | string[]
    | Choice<Value>[]
    | (() => Choice<Value>[])
    | (() => Promise<Choice<Value>[]>)
    | Promise<Choice<any>[]>
    | GenerateChoices

  interface GenerateChoices {
    (input: string): Choice<any>[] | Promise<Choice<any>[]>
  }
  interface PromptConfig
    extends Partial<
      Omit<PromptData, "choices" | "id" | "script">
    > {
    validate?: (
      choice: string
    ) => boolean | string | Promise<boolean | string>
    choices?: Choices<any> | Panel
    flags?: FlagsOptions
  }

  interface Background {
    filePath: string
    process: {
      spawnargs: string[]
      pid: number
      start: string
    }
  }

  interface Schedule {
    filePath: string
    date: Date
  }

  interface Notify {
    (notification: string | Notification): NodeNotifier
  }

  namespace NodeJS {
    interface Global extends GlobalKit {}
  }

  let cd: typeof shelljs.cd
  let cp: typeof shelljs.cp
  let chmod: typeof shelljs.chmod
  let echo: typeof shelljs.echo
  let exec: typeof shelljs.exec
  let exit: typeof shelljs.exit
  let grep: typeof shelljs.grep
  let ln: typeof shelljs.ln
  let ls: typeof shelljs.ls
  let mkdir: typeof shelljs.mkdir
  let mv: typeof shelljs.mv
  let sed: typeof shelljs.sed
  let tempdir: typeof shelljs.tempdir
  let test: typeof shelljs.test
  let which: typeof shelljs.which
  let spawn: typeof child_process.spawn
  let spawnSync: typeof child_process.spawnSync
  let fork: typeof child_process.fork
  let get: AxiosInstance["get"]
  let put: AxiosInstance["put"]
  let post: AxiosInstance["post"]
  let patch: AxiosInstance["patch"]
  let readFile: typeof fsPromises.readFile
  let writeFile: typeof fsPromises.writeFile
  let appendFile: typeof fsPromises.appendFile
  let createWriteStream: typeof fs.createWriteStream
  let createReadStream: typeof fs.createReadStream
  let readdir: typeof fsPromises.readdir
  let compile: typeof handlebars.compile

  let cwd: typeof process.cwd

  let path: typeof import("path")

  let paste: typeof clipboardy.read
  let copy: typeof clipboardy.write
  let edit: Edit

  let chalk: ChalkFunction

  let download: typeof import("download")
  let degit: typeof import("degit")

  let trash: typeof trashType.default
  let rm: typeof trashType

  let kitPath: PathFn
  let kenvPath: PathFn

  let attemptImport: KitModuleLoader
  let npm: KitModuleLoader
  let main: KitModuleLoader
  let kit: Kit
  let lib: KitModuleLoader
  let cli: CliModuleLoader
  let setup: KitModuleLoader
  let run: KitModuleLoader

  let env: Env
  let arg: Arg
  let textarea: TextArea
  let drop: Drop
  let editor: Editor
  let hotkey: Hotkey
  let onTab: OnTab
  let applescript: AppleScript
  let send: Send
  let args: Args

  let updateArgs: UpdateArgs
  let argOpts: any

  let setPlaceholder: SetAppProp
  let setPanel: SetPanel
  let setLog: SetPanel
  let setHint: SetAppProp
  let setInput: SetAppProp
  let setIgnoreBluer: SetAppProp

  let show: ShowAppWindow
  let showImage: ShowAppWindow

  let wait: Wait

  let home: PathFn
  let isFile: IsCheck
  let isDir: IsCheck
  let isBin: IsCheck

  let inspect: Inspect

  let db: DB

  let md: Markdown
  let notify: Notify

  let memoryMap: Map<string, any>

  let onTabIndex: number

  let selectKitEditor: SelectKitEditor

  let copyPathAsImage: typeof import("./lib/file").copyPathAsImage
  let fileSearch: typeof import("./lib/file").fileSearch
  let focusTab: typeof import("./lib/browser").focusTab
  let focusWindow: typeof import("./lib/desktop").focusWindow
  let getActiveAppBounds: typeof import("./lib/desktop").getActiveAppBounds
  let getActiveScreen: typeof import("./lib/desktop").getActiveScreen
  let getActiveTab: typeof import("./lib/browser").getActiveTab
  let getMousePosition: typeof import("./lib/desktop").getMousePosition
  let getScreens: typeof import("./lib/desktop").getScreens
  let getSelectedFile: typeof import("./lib/file").getSelectedFile
  let getSelectedText: typeof import("./lib/text").getSelectedText
  let getTabs: typeof import("./lib/browser").getTabs
  let getWindows: typeof import("./lib/desktop").getWindows
  let getWindowsBounds: typeof import("./lib/desktop").getWindowsBounds
  let lock: typeof import("./lib/system").lock
  let organizeWindows: typeof import("./lib/desktop").organizeWindows
  let playAudioFile: typeof import("./lib/audio").playAudioFile
  let quitAllApps: typeof import("./lib/system").quitAllApps
  let say: typeof import("./lib/speech").say
  let scatterWindows: typeof import("./lib/desktop").scatterWindows
  let setActiveAppBounds: typeof import("./lib/desktop").setActiveAppBounds
  let setSelectedText: typeof import("./lib/text").setSelectedText
  let setWindowBoundsByIndex: typeof import("./lib/desktop").setWindowBoundsByIndex
  let setWindowPosition: typeof import("./lib/desktop").setWindowPosition
  let setWindowPositionByIndex: typeof import("./lib/desktop").setWindowPositionByIndex
  let setWindowSize: typeof import("./lib/desktop").setWindowSize
  let setWindowSizeByIndex: typeof import("./lib/desktop").setWindowSizeByIndex
  let keystroke: typeof import("./lib/keyboard").keystroke
  let shutdown: typeof import("./lib/system").shutdown
  let sleep: typeof import("./lib/system").sleep
  let tileWindow: typeof import("./lib/desktop").tileWindow
  let scrapeSelector: typeof import("./lib/browser").scrapeSelector
  let scrapeAttribute: typeof import("./lib/browser").scrapeAttribute

  let getScripts: GetScripts

  let $: typeof import("zx").$

  let openLog: () => void
  let hide: () => void
  let flag: Flags
  let setFlags: FlagFn
}

type Run = (command: string) => Promise<any>
type Kit = Omit<GlobalKit, "kit"> & Run