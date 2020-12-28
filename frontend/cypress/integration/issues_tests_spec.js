describe('Testing the Frontend components. ', () => {
    it('should render filter section along with all the options', () => {
        cy.visit('http://localhost:3000')
        cy.get('#filters').select('isOpen').should('have.value', 'isOpen')
        cy.get('#filters').select('isClosed').should('have.value', 'isClosed')
        cy.get('#filters').select('Show all').should('have.value', 'Show all')
    })

    it('should render add-issue button', () => {
        cy.visit('http://localhost:3000')
        cy.get('#add-issue').should('be.visible')
    })

    it('should render all issues card', () => {


        cy.intercept({
            url: "/api/issue?page=1"
            , method: "GET",
        }, (req) => {
            req.reply([{ "id": 1, "title": "Issue1", "comment": "comment1", "author": "author1", "date": "2020-12-26T19:52:01.000Z", "isOpen": 1 }, { "id": 2, "title": "Issue2", "comment": "comment2", "author": "author2", "date": "2020-12-26T19:52:01.000Z", "isOpen": 1 }, { "id": 3, "title": "Issue3", "comment": "comment3", "author": "author3", "date": "2020-12-26T19:52:01.000Z", "isOpen": 1 }, { "id": 4, "title": "Issue4", "comment": "comment4", "author": "author4", "date": "2020-12-26T19:52:02.000Z", "isOpen": 1 }, { "id": 5, "title": "Issue5", "comment": "comment5", "author": "author5", "date": "2020-12-26T19:52:03.000Z", "isOpen": 0 }, { "id": 6, "title": "Issue6", "comment": "comment6", "author": "author6", "date": "2020-12-26T19:52:03.000Z", "isOpen": 0 }, { "id": 7, "title": "Issue7", "comment": "comment7", "author": "author7", "date": "2020-12-26T19:52:03.000Z", "isOpen": 1 }, { "id": 8, "title": "Issue8", "comment": "comment8", "author": "author8", "date": "2020-12-26T19:52:04.000Z", "isOpen": 1 }, { "id": 9, "title": "Issue9", "comment": "comment9", "author": "author9", "date": "2020-12-26T19:52:05.000Z", "isOpen": 1 }, { "id": 10, "title": "Issue10", "comment": "comment10", "author": "author10", "date": "2020-12-26T19:52:07.000Z", "isOpen": 0 }])
        })


        cy.visit('http://localhost:3000')
        cy.get('#status_image')
        cy.get('#issue_title0')
        cy.get('#issue_title1')
        cy.get('#issue_title2')
        cy.get('#issue_title3')
        cy.get('#issue_title4')
        cy.get('#issue_title5')
        cy.get('#issue_title6')
        cy.get('#issue_title7')
        cy.get('#issue_title8')
        cy.get('#issue_title9')
        cy.get('#issue_metadata')
    })

    it('should render all the input boxes required for inserting a new issue', () => {
        cy.visit('http://localhost:3000/addissue')
        cy.get('input[name="author"]').should('be.visible').should('be.enabled')
        cy.get('input[name="title"]').should('be.visible').should('be.enabled')
        cy.get('input[name="comment"]').should('be.visible').should('be.enabled')
        cy.get('Button[name="submit"]').should('be.visible')
    })

    it('should render pagination section', () => {
        cy.visit('http://localhost:3000')
        cy.get('#prev')
        cy.get('#page')
        cy.get('#next')
    })

})


