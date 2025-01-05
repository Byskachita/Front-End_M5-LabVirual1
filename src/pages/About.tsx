import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Doctor } from '../types/data';
import { Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
function About() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Doctor[]>('/db/doctors.json');
        console.log(response);

        if (response.data.length > 0) {
          setDoctors(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Container className='mt-4'>
        <h1 className='mb-4 text-center'>Equipo Médico</h1>
        <p className='text-center mb-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas velit,
          cumque placeat non ex voluptatum illo vel natus rerum quam voluptate
          aliquid exercitationem iusto veniam architecto obcaecati itaque eos
          eius!
        </p>
      <Row>
        {doctors.map((doctor) => (
          <Col key={doctor.id} sm={12} md={6} lg={4} className='mb-4'>
            <Card>
              <Card.Body>
              <Card.Title>{doctor.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
              {doctor.specialty}
              </Card.Subtitle>
              <Card.Text>{doctor.description}</Card.Text>
              <Card.Text>
                <strong>Servicios: </strong>
                {doctor.services.join(', ')}
              </Card.Text>
              <Card.Text>
                <strong>Años de experiencia: </strong>
                {doctor.years}
              </Card.Text>
              <Image
              src={`assets/img/doctors/doctor_${doctor.id}.png`}
              alt={`${doctor.name} - ${doctor.specialty}`}
              fluid
              className='mb-3'
            />
            <Button variant='primary'>Ver más</Button>
              </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        </Container>
        </>
  );
}

export default About;
