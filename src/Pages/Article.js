import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Article.css";
import { Dropdown } from "react-bootstrap";
import {
  useArticleSearch,
  useArticles,
  useRetrievedDataSearch,
} from "../hooks/useArticles";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Article = () => {
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { articles, isLoading } = useArticles();
  const [filteredArticles, setFilteredArticles] = useState(articles);
  
  const { handleSearch } = useArticleSearch(
    searchTerm,
    articles,
    setFilteredArticles,
    setSearchTerm
  );
  const [retrievedData, setRetrievedData] = useState([]);
  
  const { handleSearch2 } = useRetrievedDataSearch(
    searchTerm,
    setRetrievedData,
    setSearchTerm
  );
  
  
  const handleEdit = (id) => {
    // Save the article ID as an integer to localStorage
    localStorage.setItem("editArticleId", id);
    // Redirect to the AddArticle page
    window.location.href = "/AddArticle";
  };
  const handleCreateNewArticle = () => {
    // Optional: Clear out previous data in localStorage if needed
    localStorage.removeItem("editArticleId");
    navigate("/AddArticle"); // Navigate to AddArticle page
  };
  const handleDelete = (id) => {
    let existingData = JSON.parse(localStorage.getItem("articleData")) || [];

    // Filter out the article to delete
    existingData = existingData.filter((article) => article.id !== id);

    // Save the updated data back to localStorage
    localStorage.setItem("articleData", JSON.stringify(existingData));

    // Reload the page to reflect the changes
    window.location.reload();
  };

  console.log(retrievedData);
  return (
    <div className="article">
      <div className="main">
        <div className="slidepart ">
          <div className="slidehead">
            <h5>Admin Panel</h5>
            <div className="underline"></div>
            <p>6th June 2023</p>
          </div>
          <div className="slide">
            <div className="slidenav ">
              <div className="users">
                <a href="#">
                  <h5>Users</h5>
                </a>

                <ul className="d-none d-sm-block">
                  <li>
                    <a className="active" href="#">
                      Admin
                    </a>
                  </li>
                  <li>
                    <a href="#">Editor</a>
                  </li>
                  <li>
                    <a href="#">Instructors</a>
                  </li>
                  <li>
                    <a href="#">Students</a>
                  </li>
                </ul>
              </div>

              <div className="articles">
                <a href="#">
                  <h5>Articles</h5>
                </a>

                <ul>
                  <li>
                    <a href="#">Published Articles</a>
                  </li>
                  <li>
                    <a href="#">Scheduled Articles</a>
                  </li>
                  <li>
                    <a href="#">Saved Drafts</a>
                  </li>
                </ul>
              </div>

              <div className="jops">
                <a href="#">
                  <h5>Jobs</h5>
                </a>

                <ul className="d-none d-sm-block">
                  <li>
                    <a className="active" href="#">
                      Published Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#">Saved Drafts</a>
                  </li>
                </ul>
              </div>

              <div className="courses ">
                <a href="#">
                  <h5>Courses</h5>
                </a>

                <ul className="d-none d-sm-block">
                  <li>
                    <a className="active" href="#">
                      Published Courses
                    </a>
                  </li>
                  <li>
                    <a href="#">Scheduled Courses</a>
                  </li>
                  <li>
                    <a href="#">Saved Drafts</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Dropdown className="d-block d-sm-none">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className=" btndropdown"
            >
              Published Articles
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Published Articles</Dropdown.Item>
              <Dropdown.Item href="#">Scheduled Articles</Dropdown.Item>
              <Dropdown.Item href="#">Saved Drafts</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="contentpart ">
          <Button
            variant="primary"
            href="../AddArticle"
            onClick={handleCreateNewArticle}
            className="btn btn-warning createarticle d-none d-sm-block"
          >
            Create New Article
          </Button>
          <div className="articleslist">
            <div>
              <div className="articletitle">
                <div>
                  <h5>Articles</h5>
                  <div className="underline"></div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch2}
                    className="searchbtn"
                  />
                </div>
              </div>
              <div className="dataofarticles">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retrievedData
                      ? retrievedData.map((article) => {
                          return (
                            <tr>
                              <td data-label="Title">{article.articleTitle}</td>
                              <td data-label="Category">{article.category}</td>
                              <td data-label="Status">
                                <button
                                  type="button"
                                  className={
                                    article.status !== "draft"
                                      ? "btn btn-warning statusopen"
                                      : "btn btn-secondary statusclosed"
                                  }
                                  // className="btn btn-secondary statusclosed"
                                >
                                  {article.status !== "draft" ? (
                                    <span>published</span>
                                  ) : (
                                    <span>Draft</span>
                                  )}
                                </button>
                              </td>
                              <td data-label="Date & Time">
                                {article.publishingDate}
                              </td>

                              <td>
                                <a
                                  href="#1"
                                  className="editarticle"
                                  onClick={() => handleEdit(article.id)}
                                >
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a
                                  href="#2"
                                  className="deletearticle"
                                  onClick={() => handleDelete(article.id)}
                                >
                                  <FontAwesomeIcon icon={faTrashCan} />
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                    {filteredArticles?.map((article) => (
                      <tr key={article?.id}>
                        <td data-label="Title">{article?.title}</td>
                        <td data-label="Category">{article?.category}</td>
                        <td data-label="Status">
                          <button
                            type="button"
                            className={
                              article.status !== "draft"
                                ? "btn btn-warning statusopen"
                                : "btn btn-secondary statusclosed"
                            }
                          >
                            {article.status !== "draft" ? (
                              <span>published</span>
                            ) : (
                              <span>draft</span>
                            )}
                          </button>
                        </td>
                        <td data-label="Date & Time">{article?.time}</td>
                        <td>
                          <a href="#1" className="editarticle">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </a>
                          <a href="#2" className="deletearticle">
                            <FontAwesomeIcon icon={faTrashCan} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link previous"
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#page1">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link next" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        href="../AddArticle"
        onClick={handleCreateNewArticle}
        className="btn btn-warning createarticle d-block d-sm-none"
      >
        Create New Article
      </Button>
    </div>
  );
};

export default Article;
