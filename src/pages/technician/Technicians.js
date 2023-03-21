import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAllTechnicians } from '../../redux/technicians/technician';
import './technician.scss';

const Home = () => {
  const dispatch = useDispatch();
  const technicians = useSelector((state) => state.technicians);
  useEffect(() => {
    if (!technicians.length) dispatch(getAllTechnicians());
  }, [dispatch, technicians]);

  return (
    <section className="card-technicians">
      {technicians.map((technician) => (
        <Card sx={{ maxWidth: 400, height: 400 }} key={technician.id}>

          <Typography variant="body2" color="text.secondary" className="tech-name">
            <Link to={`/technician/${technician.id}`}>
              {technician.name}
            </Link>
          </Typography>
          <CardMedia
            sx={{ height: 200 }}
            image={technician.image}
            title={technician.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Button size="small" className="btn-appointment">
                <Link to={`/add_reservations/${technician.id}`}>
                  Book
                  {' '}
                  {technician.name}
                </Link>
              </Button>

            </Typography>
            <Typography variant="body2" color="text.secondary">
              {technician.specialization}
            </Typography>
          </CardContent>
          <CardActions>
            <RoomOutlinedIcon />
            {technician.location}
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

export default Home;
