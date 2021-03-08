import React from 'react'
import {useState, useRef, useEffect} from 'react'
import EllipsisText from 'react-ellipsis-text'
import './hotlines.css'
import chevron_down from '../../Images/chevron-down.svg'


const HotlineAccord = props => {
  const [active, setActive] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
  }, [contentRef, active])

  const toogleActive = () => {
    setActive(!active)
  }

  const titleStyle = {
    fontFamily: 'Alef, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#263d43',
  }

  const subtitleStyle = {
    fontFamily: 'Alef, sans-serif',
    fontSize: '14px',
    color: '#263d43',
  }

  return (
    <div className="accordion-section">
      <button dir="rtl" className="accordion-title" onClick={toogleActive}>
          <div align="right" className="accordion-sub">
              <div style={titleStyle}><EllipsisText text={props.title} length={31}/></div>
              <div style={subtitleStyle}><EllipsisText text={props.subTitle} length={33}/></div>
                </div>
        <span className={active ? 'accordion-icon rotate': 'accordion-icon'}>
          <img src={chevron_down}/>
        </span>
      </button>

      <div
        ref={contentRef}
        className="accordion-content"
      >
        {props.children}
      </div>
    </div>
  )
}

export default HotlineAccord