import { defineConfig } from 'cypress'
import fs from 'node:fs'

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteFolder(folderName) {
          if (fs.existsSync(folderName)) {
            fs.rmdirSync(folderName, { recursive: true })
          }
          return null
        }
      })
    },
  },
})