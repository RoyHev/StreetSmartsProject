import React from 'react'
import './breadcrumbs.css'
import {Link} from 'react-router-dom'

class BreadCrumbs extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const { crumbsLen } = this.props;
        var display
        if (crumbsLen === 3) {
            display = <div className="three bread-crumbs" dir='rtl'>
                <Link to={this.props.firstPath}>
                    <div className="firstRef">
                        {this.props.first}
                    </div>
                </Link>
                <div className="firstRef">{" > "}</div>
                <Link to={this.props.secondPath}>
                    <div className="firstRef">
                        {this.props.second}
                    </div>
                </Link>
                <div className="secondRef">
                 {" >"} {this.props.third}
                </div>
            </div>
        } else {
        display = 
        <div dir='rtl' className="two bread-crumbs">
            <Link to={this.props.firstPath}>
            <div className="firstRef">
                {this.props.first}
            </div>
            </Link> 
            <div className="secondRef">
                 {" >"} {this.props.second}
            </div>
        </div>
        }
        return(
            <div>
                {display}
            </div>
        );

    }
}

export default BreadCrumbs;