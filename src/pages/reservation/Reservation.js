import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getAllReservations, deleteReservation } from '../../redux/reservations/reservations';
import './reservation.css';

const Reservation = ({ userId }) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);

  useEffect(() => {
    if (!reservations.length) {
      dispatch(getAllReservations(userId));
    }
  }, [dispatch, reservations.length, userId]);

  const handleDelete = (id) => {
    dispatch(deleteReservation(id));
  };

  return (
    <div>
      {reservations.length === 0 && <div className="zero-length">You currently have no pending reservation</div>}
      <section className="reserve-cover-section">
        {reservations?.map((reservation) => (
          <div key={reservation.id} className="reserve-cover">
            <Card key={reservation.id} className="reserve-cont">
              <CardMedia
                sx={{ height: 200 }}
                image={reservation.technician?.image || reservation.appointment.technician?.image}
                title={reservation.technician?.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="reserve-name">
                  <Link to={`/technician/${reservation.technician?.id}`}>
                    {reservation.technician?.name || reservation.appointment.technician?.name}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date:
                  {' '}
                  {reservation.date || reservation.appointment.date}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Charges: $
                  {reservation.technician?.charges || reservation.appointment.technician?.charges}
                </Typography>
                <Typography>
                  Location:
                  {' '}
                  {reservation.location || reservation.appointment.location}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  className="btn-appointment"
                  id={reservation.id}
                  onClick={() => handleDelete(reservation.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Reservation;
