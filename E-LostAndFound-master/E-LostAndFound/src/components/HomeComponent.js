import React, { useState, useEffect } from "react"
import {useHistory} from "react-router-dom"
import { Card, Button, CardTitle, CardText, Row,
          Col, Jumbotron, Container, ButtonGroup,
          Carousel, CarouselItem, CarouselControl,
          CarouselIndicators, CarouselCaption } from 'reactstrap';
import './homeComponent.css'
import ItemCard from './ItemCard.js'
import img1 from '../images/carousel-1.PNG'
import img2 from '../images/carousel-2.PNG'
import { connect } from "react-redux"
//import img3 from '../images/carousel-3.PNG'
const items = [
  {
    src: img1,
    altText: '',
    captionHeader: 'List of lost items'
  },
  {
    src: img2,
    altText: '',
    caption: ''
  },
  {
    src: img1,
    altText: '',
    caption: ''
  }
];

function HomeComponent(props) {
    const history = useHistory()
    const [loggedIn, setLoggedIn] = useState(false)

    //-------------------- Carousel part ---------------------------------
    
    
    
      const [activeIndex, setActiveIndex] = useState(0);
      const [animating, setAnimating] = useState(false);
    
      const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
      }
    
      const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
      }
    
      const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
      }
    
      const slides = items.map((item) => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
          >
            <img src={item.src} style = {{width:"100%"}} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.captionHeader} />
          </CarouselItem>
        );
      });
    //---------------------------------------------------------------------


    return (
        <div>
            <Jumbotron>
              <div className = "row">
                <Container fluid className="container col-xl-6">
                    
                  <div className="welcome col-md-12">
                    <h1>Welcome!</h1><br />
                    <h2>This is the place to find your lost item, or to report a found item.</h2><br />
                    {!props.isAuthenticated? 
                    <div>
                    <h3 className="">First, login to your BMSCE account. If you don't have an account, sign-up below.</h3>
                    <ButtonGroup size="lg col-12 col-md-6">
                      <Button className = "button-login-signup" color="primary" onClick={() => {history.push("/signup")}}>Sign-up</Button>
                      <Button className = "button-login-signup" color="primary" onClick={() => {history.push("/login")}}>Login</Button>
                    </ButtonGroup>
                  </div> : null}
                    </div>
                  <div className="login-signup">
                    <Row>
                        <Col md="6">
                          <Card body className = "HomepageCard">
                            <CardTitle tag="h2">Lost something?</CardTitle>
                            <CardText>Click here to search for your item.</CardText>
                            <Button className = "button-lost-found" color="danger" onClick={() => {history.push("/lost")}}>Lost</Button>
                          </Card>
                        </Col>
                        <Col md="6">
                          <Card body className = "HomepageCard">
                            <CardTitle tag="h2">Found something?</CardTitle>
                            <CardText>Click here to return the found object.</CardText>
                            <Button className = "button-lost-found" color="success" onClick={() => {history.push("/found")}}>Found</Button>
                          </Card>
                        </Col>
                    </Row>
                  </div>
                </Container>

              <div className = "wrapper col-xl-6">
                  <div className = "inside-wrapper">
                <ItemCard img = "https://f1af951e8abcbc4c70b9-9997fa854afcb64e87870c0f4e867f1d.lmsin.net/1000007319314-1000007319313_01-750.jpg"
                name = "Water bottle" 
                type = "Stationary" 
                description = "Model: qc 35, black"
                flag = "3"
                id = "/"
                />
                  </div>
              </div>
            </div>
            </Jumbotron>
          

            <Row>
              <Col md = "12" lg = "11" xl = "10" className = "carousel-container">
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
              </Carousel>
              </Col>
            </Row>

                    
            
      </div>
    )
}

function mapStateToProps(state){
  if(state.auth){
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
  }
  else return {}
}

export default connect(mapStateToProps, {})(HomeComponent);