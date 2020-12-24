// import "/home/nitesh/git-issues/backend/app.js"
// const server = require("../../../backend/app")

describe('Testing the Frontend components. ', () => {
    it('should render filter section along with all the options', () => {
        cy.visit('http://localhost:3000')
        cy.get('#filters').select('isOpen').should('have.value','isOpen')
        cy.get('#filters').select('isClosed').should('have.value','isClosed')
        cy.get('#filters').select('Show all').should('have.value','Show all')

    })

    it('should render add-issue button', () => {
        cy.visit('http://localhost:3000')
        cy.get('#add-issue').should('be.visible')
    })

    it('should render all issues card', () => {
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
        cy.visit('http://localhost:3000')
        cy.get('#add-issue').click()
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
            url: "/api/list-issues?page=1"
            , method: "GET",
        },(req) =>{
            console.log(req,"dsffsdf")
            req.reply([
                {"id":21,"title":"Issue1","comment":"comment1","author":"author1","date":"2020-12-24T11:20:51.000Z","isOpen":1},
                {"id":22,"title":"Issue2","comment":"comment2","author":"author2","date":"2020-12-24T11:21:18.000Z","isOpen":1},
                {"id":23,"title":"Issue3","comment":"comment3","author":"author3","date":"2020-12-24T11:21:30.000Z","isOpen":1},
                {"id":24,"title":"Issue4","comment":"comment4","author":"author4","date":"2020-12-24T11:21:40.000Z","isOpen":1},
                {"id":25,"title":"Issue5","comment":"comment5","author":"author5","date":"2020-12-24T11:21:49.000Z","isOpen":1},
                {"id":27,"title":"Issue6","comment":"comment6","author":"author6","date":"2020-12-24T11:22:12.000Z","isOpen":0},
                {"id":28,"title":"Issue7","comment":"comment7","author":"author7","date":"2020-12-24T11:22:20.000Z","isOpen":1},
                {"id":29,"title":"Issue8","comment":"comment8","author":"author8","date":"2020-12-24T11:22:29.000Z","isOpen":1},
                {"id":30,"title":"Issue9","comment":"comment9","author":"author9","date":"2020-12-24T11:22:39.000Z","isOpen":1},
                {"id":31,"title":"Issue10","comment":"comment10","author":"author10","date":"2020-12-24T11:22:49.000Z","isOpen":0}
            ]) 
        })

        cy.intercept({
            url: "api/list-issues?page=2"
            , method: "GET",
        },(req) =>{
            console.log(req,"dsffsdf")
            req.reply([
                {"id":21,"title":"Issue1","comment":"comment1","author":"author1","date":"2020-12-24T11:20:51.000Z","isOpen":1},
                {"id":22,"title":"Issue2","comment":"comment2","author":"author2","date":"2020-12-24T11:21:18.000Z","isOpen":1},
                {"id":23,"title":"Issue3","comment":"comment3","author":"author3","date":"2020-12-24T11:21:30.000Z","isOpen":1},
                {"id":24,"title":"Issue4","comment":"comment4","author":"author4","date":"2020-12-24T11:21:40.000Z","isOpen":1},
                {"id":25,"title":"Issue5","comment":"comment5","author":"author5","date":"2020-12-24T11:21:49.000Z","isOpen":1},
            ]) 
        })

    })
    
    it('sjdhflaskdf',()=>{
        cy.visit('http://localhost:3000')

    })

    // cy.intercept('/billing', (req) => {   
    //     // functions on 'req' can be used to dynamically respond to a request here    
    //     // send the request to the destination server   
    //     // req.reply()    
    //     // respond to the request with a JSON object   
    //     req.reply({ plan: 'starter' })    
    //     // send the request to the destination server, and intercept the response   
    //     // req.reply((res) => {     
    //         // 'res' represents the real destination's response     
    //         // See "Intercepting a response" for more details and examples   
    //     // }) 
    // })

    it('page value should be 1 whenever select any value from filter', () => {
        cy.visit('http://localhost:3000')
        cy.get('#filters').select('isOpen').get('#page').contains('1')
        cy.get('#filters').select('isClosed').get('#page').contains('1')
        cy.get('#filters').select('Show all').get('#page').contains('1')

    })
    
    it('should select only a single value in filter drop down', () => {
        cy.visit('http://localhost:3000')
        cy.get('#filters').select('isOpen').get('#Closed').should('not.exist')
        cy.get('#filters').select('isClosed').get('#Open').should('not.exist')
        cy.get('#filters').select('Show all')
        cy.get('#filters').select('Show all').get('#issue_title0').contains('Issue1')
        cy.get('#filters').select('Show all').get('#issue_title5').contains('Issue6')

    })

    // it('should take new valid issues', () => {
    //     cy.visit('http://localhost:3000')
    //     cy.get('#add-issue').click()
    //     cy.get('input[name="author"]').type("Author created by test")
    //     cy.get('input[name="title"]').type("Title created by test")
    //     cy.get('input[name="comment"]').type("Comment created by test")
    //     cy.get('Button[name="submit"]').click()
    // })

    // it('testing of pagination', () => {
    //     cy.visit('http://localhost:3000')
    //     cy.get('#page').contains('1').get('#issue_title0').contains('Issue1')
    //     cy.get('#next').click()
    //     cy.get('#page').contains('2').get('#issue_title0').contains('Issue11')
    //     cy.get('#prev').click()
    //     cy.get('#page').contains('1').get('#issue_title0').contains('Issue1')
    // })
})