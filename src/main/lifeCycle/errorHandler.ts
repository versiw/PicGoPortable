import path, { join } from 'path'
// import { app } from 'electron'
import { getLogger } from 'apis/core/utils/localLogger'

// 自定义软件运行缓存路径
const projectRootPath = process.cwd()
const projectName = projectRootPath.split('\\').pop()?.toLocaleLowerCase()
const customDataPath = join(projectRootPath, `/.cache/${projectName}`)
// app.setPath('userData', customDataPath)

// const STORE_PATH = app.getPath('userData')
const STORE_PATH = customDataPath
const LOG_PATH = path.join(STORE_PATH, 'picgo-gui-local.log')

const logger = getLogger(LOG_PATH)

// since the error may occur in picgo-core
// so we can't use the log from picgo

const handleProcessError = (error: Error | string) => {
  logger('error', error)
}

process.on('uncaughtException', error => {
  handleProcessError(error)
})

process.on('unhandledRejection', (error: any) => {
  handleProcessError(error)
})

// thanks to https://github.com/camunda/camunda-modeler/pull/3314
function bootstrapEPIPESuppression () {
  let suppressing = false
  function logEPIPEErrorOnce () {
    if (suppressing) {
      return
    }

    suppressing = true
    handleProcessError('Detected EPIPE error; suppressing further EPIPE errors')
  }

  require('epipebomb')(process.stdout, logEPIPEErrorOnce)
  require('epipebomb')(process.stderr, logEPIPEErrorOnce)
}

bootstrapEPIPESuppression()
