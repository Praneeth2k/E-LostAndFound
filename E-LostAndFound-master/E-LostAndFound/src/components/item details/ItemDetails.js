import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Button,Card, CardImg, CardText, CardBody, CardTitle, Alert } from "reactstrap";
import axios from '../../axios'
import RegisterItemAgain from "./RegisterItemAgain";
import UploadItemAgain from "./UploadItemAgain";
import { connect } from "react-redux"

function bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}
function ItemDetails(props){
    const {id} = useParams()

    const [ItemData, setItemData] = useState({})
    const [image, setImage] = useState({});
    const [msg, setMsg] = useState();


    useEffect(() => {
        console.log("aaa")
        async function fetchData(){
            if(props.flag == 0){
                console.log("sada")
                await axios.get(`/found/${id}`)
                .then(res => {
                    setItemData(res.data)
                    setImage(res.data.productImage.data.data)
                })
            }
            else{
                console.log("saaa")
                await axios.get(`/lost/${id}`)
                .then(res => {
                    setItemData(res.data)
                   // console.log(res.data)
                    setImage(res.data.productImage.data.data)
                    //console.log(ItemData)
                })
                .then(() =>{
                    console.log("bbbb");
                    //var data = new Uint8Array(ItemData.productImage.data.data);
                   // var base64 = bufferToBase64(data);
                   // console.log(base64)
                   // setImage(base64)
                })
            }
        }

        fetchData()
        

    }, [])
   // console.log(ItemData)
   // console.log(image)
    var flag = new Uint8Array(image);
    var base64 = bufferToBase64(flag)
   // console.log(base64)
/*
    useEffect(() => {
        console.log("bbbb");
        console.log(ItemData)
        var data = new Uint8Array(ItemData.productImage.data.data);
        var base64 = bufferToBase64(data);
        setImage(base64)
    }, [])

   // console.log()
   // console.log(ItemData)
    //src={`data:image/png;base64,${base64}`}
    */

    function handleFound(event){
        event.preventDefault()
        axios.post('/confirmFound', {
            lostEmail: ItemData.email,
            foundEmail: props.userEmail
        })
        .then(res => {console.log(res)
                setMsg("The person who had lost this item has been notified. Check your mail for more details")})
        .catch(err => console.log(err))
    }

    function handleClaim(event){
        event.preventDefault()
        axios.post('/confirmFound', {
            lostEmail: props.userEmail,
            foundEmail: ItemData.email
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setMsg("The person who found the item has been notified. Check your mail for more details")
    }
   if(props.flag == 0){
    return ( 
        <div className="container" align = "center">
            
            
            <Card>
                <CardImg top src={`data:image/png;base64,${base64}`} width="100%" alt={ItemData.name}/>
                <CardBody>
                    <CardTitle>Name: {ItemData.name}</CardTitle>
                    <CardText>{ItemData.descp}</CardText>
                    <CardText>Type: {ItemData.typeob}</CardText>
                    <CardText>Are you sure that this is your item?</CardText>
                    <Button onClick = {handleClaim} color = "danger">Yes, Claim</Button>
                </CardBody>
            </Card>
            { msg? <Alert color="success">{ msg }</Alert>: null}
            
        </div>
    )
   }
   else{
       return (
        <div className="container" align = "center">
        
        <Card>
            <CardImg top src={`data:image/png;base64,${base64}`} width="100%" alt={ItemData.name}/>
            <CardBody>
                <CardTitle>Name: {ItemData.name}</CardTitle>
                <CardText>Type: {ItemData.typeob}</CardText>
                <CardText>Description: {ItemData.descp}</CardText>
                <CardText>Are you sure you have found this item?</CardText>
                <Button onClick={handleFound}>Yes</Button>
            </CardBody>
        </Card>
        { msg? <Alert color="success">{ msg }</Alert>: null}
    </div>
       )
   }
}
function mapStateToProps(state){
    if(state.auth.user){
        return {
            userEmail: state.auth.user.email
        }
    }
    return {}
}

export default connect(mapStateToProps, {})(ItemDetails);
