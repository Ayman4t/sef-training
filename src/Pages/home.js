import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faClock, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../Images/seff_logo_black.jpg";
import { NavLink } from "react-bootstrap";
import { findMinTimeArticles, useArticles } from "../hooks/useArticles";
import { useNavigate } from "react-router-dom";

function Home() {
  const { articles, isLoading } = useArticles();
  const navigate = useNavigate();

  const { minTimeArticle1, minTimeArticle2, minTimeArticle3 } =
    findMinTimeArticles(articles);

  const retrievedData = JSON.parse(localStorage.getItem("articleData"));
  if (Array.isArray(retrievedData)) {
    retrievedData.reverse();
  }

  return (
    <>
      <div className="backGCbodyHome"></div>
      <Container>
        <h1 className="h1Home">
          software engineering <br />
          for future
        </h1>
      </Container>
      <Container className="ContainerHome">
        <Row xs={1} md={2} className="rowHomeAll">
          <Col>
            <Row xs={1} md={2} className="rowHome">
              <Col className="col1Home">
                <p>featured news</p>
              </Col>
              {minTimeArticle1 && (
                <Col className="col2Home">
                  <NavLink
                    className="NOTA"
                    onClick={() => {
                      navigate(`/Business/${minTimeArticle1.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="pHome1">{minTimeArticle1.category}</p>
                    <div className="LC">
                      <FontAwesomeIcon icon={faClock} />
                      <p className="pHome2">{minTimeArticle1.time}</p>
                    </div>
                    <h2 className="h2Home">{minTimeArticle1.title}</h2>
                    <p className="pHome3">{minTimeArticle1.content}</p>
                  </NavLink>
                </Col>
              )}
            </Row>
          </Col>
          <Col>
            <Row xs={1} md={2} className="rowHome">
              {minTimeArticle2 && (
                <Col className="col3Home">
                  <NavLink
                    className="NOTA2"
                    onClick={() => {
                      navigate(`/Business/${minTimeArticle2.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="pHome1">{minTimeArticle2.category}</p>
                    <div className="LC">
                      <FontAwesomeIcon icon={faClock} />
                      <p className="pHome2">{minTimeArticle2.time}</p>
                    </div>
                    <h2 className="h4Home">{minTimeArticle2.title}</h2>
                    <p className="pHome3 pHome32">{minTimeArticle2.content}</p>
                  </NavLink>
                </Col>
              )}
              {minTimeArticle3 && (
                <Col className="col4Home">
                  <NavLink
                    className="NOTA3"
                    onClick={() => {
                      navigate(`/Business/${minTimeArticle3.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="pHome1">{minTimeArticle3.category}</p>
                    <div className="LC">
                      <FontAwesomeIcon icon={faClock} />
                      <p className="pHome2">{minTimeArticle3.time}</p>
                    </div>
                    <h2 className="h4Home">{minTimeArticle3.title}</h2>
                    <p className="pHome3 pHome32">{minTimeArticle3.content}</p>
                  </NavLink>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="ContainerCard">
        {retrievedData
          ? retrievedData.map((article) => {
              if (article.status !== "draft")
                return (
                  <Card className="cardHome" key={article?.id}>
                    <Card.Img variant="top" src={img} />
                    <Card.Body>
                      <Card.Title className="pHome1">
                        {article?.category}
                      </Card.Title>
                      <div className="LC">
                        <FontAwesomeIcon icon={faClock} />
                        <p className="pHomeCard">{article?.publishingDate}</p>
                      </div>
                      <h2 className="h2Home">{article?.articleTitle}</h2>
                      <Row>
                        <Col sm={10}>
                          <Card.Text className="card-text-card">
                            {article?.content}
                          </Card.Text>
                        </Col>
                        <Col sm={2}>
                          <Button
                            variant="primary"
                            onClick={() => {
                              localStorage.setItem(
                                "selectedArticleId",
                                article.id
                              );
                              navigate(`/Business/${article.id}`);
                              window.scrollTo(0, 0);
                            }}
                          >
                            <FontAwesomeIcon icon={faAnglesRight} />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
            })
          : ""}
        {articles?.map((article) => {
          return (
            <Card className="cardHome" key={articles?.id}>
              <Card.Img variant="top" src={img} />
              <Card.Body>
                <Card.Title className="pHome1">{article?.category}</Card.Title>
                <div className="LC">
                  <FontAwesomeIcon icon={faClock} />
                  <p className="pHomeCard">{article?.time}</p>
                </div>
                <h2 className="h2Home">{article?.title}</h2>
                <Row>
                  <Col sm={10}>
                    <Card.Text className="card-text-card">
                      {article?.content}
                    </Card.Text>
                  </Col>
                  <Col sm={2}>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate(`/Business/${article.id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <FontAwesomeIcon icon={faAnglesRight} />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default Home;
