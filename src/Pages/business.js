import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faClock, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../Images/seff_logo_black.jpg";
import { NavLink } from "react-bootstrap";
import {
  findMinTimeBusinessArticles,
  useArticles,
  findMinTimeBusinessArticlesFromLocalStorage,
} from "../hooks/useArticles";
import { useNavigate } from "react-router-dom";

function Business() {
  const { articles, isLoading } = useArticles();
  const navigate = useNavigate();
  const businessArticles = articles?.filter((article) => {
    return article?.category == "Business";
  });
  const { minTimeArticle1 } = findMinTimeBusinessArticles(articles);

  const retrievedData = JSON.parse(localStorage.getItem("articleData"));
  const businessArticles2 = retrievedData?.filter((article) => {
    return article?.category === "Business";
  });
  if (Array.isArray(businessArticles2)) {
    businessArticles2.reverse();
  }
  const { minTimeArticle4, minTimeArticle5, minTimeArticle6 } =
    findMinTimeBusinessArticlesFromLocalStorage();

  return (
    <>
      <Container>
        <h2 className="h2Business">latest business news</h2>
      </Container>
      <Container className="ContainerHome">
        <Row xs={1} md={2} className="rowHomeAll">
          <Col className="colBusinessA">
            <Row className="rowBusiness">
              {minTimeArticle1 && (
                <Col className="col2Home colBusiness3">
                  <NavLink
                    className="NOTA"
                    onClick={() => {
                      navigate(`/Business/${minTimeArticle1.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="pHome1">{minTimeArticle1.category}</p>
                    <div className="LC LCB">
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
          <Col className="colBusinessB">
            <Row xs={1} md={2} className="rowBusiness">
              {minTimeArticle4 && (
                <Col className="col3Home colBusiness2">
                  <NavLink
                    className="NOTA2"
                    onClick={() => {
                      localStorage.setItem(
                        "selectedArticleId",
                        minTimeArticle4.id
                      );
                      navigate(`/Business/${minTimeArticle4.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="pHome1">{minTimeArticle4.category}</p>
                    <div className="LC">
                      <FontAwesomeIcon icon={faClock} />
                      <p className="pHome2">{minTimeArticle4.publishingDate}</p>
                    </div>
                    <h2 className="h4Home">{minTimeArticle4.articleTitle}</h2>
                    <p className="pHome3 pHome32">{minTimeArticle4.content}</p>
                  </NavLink>
                </Col>
              )}
              {minTimeArticle5 && (
                <Col className="col4Home colBusiness">
                  <NavLink
                    className="NOTA3"
                    onClick={() => {
                      localStorage.setItem(
                        "selectedArticleId",
                        minTimeArticle5.id
                      );
                      navigate(`/Business/${minTimeArticle5.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <p className="pHome1">{minTimeArticle5.category}</p>
                    <div className="LC">
                      <FontAwesomeIcon icon={faClock} />
                      <p className="pHome2">{minTimeArticle5.publishingDate}</p>
                    </div>
                    <h2 className="h4Home">{minTimeArticle5.articleTitle}</h2>
                    <p className="pHome3 pHome32">{minTimeArticle5.content}</p>
                  </NavLink>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="ContainerCard ContainerCardAll">
        {businessArticles2
          ? businessArticles2.map((article) => {
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
        {businessArticles?.map((article) => {
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
                        navigate(`/Business/${article?.id}`);
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

export default Business;
