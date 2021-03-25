import React from 'react';
import styled from 'styled-components';

const BottomBar = styled.div`
display: flex;
flex-direction: row;
width: 260px;
margin-top: 10px;
`

const BGItem = styled.div`
height: 50px;
width: 50px;
background-size: auto;
background: url(${props => props.imgUrl});
margin: auto;
`

const BGPicker = (props) => {
  return (
    <BottomBar>
      {props.list.map(item =>
        <BGItem imgUrl={item} onClick={() => props.select(item)} />
      )}
      {/* <BGItem imgUrl={"https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHw%3D&w=1000&q=80"} /> */}
    </BottomBar>
  )
}

export default BGPicker;