describe('Testing functionality ', () => {

    beforeEach(() => {
        cy.intercept({
            url: "/api/issue?page=1"
            , method: "GET",
        }, (req) => {
            req.reply([{ "id": 1, "title": "Issue1", "comment": "comment1", "author": "author1", "date": "2020-12-26T19:52:01.000Z", "isOpen": 1 }, { "id": 2, "title": "Issue2", "comment": "comment2", "author": "author2", "date": "2020-12-26T19:52:01.000Z", "isOpen": 1 }, { "id": 3, "title": "Issue3", "comment": "comment3", "author": "author3", "date": "2020-12-26T19:52:01.000Z", "isOpen": 1 }, { "id": 4, "title": "Issue4", "comment": "comment4", "author": "author4", "date": "2020-12-26T19:52:02.000Z", "isOpen": 1 }, { "id": 5, "title": "Issue5", "comment": "comment5", "author": "author5", "date": "2020-12-26T19:52:03.000Z", "isOpen": 0 }, { "id": 6, "title": "Issue6", "comment": "comment6", "author": "author6", "date": "2020-12-26T19:52:03.000Z", "isOpen": 0 }, { "id": 7, "title": "Issue7", "comment": "comment7", "author": "author7", "date": "2020-12-26T19:52:03.000Z", "isOpen": 1 }, { "id": 8, "title": "Issue8", "comment": "comment8", "author": "author8", "date": "2020-12-26T19:52:04.000Z", "isOpen": 1 }, { "id": 9, "title": "Issue9", "comment": "comment9", "author": "author9", "date": "2020-12-26T19:52:05.000Z", "isOpen": 1 }, { "id": 10, "title": "Issue10", "comment": "comment10", "author": "author10", "date": "2020-12-26T19:52:07.000Z", "isOpen": 0 }])
        })

        cy.intercept({
            url: "/api/issue?page=1&isOpen=true"
            , method: "GET",
        }, (req) => {
            req.reply([{ "id": 1, "title": "Issue1", "comment": "comment1", "author": "author1", "date": "2020-12-26T20:24:47.000Z", "isOpen": 1 }, { "id": 2, "title": "Issue2", "comment": "comment2", "author": "author2", "date": "2020-12-26T20:24:48.000Z", "isOpen": 1 }, { "id": 3, "title": "Issue3", "comment": "comment3", "author": "author3", "date": "2020-12-26T20:24:49.000Z", "isOpen": 1 }, { "id": 4, "title": "Issue4", "comment": "comment4", "author": "author4", "date": "2020-12-26T20:24:50.000Z", "isOpen": 1 }, { "id": 7, "title": "Issue7", "comment": "comment7", "author": "author7", "date": "2020-12-26T20:24:51.000Z", "isOpen": 1 }, { "id": 8, "title": "Issue8", "comment": "comment8", "author": "author8", "date": "2020-12-26T20:24:52.000Z", "isOpen": 1 }, { "id": 9, "title": "Issue9", "comment": "comment9", "author": "author9", "date": "2020-12-26T20:24:52.000Z", "isOpen": 1 }, { "id": 11, "title": "Issue11", "comment": "comment11", "author": "author11", "date": "2020-12-26T20:24:52.000Z", "isOpen": 1 }, { "id": 12, "title": "Issue12", "comment": "comment12", "author": "author12", "date": "2020-12-26T20:24:53.000Z", "isOpen": 1 }, { "id": 13, "title": "Issue13", "comment": "comment13", "author": "author13", "date": "2020-12-26T20:24:54.000Z", "isOpen": 1 }])
        })

        cy.intercept({
            url: "/api/issue?page=1&isOpen=false"
            , method: "GET",
        }, (req) => {
            req.reply([{ "id": 5, "title": "Issue5", "comment": "comment5", "author": "author5", "date": "2020-12-26T20:24:50.000Z", "isOpen": 0 }, { "id": 6, "title": "Issue6", "comment": "comment6", "author": "author6", "date": "2020-12-26T20:24:51.000Z", "isOpen": 0 }, { "id": 10, "title": "Issue10", "comment": "comment10", "author": "author10", "date": "2020-12-26T20:24:52.000Z", "isOpen": 0 }, { "id": 14, "title": "Issue14", "comment": "comment14", "author": "author14", "date": "2020-12-26T20:24:54.000Z", "isOpen": 0 }, { "id": 19, "title": "Issue19", "comment": "comment19", "author": "author19", "date": "2020-12-26T20:24:56.000Z", "isOpen": 0 }, { "id": 24, "title": "Issue24", "comment": "comment24", "author": "author24", "date": "2020-12-26T20:24:58.000Z", "isOpen": 0 }, { "id": 29, "title": "Issue29", "comment": "comment29", "author": "author29", "date": "2020-12-26T20:24:59.000Z", "isOpen": 0 }])
        })

        cy.intercept({
            url: "api/issue?page=2"
            , method: "GET",
        }, (req) => {
            req.reply([{ "id": 11, "title": "Issue11", "comment": "comment11", "author": "author11", "date": "2020-12-26T19:52:08.000Z", "isOpen": 1 }, { "id": 12, "title": "Issue12", "comment": "comment12", "author": "author12", "date": "2020-12-26T19:52:08.000Z", "isOpen": 1 }, { "id": 13, "title": "Issue13", "comment": "comment13", "author": "author13", "date": "2020-12-26T19:52:08.000Z", "isOpen": 1 }, { "id": 14, "title": "Issue14", "comment": "comment14", "author": "author14", "date": "2020-12-26T19:52:09.000Z", "isOpen": 0 }, { "id": 15, "title": "Issue15", "comment": "comment15", "author": "author15", "date": "2020-12-26T19:52:10.000Z", "isOpen": 1 }, { "id": 16, "title": "Issue16", "comment": "comment16", "author": "author16", "date": "2020-12-26T19:52:10.000Z", "isOpen": 1 }, { "id": 17, "title": "Issue17", "comment": "comment17", "author": "author17", "date": "2020-12-26T19:52:10.000Z", "isOpen": 1 }, { "id": 18, "title": "Issue18", "comment": "comment18", "author": "author18", "date": "2020-12-26T19:52:10.000Z", "isOpen": 1 }, { "id": 19, "title": "Issue19", "comment": "comment19", "author": "author19", "date": "2020-12-26T19:52:10.000Z", "isOpen": 0 }, { "id": 20, "title": "Issue20", "comment": "comment20", "author": "author20", "date": "2020-12-26T19:52:11.000Z", "isOpen": 1 }])
        })

        cy.intercept({
            url: "api/issue?page=2&isOpen=true"
            , method: "GET",
        }, (req) => {
            req.reply([{ "id": 15, "title": "Issue15", "comment": "comment15", "author": "author15", "date": "2020-12-26T20:24:55.000Z", "isOpen": 1 }, { "id": 16, "title": "Issue16", "comment": "comment16", "author": "author16", "date": "2020-12-26T20:24:55.000Z", "isOpen": 1 }, { "id": 17, "title": "Issue17", "comment": "comment17", "author": "author17", "date": "2020-12-26T20:24:55.000Z", "isOpen": 1 }, { "id": 18, "title": "Issue18", "comment": "comment18", "author": "author18", "date": "2020-12-26T20:24:56.000Z", "isOpen": 1 }, { "id": 20, "title": "Issue20", "comment": "comment20", "author": "author20", "date": "2020-12-26T20:24:56.000Z", "isOpen": 1 }, { "id": 21, "title": "Issue21", "comment": "comment21", "author": "author21", "date": "2020-12-26T20:24:57.000Z", "isOpen": 1 }, { "id": 22, "title": "Issue22", "comment": "comment22", "author": "author22", "date": "2020-12-26T20:24:57.000Z", "isOpen": 1 }, { "id": 23, "title": "Issue23", "comment": "comment23", "author": "author23", "date": "2020-12-26T20:24:58.000Z", "isOpen": 1 }, { "id": 25, "title": "Issue25", "comment": "comment25", "author": "author25", "date": "2020-12-26T20:24:59.000Z", "isOpen": 1 }, { "id": 26, "title": "Issue26", "comment": "comment26", "author": "author26", "date": "2020-12-26T20:24:59.000Z", "isOpen": 1 }])
        })

        cy.intercept({
            url: "api/issue"
            , method: "POST",
        }, (req) => {
            expect(req.body.author).to.be.eq('Author created by frontend test')

            console.log(req.body, "post request is here")
            req.reply({})
        })

    })


    it('page value should be 1 whenever select any option from the filter', () => {
        cy.visit('http://localhost:3000')
        cy.get('#filters').select('isOpen').get('#page').contains('1')
        cy.get('#filters').select('isClosed').get('#page').contains('1')
        cy.get('#filters').select('Show all').get('#page').contains('1')

    })


    it('should take new valid issues', () => {
        cy.visit('http://localhost:3000')
        cy.get('#add-issue').click()
        cy.get('input[name="author"]').type("Author created by frontend test")
        cy.get('input[name="title"]').type("Title created by frontend test")
        cy.get('input[name="comment"]').type("Comment created by frontend test")
        cy.get('Button[name="submit"]').click()
    })

    it('testing of pagination', () => {
        cy.visit('http://localhost:3000')
        cy.get('#page').contains('1').get('#issue_title0').contains('Issue1')
        cy.get('#page').contains('1').get('#issue_title9').contains('Issue10')
        cy.get('#next').click()
        cy.get('#page').contains('2').get('#issue_title0').contains('Issue11')
        cy.get('#page').contains('2').get('#issue_title9').contains('Issue20')
        cy.get('#prev').click()
        cy.get('#page').contains('1').get('#issue_title0').contains('Issue1')
        cy.get('#page').contains('1').get('#issue_title9').contains('Issue10')
        cy.get('#filters').select('isClosed')
        cy.get('#page').contains('1').get('#issue_title0').contains('Issue1')
        cy.get('#page').contains('1').get('#issue_title9').contains('Issue10')
    })

})



