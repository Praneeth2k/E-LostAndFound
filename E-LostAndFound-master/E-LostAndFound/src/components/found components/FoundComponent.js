import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCard";
import { Container, Row, Col, Spinner } from 'reactstrap';
//import ItemsData from "./ItemsData";
import Intro from "../Intro";
import {Switch, Route, useParams, useLocation, useHistory} from "react-router-dom";
import ItemDetails from "../item details/ItemDetails";
import UploadItem from "./UploadItem";
import Map from "../Map"

import axios from '../../axios'

import { connect } from 'react-redux'
//import action from './actions/'
function bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

function FoundComponent(props){
    const [fetchingItems, setFetchingItems] = useState(false)
    const [ItemsData, setItemsData] = useState([])

    useEffect(() => {
        setFetchingItems(true)
        async function fetchData(){
            const req = await axios.get('/found')
            setItemsData(req.data)
            setFetchingItems(false)
        }

        fetchData()
    }, [])


    const items = ItemsData.map((found) =>{
            // const {item} = lost
            
            console.log(found.productImage.data.data)
            var data = new Uint8Array(found.productImage.data.data);

            var base64 = bufferToBase64(data);

            // const base64 = convert(lost.productImage.data)

            
            return(
                
                <Col sm = "12" md = "6" xl = "3" lg = "4">
                    <ItemCard key = {found._id} name = {found.name} img = {base64} type = {found.typeob} desc = {found.descp} id = {found._id} flag = {0}/>
                </Col>
            ); 
    }); 


    
    return (
        <Switch>
            <Route exact path = "/found">
                <div className = "Lost">
                    <Intro 
                    name = "Found" 
                    description = "Here you will find the list of items that have been found. If you found an item, upload it here or check if it has already been registered as lost in the lost page"
                    />

                    <UploadItem />
                    <hr />
                    <h2 align = "center" style = {{fontSize:"3rem"}}>Found items</h2>
                    <br/>
                    <Map />
                    {fetchingItems && <p align = {"center"}><Spinner color="primary" /> Loading Items....</p>}
                    <Container className="themed-container">
                        <Row>
                            {items}
                        </Row>
                    </Container>
                    <br />
                    
                    
                    <br />
                    
                </div>
            </Route>
            <Route path = "/found/:id">
                <ItemDetails flag = {0}/>
            </Route>
        </Switch>
    )
}

function mapStateToProps(state){
    return {
        item: state.item
    }
}

export default connect(mapStateToProps, {})(FoundComponent);