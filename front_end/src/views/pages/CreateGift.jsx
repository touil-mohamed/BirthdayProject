import { useContext, useState, useEffect } from 'react';
import { CountContext } from "../../Provider";
import axios from 'axios';
import { Container, Form, Button, Navbar } from 'react-bootstrap';
import { enableNotifications } from '../../service/user-account-manager.js';

const AddGift = () => {
  const [state, dispatch] = useContext(CountContext);
  const [formData, setFormData] = useState({
    list_id: "",
    name: "",
    price: "",
    original_price: "",
    reserved: false
  });

  useEffect(() => {
    const fetchLists = async () => {
      dispatch({ type: "Request" });
      try {
        const response = await axios.get("http://localhost:3001/GiftsList");
        dispatch({
          type: "giftsListSuccess",
          payload: response.data.giftList,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des cadeaux:", error);
        dispatch({
          type: "giftsListError",
          payload: error.message,
        });
      }
    };

    fetchLists();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? (value === "true") : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/Gifts/create", formData);

      if (Notification.permission === 'granted') {
        new Notification('Bien joué !', {
          body: 'Ton cadeau est bien créé !',
        });

        // Envoi d'une notification push via le backend
        await axios.post("http://localhost:3001/push/send", {
          title: 'Nouveau cadeau créé!',
          body: `Le cadeau "${formData.name}" a été ajouté à la base de donnée avec succès.`
        });
      } else {
        console.error("Les notifications ne sont pas activées.");
      }

    } catch (error) {
      console.error("Error adding gift:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/Gifts">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <Container>
        <h2>Ajouter un Cadeau</h2>
        <Button variant="primary" onClick={enableNotifications}>Activer les Notifications</Button>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="list_id">
            <Form.Label>Liste</Form.Label>
            <Form.Control as="select" name="list_id" onChange={handleChange}>
              <option value="">Sélectionner une liste</option>
              {state.giftList.map((list) => (
                <option key={list.id} value={list.id}>{list.title}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Nom du cadeau</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="original_price">
            <Form.Label>Prix d&apos;origine</Form.Label>
            <Form.Control type="text" name="original_price" value={formData.original_price} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="reserved">
            <Form.Label>Réservé :</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Oui"
                name="reserved"
                id="reserved-yes"
                value="true"
                checked={formData.reserved === true}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Non"
                name="reserved"
                id="reserved-no"
                value="false"
                checked={formData.reserved === false}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">Ajouter</Button>
        </Form>
      </Container>
    </>
  );
};

export default AddGift;