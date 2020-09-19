import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
        marginBottom: theme.spacing(2),
        width: 350
    },
  }),
);

const Booking = () => {
    const classes = useStyles();
    const {placeId} = useParams();
    const [detail, setDetail] = useState({});
    useEffect(() => {
        const placeDetail = fakeData.find(place => place.placeId == placeId);
    setDetail(placeDetail)
    }, [])
    // console.log(detail)

    const history = useHistory()
    const handleCheckout = () => {
        history.push('/checkout')
    }
    return (
        <div className='mx-5 d-flex justify-content-center align-items-center '>
            <div style={{color: 'white'}} className='col-md-5'>
                <h1>{detail.name}</h1>
                <h6>{detail.details}</h6>
            </div>
            <div className='col-md-5'>
                <form className='bg-light text-center py-4 rounded' >
                   <TextField className={classes.textField} id="standard-basic" label="Origin" defaultValue='Dhaka' required/>
                   <TextField className={classes.textField} id="standard-basic" label='Destination' defaultValue={detail.name} required/>
                    <TextField
                        id="date"
                        label="From"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="To"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <button onClick={handleCheckout} className='btn btn-warning w-50' type="submit">Start Booking</button>
                </form>
            </div>
        </div>
    );
};

export default Booking;