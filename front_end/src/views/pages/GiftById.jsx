import { useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Navbar, Card, ListGroup, Button } from "react-bootstrap";
import { CountContext } from "../../Provider";

const GiftById = () => {
  const [state, dispatch] = useContext(CountContext);
  const { listId } = useParams(); 

  useEffect(() => {
    const fetchGiftById = async () => {
      dispatch({ type: "Request" });
      try {
        const response = await axios.get(`http://localhost:3001/Gifts/${listId}`);
        dispatch({
          type: "giftSuccess",
          payload: response.data.gift,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération d'une List de cadeaux:", error);
        dispatch({
          type: "giftError",
          payload: error.message,
        });
      }
    };

    fetchGiftById();
  }, [dispatch, listId]);

  const handleDeleteGift = async () => {
    try {
      await axios.delete(`http://localhost:3001/Gifts/${listId}`);
      // Rediriger vers la liste des cadeaux après la suppression
      history.push("/Gifts");
    } catch (error) {
      console.error("Erreur lors de la suppression du cadeau:", error);
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="/Gifts">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <h2>Gift Detail :</h2>
      {state.loading ? (
        <p>Loading gift details...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>{state.gifts.name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>List id : {state.gifts.list_id}</ListGroup.Item>
              <ListGroup.Item>prix : {state.gifts.price} €</ListGroup.Item>
              <ListGroup.Item>prix d&apos;origine : {state.gifts.original_price} €</ListGroup.Item>
              <ListGroup.Item>reservé : {state.gifts.reserved}</ListGroup.Item>
            </ListGroup>
            <Button variant="primary">Modifier</Button>
            <button onClick={() => handleDeleteGift(state.gifts.id)}>Supprimer</button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default GiftById;
