import { useContext, useEffect, } from "react";
import { CountContext } from "../../Provider";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Navbar, Card, ListGroup, Button, Row, Col} from "react-bootstrap";

const Gifts = () => {
  const [state, dispatch] = useContext(CountContext);
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

  const handleDeleteGift = async (listId) => {
    try {
      await axios.delete(`http://localhost:3001/Gifts/${listId}`);
      dispatch({ type: "deleteGift", payload: listId });
    } catch (error) {
      console.error("Erreur lors de la suppression du cadeau:", error);
    }
  };

  return (
    <>
       <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/Gifts">Home</Navbar.Brand>
          <Navbar.Brand href="/Gifts/create">Ajouter un Cadeaux</Navbar.Brand>
          <Navbar.Brand href="/Gifts/reserved">Reserver un Cadeaux</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <h2>Gifts :</h2>
      {state.loading ? (
        <p>Loading adherents...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {state.gifts.map((gift, index) => (
            <Col key={gift.id}>
              <Card>
                <Card.Body>
                
                  <Card.Title>Cadeau n° {index}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>List id : {gift.list_id}</ListGroup.Item>
                    <ListGroup.Item>nom : {gift.name}</ListGroup.Item>
                    <ListGroup.Item>prix : {gift.price} €</ListGroup.Item>
                    <ListGroup.Item>prix dorigine : {gift.original_price} €</ListGroup.Item>
                    <ListGroup.Item>reservé : {gift.reserved}</ListGroup.Item>
                    <ListGroup.Item>
                        <Link to={`/gifts/${gift.id}`}>Voir détails du cadeau</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to={`/gifts/list/${gift.list_id}`}>Voir liste de cadeaux</Link>
                      </ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">Modifier</Button>
                  <button onClick={() => handleDeleteGift(index)}>Supprimer</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
    </>
  );
};
export default Gifts;
