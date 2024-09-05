import Container from "react-bootstrap/Container";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import { useArticle } from "../hooks/useArticle";

function ViewArticle() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { article } = useArticle();

  useEffect(() => {
    const retrievedData = JSON.parse(localStorage.getItem("articleData"));
    const selectedArticleId = JSON.parse(
      localStorage.getItem("selectedArticleId")
    );
    const articleToView = retrievedData?.find(
      (article) => article.id === selectedArticleId
    );

    setSelectedArticle(null);
    if (article) {
      setTimeout(() => {
        setSelectedArticle(articleToView);
      }, 100000);
    } else {
      setTimeout(() => {
        setSelectedArticle(articleToView);
      }, []);
    }
  }, [article]);

  const handleButtonClick = () => {
    if (text === "") {
      setMessage("(Please enter your email to subscribe)");
    } else {
      setText("");
      setMessage("");
    }
  };

  return (
    <>
      {selectedArticle ? (
        <>
          <Container className="ContainerCard1">
            <Card.Title className="pHome1">
              {selectedArticle.category}
            </Card.Title>
            <div className="LC">
              <FontAwesomeIcon icon={faClock} />
              <p className="pHomeCard">{selectedArticle.publishingDate}</p>
            </div>
            <h2 className="h2Home">{selectedArticle.articleTitle}</h2>
          </Container>
          <Container className="ContainerCard2">
            <Card className="cardArticle">
              {/* Use path from the selected article */}
              <Card.Img variant="top" src={selectedArticle?.path || ''} />
              <Card.Body>
                <Card.Text className="card-text-card">
                  {selectedArticle.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </>
      ) : (
        <>
          <Container className="ContainerCard1">
            <Card.Title className="pHome1">{article?.category}</Card.Title>
            <div className="LC">
              <FontAwesomeIcon icon={faClock} />
              <p className="pHomeCard">{article?.time}</p>
            </div>
            <h2 className="h2Home">{article?.title}</h2>
          </Container>
          <Container className="ContainerCard2">
            <Card className="cardArticle">
              {/* Using the path of the fallback article */}
              <Card.Img variant="top" src={article?.path} />
              <Card.Body>
                <Card.Text className="card-text-card">
                  {article?.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </>
      )}
      {/* --------------------------------------------- */}
      <Container className="ContainerCard3">
        <h2>Subscribe to our newsletter</h2>
        <Card.Title>Be the first to get the latest news</Card.Title>
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            aria-describedby="basic-addon2"
            value={text}
            onChange={(In) => setText(In.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleButtonClick}
          >
            Subscribe
          </Button>
        </InputGroup>
        {message && <p>{message}</p>}
      </Container>
    </>
  );
}

export default ViewArticle;
