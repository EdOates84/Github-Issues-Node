const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
chai.use(chaiHttp);
const server = require("../app");

describe("Testing Backend. ", () => {

    it("Server should store issue and issue should be deleted.", (done) => {
        let issue = {
            title: "title created on backend testing",
            comment: "comment created on backend testing",
            author: "author created on backend testing"
        }
        let issue_delete_msg = {
            msg: "Issue Deleted"
        }
        chai.request(server)
            .post("/api/issue")
            .send(issue)
            .end((err, res) => {
                expect(res).to.have.status(200);
                chai.request(server)
                    .delete("/api/issue/" + res.body.id)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.deep.includes(issue_delete_msg)
                        done();
                    });
            });
    });

    it("Server should store issue and return it back on GET issue request.", (done) => {
        let issue = {
            title: "title created on backend testing",
            comment: "comment created on backend testing",
            author: "author created on backend testing"
        }

        chai.request(server)
            .post("/api/issue")
            .send(issue)
            .end((err, res) => {
                expect(res).to.have.status(200);

                chai.request(server)
                    .get("/api/issue/" + res.body.id)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.deep.includes(issue)
                        done();
                    });
            });
    });


    it("Server should return a list of 10 issues for a given page.", (done) => {
        let issues_list_1 = [{ "id": 1, "title": "Issue1", "comment": "comment1", "author": "author1", "isOpen": 1 }, { "id": 2, "title": "Issue2", "comment": "comment2", "author": "author2", "isOpen": 1 }, { "id": 3, "title": "Issue3", "comment": "comment3", "author": "author3", "isOpen": 1 }, { "id": 4, "title": "Issue4", "comment": "comment4", "author": "author4", "isOpen": 1 }, { "id": 5, "title": "Issue5", "comment": "comment5", "author": "author5", "isOpen": 0 }, { "id": 6, "title": "Issue6", "comment": "comment6", "author": "author6", "isOpen": 0 }, { "id": 7, "title": "Issue7", "comment": "comment7", "author": "author7", "isOpen": 1 }, { "id": 8, "title": "Issue8", "comment": "comment8", "author": "author8", "isOpen": 1 }, { "id": 9, "title": "Issue9", "comment": "comment9", "author": "author9", "isOpen": 1 }, { "id": 10, "title": "Issue10", "comment": "comment10", "author": "author10", "isOpen": 0 }]

        let issues_list_2 = [{ "id": 11, "title": "Issue11", "comment": "comment11", "author": "author11", "isOpen": 1 }, { "id": 12, "title": "Issue12", "comment": "comment12", "author": "author12", "isOpen": 1 }, { "id": 13, "title": "Issue13", "comment": "comment13", "author": "author13", "isOpen": 1 }, { "id": 14, "title": "Issue14", "comment": "comment14", "author": "author14", "isOpen": 0 }, { "id": 15, "title": "Issue15", "comment": "comment15", "author": "author15", "isOpen": 1 }, { "id": 16, "title": "Issue16", "comment": "comment16", "author": "author16", "isOpen": 1 }, { "id": 17, "title": "Issue17", "comment": "comment17", "author": "author17", "isOpen": 1 }, { "id": 18, "title": "Issue18", "comment": "comment18", "author": "author18", "isOpen": 1 }, { "id": 19, "title": "Issue19", "comment": "comment19", "author": "author19", "isOpen": 0 }, { "id": 20, "title": "Issue20", "comment": "comment20", "author": "author20", "isOpen": 1 }]

        chai.request(server)
            .get("/api/issue?page=1")
            .end((err, res) => {
                expect(res).to.have.status(200);
                for (let i = 0; i < 10; i++) {
                    expect(res.body[i]).to.deep.includes(issues_list_1[i])
                }
                chai.request(server)
                    .get("/api/issue?page=2")
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        for (let i = 0; i < 10; i++) {
                            expect(res.body[i]).to.deep.includes(issues_list_2[i])
                        }
                        done();
                    });
            });


    });

    it("Server should return a list of issues when we choose the option from filter.", (done) => {
        let issues_list_1_isOpen = [{ "id": 1, "title": "Issue1", "comment": "comment1", "author": "author1", "isOpen": 1 }, { "id": 2, "title": "Issue2", "comment": "comment2", "author": "author2", "isOpen": 1 }, { "id": 3, "title": "Issue3", "comment": "comment3", "author": "author3", "isOpen": 1 }, { "id": 4, "title": "Issue4", "comment": "comment4", "author": "author4", "isOpen": 1 }, { "id": 7, "title": "Issue7", "comment": "comment7", "author": "author7", "isOpen": 1 }, { "id": 8, "title": "Issue8", "comment": "comment8", "author": "author8", "isOpen": 1 }, { "id": 9, "title": "Issue9", "comment": "comment9", "author": "author9", "isOpen": 1 }, { "id": 11, "title": "Issue11", "comment": "comment11", "author": "author11", "isOpen": 1 }, { "id": 12, "title": "Issue12", "comment": "comment12", "author": "author12", "isOpen": 1 }, { "id": 13, "title": "Issue13", "comment": "comment13", "author": "author13", "isOpen": 1 }]
        let issues_list_1_closed = [{ "id": 5, "title": "Issue5", "comment": "comment5", "author": "author5", "isOpen": 0 }, { "id": 6, "title": "Issue6", "comment": "comment6", "author": "author6", "isOpen": 0 }, { "id": 10, "title": "Issue10", "comment": "comment10", "author": "author10", "isOpen": 0 }, { "id": 14, "title": "Issue14", "comment": "comment14", "author": "author14", "isOpen": 0 }, { "id": 19, "title": "Issue19", "comment": "comment19", "author": "author19", "isOpen": 0 }, { "id": 24, "title": "Issue24", "comment": "comment24", "author": "author24", "isOpen": 0 }, { "id": 29, "title": "Issue29", "comment": "comment29", "author": "author29", "isOpen": 0 }]
        let issues_list_2_isOpen = [{ "id": 15, "title": "Issue15", "comment": "comment15", "author": "author15", "isOpen": 1 }, { "id": 16, "title": "Issue16", "comment": "comment16", "author": "author16", "isOpen": 1 }, { "id": 17, "title": "Issue17", "comment": "comment17", "author": "author17", "isOpen": 1 }, { "id": 18, "title": "Issue18", "comment": "comment18", "author": "author18", "isOpen": 1 }, { "id": 20, "title": "Issue20", "comment": "comment20", "author": "author20", "isOpen": 1 }, { "id": 21, "title": "Issue21", "comment": "comment21", "author": "author21", "isOpen": 1 }, { "id": 22, "title": "Issue22", "comment": "comment22", "author": "author22", "isOpen": 1 }, { "id": 23, "title": "Issue23", "comment": "comment23", "author": "author23", "isOpen": 1 }, { "id": 25, "title": "Issue25", "comment": "comment25", "author": "author25", "isOpen": 1 }, { "id": 26, "title": "Issue26", "comment": "comment26", "author": "author26", "isOpen": 1 }]

        chai.request(server)
            .get("/api/issue?page=1&isOpen=true")
            .end((err, res) => {
                expect(res).to.have.status(200);
                for (let i = 0; i < 10; i++) {
                    expect(res.body[i]).to.deep.includes(issues_list_1_isOpen[i])
                }
                chai.request(server)
                    .get("/api/issue?page=2&isOpen=true")
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        for (let i = 0; i < 10; i++) {
                            expect(res.body[i]).to.deep.includes(issues_list_2_isOpen[i])
                        }
                        chai.request(server)
                            .get("/api/issue?page=1&isOpen=false")
                            .end((err, res) => {
                                expect(res).to.have.status(200);
                                for (let i = 0; i < 7; i++) {
                                    expect(res.body[i]).to.deep.includes(issues_list_1_closed[i])
                                }
                                done();
                            });
                    });
            });

    });

    it("Server should update the issue", (done) => {
        let update_issue = {
            title: "title updated by backend testing",
            comment: "comment updated by backend testing",
            author: "author25",
            isOpen: 0
        }
        chai.request(server)
            .patch("/api/issue/25")
            .send(update_issue)
            .end((err, res) => {
                expect(res).to.have.status(200);

                chai.request(server)
                    .get("/api/issue/25")
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.deep.includes(update_issue)
                        done();
                    });
            });
    });
});
