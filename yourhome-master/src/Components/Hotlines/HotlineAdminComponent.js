import React, {Component} from 'react'
import HotlineAccord from './HotlineAccord'
import './hotlines.css'
import './hotlinesadmin.css'
import share_icon from '../../Images/ShareIcons/share-icon.svg'
import phone_icon from '../../Images/ShareIcons/phone-icon.svg'
import onlyphoneicon from "../../Images/onlyphoneicon.svg"
import facebookShare from '../../Images/ShareIcons/facebook-share.svg'
import whatsappShare from '../../Images/ShareIcons/whatsapp-share.svg'
import telegramShare from '../../Images/ShareIcons/telegram-share.svg'
import editHotline from '../../Images/Hotlines/edit-icon.svg'
import deleteHotline from '../../Images/Hotlines/delete-icon.svg'
import logo100px from '../../Images/logo100px.svg'
import * as HotlineService from './HotlinesService'
import {withRouter} from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
  } from "react-share";

const phoneStyle = {
    fontFamily: "'Alef', sans-serif",
    fontSize: '16px',
    color: '#263d43',

}

const infoStyle = {
    fontFamily: "'Alef', sans-serif",
    fontSize: '16px',
    color: '#263d43',
}

const titleStyle = {
    fontFamily: "'Alef', sans-serif",
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#263d43',
}

// This Component is the actual component that when you click it opens to see all the information.
// The props that are not passed to the HotlineAccord component are the information inside the opened card.
class HotlineAdminComponent extends Component{
    state = {
        openShare: false,
        openPhone: false,
        openDelete: false,
    }
    onOpenModalShare = () => {
        this.setState({ openShare: true });
    }
    onOpenModalPhone = () => {
        this.setState({ openPhone: true });
    }
    onOpenModalDelete = () => {
        this.setState({openDelete: true});
    }
    onCloseModalShare = () => {
        this.setState({ openShare: false });
    }
    onCloseModalPhone = () => {
        this.setState({ openPhone: false });
    }
    onCloseModalDelete = () => {
        this.setState({ openDelete: false });
    }
    handleDelete = () => {
        HotlineService.deleteHotlineByKey(this.props.hotline_id)
        this.onCloseModalDelete()
        // this.props.deleteFunction(this.props.hotline_id)
    }
    copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        this.onCloseModalShare();
    }
    thisURL = window.location.href
    render(){
        const {openPhone, openShare, openDelete} = this.state;
        return(
            <div className="hotlineComp">
                <HotlineAccord title={this.props.hotlineTitle} subTitle={this.props.subTitle}>
                    <div align="center" className="accordion-text">
                        <div className="insideTitle">
                        <span dir='rtl' style={titleStyle}>{this.props.hotlineTitle}</span>
                        </div>
                        <br/>
                        <div className="insideInformation">
                        <span dir='rtl' style={infoStyle}>{this.props.information}</span>
                        </div>
                        <br/>
                        <div className="insidePhone">
                        <span style={phoneStyle}>{this.props.phone}</span>
                        </div>
                        <br/>
                        <div className="insideIcons" align="center">
                        <img className="icon-click" onClick={this.onOpenModalPhone} src={phone_icon}/>
                        <Modal
                        classNames={{ modal: "customModalPhone" }}
                        open={openPhone}
                        onClose={this.onCloseModalPhone}
                        showCloseIcon={false}
                        center
                        >
                            <div align="right" className="phone-pop-up">
                                <a className="closePhoneModal" onClick={this.onCloseModalPhone}>
                                &times;
                                </a>
                                <div dir='rtl' align='right' className="generic-to">המשך לטלפון לביצוע השיחה <img src={onlyphoneicon} className="only-phone-icon"/></div>
                                <div dir='rtl' align='right' className="to-who">ל{this.props.hotlineTitle}</div>
                                <div className="buttons">
                                <div className='clk accept'><a className="links" href={`tel:${this.props.phone}`}>אישור</a></div>
                                <div className='clk decline' onClick={this.onCloseModalPhone}>ביטול</div>
                                </div>
                            </div>
                        </Modal>
                        <img className="icon-click" onClick={this.onOpenModalShare} src={share_icon}/>
                        <Modal
                        classNames={{ modal: "customModalShare" }}
                        open={openShare}
                        onClose={this.onCloseModalShare}
                        showCloseIcon={false}
                        center
                        >
                            <div className="share-pop-up">
                                <a className="closeShareModal" onClick={this.onCloseModalShare}>
                                &times;
                                </a>
                                <div className="to-share">
                                    <div className="share-generic" dir='rtl'>שתף את הטלפון של</div>
                                    <div className="name-of-share" dir='rtl'>{this.props.hotlineTitle}</div>
                                    <div align="center" className="share-icons-container">
                                        <FacebookShareButton className="facebookshare" url={window.location.href}>
                                        <img src={facebookShare} className="share-icon"/>
                                        </FacebookShareButton>
                                        <WhatsappShareButton className="whatsappshare" url={window.location.href}>
                                        <img src={whatsappShare} className="share-icon"/>
                                        </WhatsappShareButton>
                                        <TelegramShareButton className="telegramshare" url={window.location.href}>
                                        <img src={telegramShare} className="share-icon"/>
                                        </TelegramShareButton>
                                    </div>
                                    <div className="copylink" dir='rtl' 
                                    onClick={this.copyLink}>העתק לינק</div>
                                </div>
                                </div>
                        </Modal>
                        <img className="icon-click" onClick={this.onOpenModalDelete} src={deleteHotline}/>
                        <Modal
                    classNames={{ modal: "customModalDelete" }}
                    open={openDelete}
                    onClose={this.onCloseModalDelete}
                    showCloseIcon={false}
                    center
                    >
                        <div align="center" className="delete-popup">
                        <div align="center" className="brain100logo">
                                <img src={logo100px}/>
                        </div>
                        <div className="closeDeleteModal" onClick={this.onCloseModalDelete}><a>&times;</a></div>
                            <div align="center" className="confirm-delete" dir='rtl'>אישור מחיקה</div>
                            <div className="delete-info" dir='rtl'>בלחיצה על אישור, מספר המצוקה "{this.props.hotlineTitle}" ימחק מן המערכת.</div>
                            <div className="deleteButtons" align="center">
                            <button className="delete cancel" onClick={() => this.onCloseModalDelete()}>ביטול</button>
                            <button className="delete confirm" onClick={() => this.handleDelete()}>אישור</button>
                            </div>
                        </div>
                        </Modal>
                        <img className="icon-click" onClick={()=>{this.props.history.push(`./hotlines-edit/${this.props.hotline_id}`)}} src={editHotline}/>
                        </div>
                        <div className="endLine"></div>
                    </div>
                </HotlineAccord>
            </div>

        );
    }
}

export default withRouter(HotlineAdminComponent);