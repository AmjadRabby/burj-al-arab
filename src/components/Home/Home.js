import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Room from '../Room/Room';

const Home = () => {
    const place = useContext(UserContext)
    const {places} = place;
    const style = {

        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between',
        
    }
    return (
        <div style={style}>
            {
                places.map(place => <Room  place ={place}></Room>)
            }
        </div>
    );
};

export default Home;