
const downloadFolder = Cypress.config('downloadsFolder')

const deleteDownloadFolder = () => {
    cy.task('deleteFolder', downloadFolder)
}

describe('download', () => {

    beforeEach(deleteDownloadFolder)

    it('Download file', () => {
        cy.visit('https://the-internet.herokuapp.com/download')
        cy.get('[href="download/testFile.txt"]').click()
        const f = cy.readFile(`${downloadFolder}/testFile.txt`)
    })

})

const fixturesFolder = Cypress.config('fixturesFolder')

describe('upload', () => {

    it('Upload file', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#file-upload').selectFile(`${fixturesFolder}/testFile.txt`)
        cy.get('#file-submit').click()
        cy.get('#uploaded-files').contains('testFile.txt')
    })

    it('Upload file with drag and drop', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.get('#drag-drop-upload').selectFile(`${fixturesFolder}/testFile.txt`, { action: "drag-drop"})
        cy.get('#file-submit').click()
        cy.get('#uploaded-files').contains('testFile.txt')
    })

})