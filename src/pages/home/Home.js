import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './home.scss';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
// Try Slide

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {
  Pagination, Navigation, Scrollbar, A11y,
} from 'swiper';
import ReactLoading from 'react-loading';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAllTechnicians } from '../../redux/technicians/technician';

const Home = () => {
  const [, setSwiperRef] = useState(null);
  const [done, setDone] = useState(undefined);
  const [tech, setTech] = useState([]);

  const dispatch = useDispatch();
  const technicians = useSelector((state) => state.technicians);
  useEffect(() => {
    if (!technicians.length) {
      dispatch(getAllTechnicians());
    }
  }, [dispatch, technicians]);
  useEffect(() => {
    setTech(technicians);
  }, [technicians]);

  useEffect(() => {
    if (tech) {
      setDone(true);
    }
  }, [tech, technicians]);

  return (
    <>
      {!done ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
          }}
        >
          <ReactLoading type="spokes" color="#a51c30ff" height={150} width={150} />
        </div>
      ) : (
        <div className="home-cont">
          <h2>The Experts</h2>

          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={2}
            spaceBetween={40}
            navigation
            scrollbar={{ draggable: true }}
            modules={[Pagination, Navigation, Scrollbar, A11y]}
            className="mySwiper"
          >
            {tech.map((technician) => (
              <SwiperSlide className="card-technician" key={technician.id}>
                <div className="card-image">
                  <img src={technician.image} alt={technician.name} />
                </div>
                <div className="card-body">
                  <Link to={`/technician/${technician.id}`}>
                    <h2>{technician.name}</h2>
                  </Link>
                  <div>
                    <p className="location">
                      <RoomOutlinedIcon />
                      {technician.location}
                    </p>
                    <p>{technician.specialization}</p>
                    <Link to={`add_reservations/${technician.id}`}>
                      <button type="button" className="button">
                        Book
                        {' '}
                        {technician.name}
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      )}
    </>
  );
};

export default Home;
