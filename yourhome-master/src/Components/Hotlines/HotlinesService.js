import firebase from "../../Firebase"
import HotlineComponent from './HotlineComponent'
import HotlineAdminComponent from './HotlineAdminComponent'
import React from 'react'
const db  = firebase.firestore();

export function getHotlinesArray(DB_name){
    var hotlinesArr = []
    return db.collection(DB_name).get().then((table) => {
        table.docs.forEach(doc => {
            var object = doc.data()
            object["hotline_id"] = doc.id;
            hotlinesArr.push(object)
        })
        return hotlinesArr;
    })
}

export function getHotlineValuesById(id){
    var object = [];
    return db.collection('hotlines').get().then((table) => {
        table.docs.forEach(doc => {
            if (doc.id === id){
                object.push(doc.data())
                console.log(object)
            }
        })
        return object
    })
}


export function addHotlineToDB(serviceName, serviceInfo, serviceTags, servicePhone){
    db.collection('hotlines').add({
        information: serviceInfo,
        title: serviceName,
        phone: servicePhone,
        tags: serviceTags
    })
}

export function updateHotline(hotlineId,serviceName, serviceInfo, serviceTags, servicePhone){
    db.collection('hotlines').doc(hotlineId).update({
        information: serviceInfo,
        title: serviceName,
        phone: servicePhone,
        tags: serviceTags

    })
}

export function createHotlinesToRender(hotlinesArr){
    var toRender = []
    toRender = hotlinesArr.map((item)=> 
    <HotlineComponent
    key={item.hotline_id}
    hotline_id={item.hotline_id}
    information={item.information}
    hotlineTitle={item.title}
    subTitle={item.information}
    phone={item.phone}
    tags={item.tags}
    />)
    return toRender;
}
export function createAdminHotlinesToRender(hotlinesArr, deleteFunc){
    var toRender = []
    toRender = hotlinesArr.map((item)=> 
    <HotlineAdminComponent
    key={item.hotline_id}
    hotline_id={item.hotline_id}
    information={item.information}
    hotlineTitle={item.title}
    subTitle={item.information}
    phone={item.phone}
    deleteFunction={deleteFunc}
    />)
    return toRender;
}

export function searchHotlines(whatToSearch, whereToSearch){
    var filteredArr = []
    whereToSearch.forEach(elem => {
        if (elem.information.includes(whatToSearch) ||
            elem.title.includes(whatToSearch) ||
            elem.phone.includes(whatToSearch)) {
                filteredArr.push(elem)
            }
    })
    return filteredArr;
}

export function deleteHotlineByKey(hotlineKey){
    db.collection('hotlines').doc(hotlineKey).delete();
}

export function getHotlineByID(id, hotlines){
    var ret = {};
    hotlines.forEach(hotline => {
        if(hotline.hotline_id === id){
            ret = (hotline);
            return ret;
        }
    });
    return ret;
}