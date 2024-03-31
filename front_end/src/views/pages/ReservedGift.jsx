import { useState, useEffect, useContext } from "react";
import { CountContext } from "../../Provider";
import axios from "axios";
import { Container, Form, Button, Navbar } from "react-bootstrap";

const ReservedGift = () => {
  const [state, dispatch] = useContext(CountContext);
  const [formData, setFormData] = useState({
    giftId: "",
    reserved: false,
  });

  useEffect(() => {
    const fetchGift = async () => {
      dispatch({ type: "Request" });
      try {
        const response = await axios.get("http://localhost:3001/Gifts/");
        dispatch({
          type: "giftSuccess",
          payload: response.data.gift,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des cadeaux:", error);
        dispatch({
          type: "giftError",
          payload: error.message,
        });
      }
    };

    fetchGift();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const giftId = formData.giftId;
      const reserved = formData.reserved === "true"; 
      await axios.patch(`http://localhost:3001/Gifts/reserved/${giftId}`,{ reserved }); // Utilisez l'ID du cadeau dans l'URL de la requête PATCH
      console.log("Cadeau réservé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la réservation du cadeau:", error);
    }
  };

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="/Gifts">Home</Navbar.Brand>
          <Navbar.Brand href="/Gifts/create">Ajouter un Cadeaux</Navbar.Brand>
          <Navbar.Brand href="/Gifts/reserved">Reserver un Cadeaux</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <Container>
        <h2>Réserver un Cadeau</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="giftId">
            <Form.Label>Sélectionner un Cadeau :</Form.Label>
            <Form.Control as="select" name="giftId" onChange={handleChange} required>
              <option value="">Sélectionner un cadeau</option>
              {state.gifts.map((gift) => (
                <option key={gift.id} value={gift.id}>{gift.name}</option> // Utilisez l'ID du cadeau comme valeur de l'option
              ))}
            </Form.Control>
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
      checked={formData.reserved === "true"}
      onChange={handleChange}
    />
    <Form.Check
      inline
      type="radio"
      label="Non"
      name="reserved"
      id="reserved-no"
      value="false"
      checked={formData.reserved === "false"}
      onChange={handleChange}
    />
  </div>
</Form.Group>
          </Form.Group>
          <Button variant="primary" type="submit">Réserver</Button>
        </Form>
      </Container>
    </>
  );
};

export default ReservedGift;
