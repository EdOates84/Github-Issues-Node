import React, { Component } from 'react';
import styles from "./PageNav.module.scss";

class PageNav extends Component {
    constructor(){
        super();
        this.state = {
            currentPage : 1,
        }
    };


    onChangePage = (e) => {
        let page = this.props.page;
        if(e.target.id === 'next'){
            // if(page===)
            page = page+1;
        }else{
            if(page===1){}
            else{page = page-1;}  
        }
        // this.setState({
        //     currentPage : page,
        // })
        this.props.updatePage(page);
    }
    render() { 
        const page = this.props.page;
        // console.log(this.props.filter);
        return ( 
            <div className={styles.mainHead}>
                <div id='prev' onClick={this.onChangePage}>
                    Prev
                </div>
                <div id='page'>
                    {page}
                </div>
                <div id='next' onClick={this.onChangePage}>
                    Next
                </div>
            </div>
         );
    }
}
 
export default PageNav;